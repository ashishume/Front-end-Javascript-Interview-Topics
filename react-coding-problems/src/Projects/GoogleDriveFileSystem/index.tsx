import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

const GoogleDriveFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileItem[]>([
    {
      id: "1",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "2",
          name: "Work",
          type: "folder",
          children: [
            {
              id: "3",
              name: "Project1.docx",
              type: "file",
            },
          ],
        },
        {
          id: "4",
          name: "Personal",
          type: "folder",
          children: [],
        },
      ],
    },
    {
      id: "5",
      name: "Images",
      type: "folder",
      children: [
        {
          id: "6",
          name: "vacation.jpg",
          type: "file",
        },
      ],
    },
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>(fileSystem);

  const getItemPath = (item: FileItem, items: FileItem[]): string | null => {
    const findPath = (
      currentItems: FileItem[],
      targetId: string,
      currentPath: string = ""
    ): string | null => {
      for (const currentItem of currentItems) {
        const itemPath = currentPath + "/" + currentItem.name;
        if (currentItem.id === targetId) {
          return itemPath;
        }
        if (currentItem.children) {
          const foundPath = findPath(currentItem.children, targetId, itemPath);
          if (foundPath) return foundPath;
        }
      }
      return null;
    };
    return findPath(items, item.id);
  };

  const findItemByPath = (path: string): FileItem | null => {
    const findInArray = (
      items: FileItem[],
      currentPath: string = ""
    ): FileItem | null => {
      for (const item of items) {
        const itemPath = currentPath + "/" + item.name;
        if (itemPath === path) return item;
        if (item.children) {
          const found = findInArray(item.children, itemPath);
          if (found) return found;
        }
      }
      return null;
    };
    return findInArray(fileSystem);
  };

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === "folder") {
      const path = getItemPath(folder, fileSystem);
      if (path) {
        setCurrentPath(path);
        setCurrentFolder(folder.children || []);
      }
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
    };

    // Create updated children array immediately
    const updatedChildren = [...(parent.children || []), newFile];

    // Update currentFolder first if we're in the correct folder
    if (currentPath === parentPath) {
      setCurrentFolder(updatedChildren);
    }

    // Then update the file system
    setFileSystem((prev) => {
      const updateChildren = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (getItemPath(item, prev) === parentPath) {
            return {
              ...item,
              children: updatedChildren,
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
          if (getItemPath(item, prev) === itemPath) {
            return {
              ...item,
              name: newName,
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
      const updatedSystem = updateName(prev);

      // Update currentFolder if we're in a subfolder
      if (currentPath !== "/") {
        const parent = findItemByPath(currentPath);
        if (parent) {
          setCurrentFolder(parent.children || []);
        }
      } else {
        setCurrentFolder(updatedSystem);
      }

      return updatedSystem;
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
            <Button
              size="sm"
              onClick={() => saveEdit(getItemPath(item, fileSystem) || "")}
            >
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
                onClick={() => addNewFile(getItemPath(item, fileSystem) || "")}
              >
                +
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const navigateToPath = (path: string) => {
    if (path === "/") {
      setCurrentPath("/");
      setCurrentFolder(fileSystem);
      return;
    }

    const targetFolder = findItemByPath(path);
    if (targetFolder && targetFolder.type === "folder") {
      setCurrentPath(path);
      setCurrentFolder(targetFolder.children || []);
    }
  };

  const Breadcrumbs = () => {
    const pathSegments = currentPath.split("/").filter(Boolean);

    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => navigateToPath("/")}
          className="px-2"
        >
          Root
        </Button>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          return (
            <div key={path} className="flex items-center">
              <span className="mx-2">/</span>
              <Button
                variant="ghost"
                onClick={() => navigateToPath(path)}
                className="px-2"
              >
                {segment}
              </Button>
            </div>
          );
        })}
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
          <Breadcrumbs />
        </div>
        {currentFolder.map((item) => renderFileItem(item))}
      </div>
    </div>
  );
};

export default GoogleDriveFileSystem;
