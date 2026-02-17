import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
const STORE_NAME = "notes";
const DB_NAME = "offlineFirstDB";
const DB_VERSION = 1;
const OfflineFirstApp = () => {
  const InitDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
          });
          store.createIndex("updatedAt", "updatedAt");
        }

        if (!db.objectStoreNames.contains("outbox")) {
          db.createObjectStore("outbox", { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const addData = async (entity: any) => {
    const db = (await InitDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).add(entity);
    return new Promise<string>((resolve, reject) => {
      tx.oncomplete = () => resolve("added");
      tx.onerror = () => reject(tx.error);
    });
  };
  const updateData = async (updateEntity: any) => {
    const db = (await InitDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(updateEntity);
    return new Promise<string>((resolve, reject) => {
      tx.oncomplete = () => resolve("updated");
      tx.onerror = () => reject(tx.error);
    });
  };
  //   const deleteData = async (id: any) => {
  //     const db = (await InitDB()) as IDBDatabase;
  //     const tx = db.transaction(STORE_NAME, "readwrite");
  //     tx.objectStore(STORE_NAME).delete(id);
  //     return new Promise<string>((resolve, reject) => {
  //       tx.oncomplete = () => resolve("deleted");
  //       tx.onerror = () => reject(tx.error);
  //     });
  //   };

  // Uncomment if you need to clear the database
  // const clearDB = async () => {
  //   const db = (await InitDB()) as IDBDatabase;
  //   const tx = db.transaction(STORE_NAME, "readwrite");
  //   const store = tx.objectStore(STORE_NAME);
  //   store.clear();
  //   return new Promise<string>((resolve, reject) => {
  //     tx.oncomplete = () => resolve("cleared");
  //     tx.onerror = () => reject(tx.error);
  //   });
  // };

  const fetchAll = async () => {
    const db = (await InitDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const req = store.getAll();
      tx.oncomplete = () => resolve(req.result);
      tx.onerror = () => reject(tx.error);
    });
  };

  //   const fetchById = async (id: any) => {
  //     const db = (await InitDB()) as IDBDatabase;
  //     const tx = db.transaction(STORE_NAME, "readonly");
  //     const store = tx.objectStore(STORE_NAME);

  //     return new Promise((resolve, reject) => {
  //       const req = store.get(id);
  //       tx.oncomplete = () => resolve(req.result);
  //       tx.onerror = () => reject(tx.error);
  //     });
  //   };

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<any>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchFromAPIAndSync = useCallback(async () => {
    if (!isOnline) return;

    setIsSyncing(true);
    try {
      const response = await axios.get(API_URL);
      const localNotes = (await fetchAll()) as any;

      for (const item of response.data) {
        const exists = localNotes?.find((n) => n?.id === item?.id);

        if (!exists) {
          await addData({
            id: item?.id,
            title: item?.title,
            body: item?.body,
            userId: "Ashish",
            synced: true,
          });
        }
      }
      const updatedNotes = await fetchAll();
      setNotes(updatedNotes);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline]);

  const handleSubmit = async () => {
    if (!note.trim()) return;

    const id = Math.floor(Math.random() * 10000);

    const payload = {
      id,
      title: note,
      body: note,
      userId: "Ashish",
      synced: false,
    };

    try {
      await addData(payload);
      setNote("");
      setNotes((prev) => [...prev, payload]);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  //supabase pass
  // RV3bxxocMfinqakN

  const addLocalNotesIntoAPI = useCallback(async () => {
    if (!isOnline) return;

    try {
      const response = (await fetchAll()) as any;
      const unsyncedNotes = response.filter((v) => !v.synced);

      for (let item of unsyncedNotes) {
        try {
          const createResponse = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
              title: item.title,
              body: item.body,
              userId: item.userId,
            }
          );
          if (createResponse.status === 201) {
            await updateData({ ...item, synced: true });
          }
        } catch (error) {
          console.error(`Failed to sync note ${item.id}:`, error);
        }
      }
      // Refresh notes after sync
      const updatedNotes = await fetchAll();
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to sync local notes:", error);
    }
  }, [isOnline]);

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // Load initial notes from IndexedDB on mount
    const loadInitialNotes = async () => {
      const localNotes = await fetchAll();
      setNotes(localNotes);
    };
    loadInitialNotes();
  }, []);

  useEffect(() => {
    // Fetch from API and sync when online status changes
    if (isOnline) {
      fetchFromAPIAndSync();
      addLocalNotesIntoAPI();
    }
  }, [isOnline, fetchFromAPIAndSync, addLocalNotesIntoAPI]);

  return (
    <div>
      <div className="mb-4">
        <span
          className={`px-2 py-1 rounded text-sm ${
            isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </span>
        {isSyncing && (
          <span className="ml-2 px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
            Syncing...
          </span>
        )}
      </div>
      <input
        placeholder="enter something..."
        value={note}
        onChange={(e) => {
          const value = e.target.value;
          setNote(value);
        }}
      />
      <button onClick={handleSubmit} disabled={isSyncing}>
        Submit
      </button>

      <div>
        {notes.map((value) => {
          return (
            <div
              key={value.id}
              className="flex justify-start items-end gap-1 p-3"
            >
              <p className="text-sm">{value.id}</p>
              <p className="text-lg">{value.title}</p>
              {!value.synced && (
                <span className="ml-2 text-xs text-orange-500">
                  (Pending sync)
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfflineFirstApp;
