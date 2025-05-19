import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  path: string;
}

const GoogleDriveFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileItem[]>([
    {
      id: "1",
      name: "Documents",
      type: "folder",
      path: "/Documents",
      children: [
        {
          id: "2",
          name: "Work",
          type: "folder",
          path: "/Documents/Work",
          children: [
            {
              id: "3",
              name: "Project1.docx",
              type: "file",
              path: "/Documents/Work/Project1.docx",
            },
          ],
        },
        {
          id: "4",
          name: "Personal",
          type: "folder",
          path: "/Documents/Personal",
          children: [],
        },
      ],
    },
    {
      id: "5",
      name: "Images",
      type: "folder",
      path: "/Images",
      children: [
        {
          id: "6",
          name: "vacation.jpg",
          type: "file",
          path: "/Images/vacation.jpg",
        },
      ],
    },
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>(fileSystem);

  const findItemByPath = (path: string): FileItem | null => {
    const findInArray = (items: FileItem[]): FileItem | null => {
      for (const item of items) {
        if (item.path === path) return item;
        if (item.children) {
          const found = findInArray(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInArray(fileSystem);
  };

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === "folder") {
      setCurrentPath(folder.path);
      setCurrentFolder(folder.children || []);
    }
  };

  const navigateUp = () => {
    if (currentPath === "/") return;

    const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    const parent = findItemByPath(parentPath);

    if (parent) {
      setCurrentPath(parentPath);
      setCurrentFolder(parent.children || []);
    } else {
      setCurrentPath("/");
      setCurrentFolder(fileSystem);
    }
  };

  const addNewFile = (parentPath: string) => {
    const parent = findItemByPath(parentPath);
    if (!parent || parent.type !== "folder") return;

    const newFile: FileItem = {
      id: Date.now().toString(),
      name: "New File",
      type: "file",
      path: `${parentPath}/New File`,
    };

    setFileSystem((prev) => {
      const updateChildren = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.path === parentPath) {
            return {
              ...item,
              children: [...(item.children || []), newFile],
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateChildren(item.children),
            };
          }
          return item;
        });
      };
      return updateChildren(prev);
    });
  };

  const startEditing = (itemId: string, currentName: string) => {
    setEditingItem(itemId);
    setNewName(currentName);
  };

  const saveEdit = (itemPath: string) => {
    if (!newName.trim()) return;

    setFileSystem((prev) => {
      const updateName = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.path === itemPath) {
            const newPath =
              itemPath.substring(0, itemPath.lastIndexOf("/") + 1) + newName;
            return {
              ...item,
              name: newName,
              path: newPath,
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateName(item.children),
            };
          }
          return item;
        });
      };
      return updateName(prev);
    });

    setEditingItem(null);
    setNewName("");
  };

  const renderFileItem = (item: FileItem) => {
    return (
      <div key={item.id} className="flex items-center gap-2 py-1">
        {editingItem === item.id ? (
          <div className="flex gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-6"
            />
            <Button size="sm" onClick={() => saveEdit(item.path)}>
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => navigateToFolder(item)}
            >
              {item.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => startEditing(item.id, item.name)}
            >
              ✎
            </Button>
            {item.type === "folder" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addNewFile(item.path)}
              >
                +
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Google Drive File System</h1>
      <div className="border rounded-lg p-4">
        <div className="mb-4 flex items-center gap-2">
          <Button variant="outline" onClick={navigateUp}>
            ↑
          </Button>
          <span className="font-semibold">Current Path: </span>
          {currentPath}
        </div>
        {currentFolder.map((item) => renderFileItem(item))}
      </div>
    </div>
  );
};

export default GoogleDriveFileSystem;
