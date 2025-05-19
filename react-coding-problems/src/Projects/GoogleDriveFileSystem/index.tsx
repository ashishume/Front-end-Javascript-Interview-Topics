import { useState, useEffect } from "react";
import {
  FolderOpen,
  File,
  Trash2,
  Edit,
  Search,
  ChevronRight,
  Home,
} from "lucide-react";

// Define types for our file system
type FileType = "file" | "folder";

interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
}

const FileManager = () => {
  // State
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FileSystemItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Generate a unique ID
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Initialize the file system with a root directory
  useEffect(() => {
    if (items.length === 0) {
      const rootItems: FileSystemItem[] = [
        { id: "root", name: "Home", type: "folder", parentId: null },
        {
          id: "documents",
          name: "Documents",
          type: "folder",
          parentId: "root",
        },
        { id: "images", name: "Images", type: "folder", parentId: "root" },
        { id: "readme", name: "README.txt", type: "file", parentId: "root" },
      ];
      setItems(rootItems);
      setCurrentPath(["Home"]);
      setCurrentParentId("root");
    }
  }, [items.length]);

  // Get items in the current directory
  const getCurrentItems = (): FileSystemItem[] => {
    if (isSearching) {
      return searchResults;
    }
    return items.filter((item) => item.parentId === currentParentId);
  };

  // Create a new item (file or folder)
  const createItem = (type: FileType) => {
    const newName = type === "folder" ? "New Folder" : "New File.txt";
    const newId = generateId();
    const newItem: FileSystemItem = {
      id: newId,
      name: newName,
      type,
      parentId: currentParentId,
    };
    setItems([...items, newItem]);
    setEditingItem(newId);
    setEditName(newName);
  };

  // Delete an item
  const deleteItem = (id: string) => {
    // Recursive function to get all child IDs
    const getChildrenIds = (itemId: string): string[] => {
      const children = items.filter((item) => item.parentId === itemId);
      const childrenIds = children.map((child) => child.id);
      const descendantIds = children
        .filter((child) => child.type === "folder")
        .flatMap((folder) => getChildrenIds(folder.id));
      return [...childrenIds, ...descendantIds];
    };

    const idsToRemove = [id, ...getChildrenIds(id)];
    setItems(items.filter((item) => !idsToRemove.includes(item.id)));
  };

  // Navigate to a folder
  const navigateToFolder = (id: string, name: string) => {
    setIsSearching(false);
    setCurrentParentId(id);
    setCurrentPath([...currentPath, name]);
  };

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length <= 1) return;

    const newPath = [...currentPath];
    newPath.pop();
    setCurrentPath(newPath);

    // Find the parent ID
    const currentFolder = items.find(
      (item) =>
        item.name === currentPath[currentPath.length - 1] &&
        item.parentId === currentParentId
    );

    if (currentFolder) {
      setCurrentParentId(currentFolder.parentId);
    } else {
      // If we can't find the current folder, navigate to root
      setCurrentParentId("root");
      setCurrentPath(["Home"]);
    }
  };

  // Navigate to a specific path level
  const navigateToPathLevel = (index: number) => {
    if (index === 0) {
      // Navigate to root
      setCurrentParentId("root");
      setCurrentPath(["Home"]);
      setIsSearching(false);
      return;
    }

    // Build path up to the clicked index
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);

    // Find the folder ID at this path level
    let folderId = "root";
    for (let i = 1; i <= index; i++) {
      const folderName = newPath[i];
      const folder = items.find(
        (item) => item.name === folderName && item.parentId === folderId
      );
      if (folder) {
        folderId = folder.id;
      } else {
        // Fallback to root if we can't find the path
        setCurrentParentId("root");
        setCurrentPath(["Home"]);
        setIsSearching(false);
        return;
      }
    }

    setCurrentParentId(folderId);
    setIsSearching(false);
  };

  // Begin editing an item's name
  const startRenaming = (id: string, name: string) => {
    setEditingItem(id);
    setEditName(name);
  };

  // Save the new name of an item
  const saveNewName = () => {
    if (!editingItem) return;

    setItems(
      items.map((item) =>
        item.id === editingItem ? { ...item, name: editName } : item
      )
    );
    setEditingItem(null);
  };

  // Handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  // Get the breadcrumb path
  const getBreadcrumbs = () => {
    return (
      <div className="flex items-center space-x-1 text-sm mb-4 overflow-x-auto">
        {currentPath.map((name, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={16} className="mx-1 text-gray-400" />
            )}
            <button
              onClick={() => navigateToPathLevel(index)}
              className="hover:bg-gray-100 px-2 py-1 rounded flex items-center"
            >
              {index === 0 && <Home size={16} className="mr-1" />}
              <span>{name}</span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Manager</h1>

      {/* Search */}
      <div className="flex mb-4">
        <div className="flex w-full max-w-md border rounded overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files and folders..."
            className="flex-grow px-4 py-2 outline-none"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 flex items-center"
          >
            <Search size={16} />
          </button>
        </div>
        {isSearching && (
          <button
            onClick={clearSearch}
            className="ml-2 px-3 py-2 border rounded hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => createItem("folder")}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FolderOpen size={16} className="mr-2" />
          New Folder
        </button>
        <button
          onClick={() => createItem("file")}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <File size={16} className="mr-2" />
          New File
        </button>
        {currentPath.length > 1 && !isSearching && (
          <button
            onClick={navigateUp}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Go Up
          </button>
        )}
      </div>

      {/* Breadcrumbs */}
      {!isSearching ? (
        getBreadcrumbs()
      ) : (
        <div className="mb-4 text-sm">
          <span className="font-medium">Search results for: </span>
          <span className="italic">{searchTerm}</span>
        </div>
      )}

      {/* File list */}
      <div className="border rounded overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 flex font-medium">
          <div className="w-8"></div>
          <div className="flex-grow">Name</div>
          <div className="w-24">Type</div>
          <div className="w-24">Actions</div>
        </div>

        <div className="divide-y">
          {getCurrentItems().length > 0 ? (
            getCurrentItems().map((item) => (
              <div
                key={item.id}
                className="px-4 py-2 flex items-center hover:bg-gray-50"
              >
                <div className="w-8">
                  {item.type === "folder" ? (
                    <FolderOpen size={18} className="text-yellow-500" />
                  ) : (
                    <File size={18} className="text-blue-500" />
                  )}
                </div>

                <div className="flex-grow">
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={saveNewName}
                      onKeyPress={(e) => e.key === "Enter" && saveNewName()}
                      className="border px-2 py-1 w-full"
                      autoFocus
                    />
                  ) : (
                    <div
                      className={`${
                        item.type === "folder"
                          ? "hover:text-blue-500 cursor-pointer"
                          : ""
                      }`}
                      onClick={() =>
                        item.type === "folder" &&
                        navigateToFolder(item.id, item.name)
                      }
                    >
                      {item.name}
                    </div>
                  )}
                </div>

                <div className="w-24 text-gray-500">{item.type}</div>

                <div className="w-24 flex space-x-2">
                  <button
                    onClick={() => startRenaming(item.id, item.name)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1 hover:bg-gray-200 rounded text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              {isSearching
                ? "No matching files or folders found"
                : "This folder is empty"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
