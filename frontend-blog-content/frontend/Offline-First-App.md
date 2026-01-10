# Building an Offline-First React Application with IndexedDB

In today's world, users expect applications to work seamlessly regardless of their internet connection. Whether you're on a spotty mobile network or completely offline, your app should continue functioning. In this tutorial, we'll build an offline-first note-taking application using React and IndexedDB.

## What is Offline-First?

Offline-first is a design approach where applications prioritize local data storage and sync with the server when connectivity is available. This ensures users can continue working even when their internet connection is unreliable or unavailable.

## Why IndexedDB?

IndexedDB is a low-level API for client-side storage of significant amounts of structured data. Unlike localStorage, it can store complex data types and larger amounts of data, making it perfect for offline-first applications.

## Key Features We'll Implement

- **Local data persistence** using IndexedDB
- **Online/offline status detection**
- **Automatic synchronization** when connection is restored
- **Optimistic UI updates** for better user experience
- **Background sync** for unsynced data

## Setting Up IndexedDB

First, let's create our database initialization function. This sets up two object stores: one for our notes and one for an outbox (for future use):

```javascript
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
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
```

## Core CRUD Operations

We need basic operations to interact with IndexedDB:

### Adding Data

```javascript
const addData = async (entity) => {
  const db = await InitDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).add(entity);
  
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve("added");
    tx.onerror = () => reject(tx.error);
  });
};
```

### Fetching Data

```javascript
const fetchAll = async () => {
  const db = await InitDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const req = store.getAll();
    tx.oncomplete = () => resolve(req.result);
    tx.onerror = () => reject(tx.error);
  });
};
```

## Detecting Online/Offline Status

React makes it easy to listen for connectivity changes:

```javascript
useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
```

## Syncing Strategy

Our app implements a two-way sync:

### 1. Fetch from API and Update Local Database

When the app comes online, we fetch data from the API and store it locally:

```javascript
const fetchFromAPIAndSync = async () => {
  if (!isOnline) return;

  setIsSyncing(true);
  try {
    const response = await axios.get(API_URL);
    const localNotes = await fetchAll();

    for (const item of response.data) {
      const exists = localNotes?.find((n) => n?.id === item?.id);
      if (!exists) {
        await addData({
          id: item.id,
          title: item.title,
          body: item.body,
          synced: true,
        });
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    setIsSyncing(false);
  }
};
```

### 2. Push Local Changes to API

We also need to sync local changes that were made offline:

```javascript
const addLocalNotesIntoAPI = async () => {
  if (!isOnline) return;

  const response = await fetchAll();
  const unsyncedNotes = response.filter((v) => !v.synced);

  for (let item of unsyncedNotes) {
    try {
      const createResponse = await axios.post(API_URL, {
        title: item.title,
        body: item.body,
      });
      
      if (createResponse.status === 201) {
        await updateData({ ...item, synced: true });
      }
    } catch (error) {
      console.error(`Failed to sync note ${item.id}:`, error);
    }
  }
};
```

## Optimistic UI Updates

When users create a note, we immediately add it to the local database and update the UI, providing instant feedback:

```javascript
const handleSubmit = async () => {
  if (!note.trim()) return;

  const payload = {
    id: Math.floor(Math.random() * 10000),
    title: note,
    body: note,
    synced: false,
  };

  await addData(payload);
  setNote("");
  setNotes((prev) => [...prev, payload]);
};
```

## User Experience Enhancements

### Status Indicators

Show users whether they're online or offline:

```jsx
<span className={`px-2 py-1 rounded text-sm ${
  isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
}`}>
  {isOnline ? "🟢 Online" : "🔴 Offline"}
</span>
```

### Sync Indicators

Let users know when their unsynced changes are being uploaded:

```jsx
{!value.synced && (
  <span className="ml-2 text-xs text-orange-500">
    (Pending sync)
  </span>
)}
```

## Best Practices

1. **Always handle errors gracefully** - Network requests can fail, and IndexedDB operations can error out
2. **Use transactions** - Group related IndexedDB operations in transactions for atomicity
3. **Track sync status** - Mark items as synced/unsynced to avoid duplicate uploads
4. **Debounce sync operations** - Avoid overwhelming the server with too many requests
5. **Consider conflict resolution** - In production apps, handle cases where server data conflicts with local changes

## Potential Improvements

- **Implement delete functionality** with tombstone records for proper sync
- **Add timestamp-based conflict resolution**
- **Use Service Workers** for true background sync
- **Implement a retry mechanism** for failed sync attempts
- **Add optimistic locking** to prevent data conflicts

## Conclusion

Building offline-first applications significantly improves user experience, especially for users with unreliable internet connections. IndexedDB provides a powerful, flexible storage solution that works seamlessly with modern web applications.

The pattern we've explored here can be adapted to various use cases, from simple note-taking apps to complex data-heavy applications. The key is to always prioritize local data, sync intelligently, and provide clear feedback to users about the state of their data.

Start building offline-first, and your users will thank you for it!