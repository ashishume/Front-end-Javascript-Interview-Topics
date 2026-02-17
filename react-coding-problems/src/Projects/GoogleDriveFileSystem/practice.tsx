import { ArrowBigLeft, Edit2, FileText, Folder } from "lucide-react";
import { useEffect, useState } from "react";

export interface FileFolderType {
  id: number;
  type: string;
  name: string;
  parentId?: number;
}

export const fileSystem: FileFolderType[] = [
  {
    id: 1,
    type: "file",
    name: "file_name_1",
  },
  {
    id: 2,
    type: "file",
    name: "file_name_2",
  },
  {
    id: 3,
    parentId: 11,
    type: "file",
    name: "file_inside_folder_1",
  },
  {
    id: 4,
    parentId: 12,
    type: "file",
    name: "file_inside_folder_2",
  },
  {
    id: 5,
    parentId: 13,
    type: "file",
    name: "file_inside_folder_3",
  },
  {
    id: 6,
    parentId: 13,
    type: "file",
    name: "2nd_file_inside_folder_3",
  },
  {
    id: 11,
    type: "folder",
    name: "folder_1",
  },
  {
    id: 12,
    type: "folder",
    name: "folder_2",
  },
  {
    id: 13,
    type: "folder",
    name: "folder_3",
  },

  {
    id: 14,
    parentId: 11,
    type: "folder",
    name: "folder_inside_folder1",
  },
  {
    id: 7,
    parentId: 14,
    type: "file",
    name: "file_inside_folder(nested)",
  },
];

const practice = () => {
  const [files, setFiles] = useState(fileSystem);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState<string[]>(["root"]);
  const [currentParentId, setParentId] = useState<number>();
  const [editItem, setEditItem] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  const isFolder = (file: FileFolderType) => {
    return file.type === "folder" ? <Folder /> : null;
  };

  const isRoot = () => {
    return currentPath.length === 1;
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    file: FileFolderType
  ) => {
    if (file.type === "folder") {
      const nestedFiles = files.filter((val) => val.parentId === file.id);
      setParentId(file.id);
      setCurrentPath([...currentPath, file.name]);
      setFilteredFiles(nestedFiles);
    }
  };

  const setPath = () => {
    const newPath = [...currentPath];
    newPath.pop();
    setCurrentPath(newPath);

    const parentId = files.find((val) => val.id === currentParentId).parentId;

    if (parentId) {
      setParentId(parentId);
    }
  };

  useEffect(() => {
    if (!isRoot()) {
      const nestedFiles = files.filter(
        (val) => val.parentId === currentParentId
      );
      setFilteredFiles(nestedFiles);
    } else {
      setFilteredFiles(files);
    }
  }, [currentPath, currentParentId]);

  const handleEdit = (e: any, file: FileFolderType) => {
    setEditItem(file.name);
    setEditItemId(file.id);
    e.stopPropagation();
  };

  const editHandler = (e) => {
    setEditItem(e.target.value);
  };

  const handleSubmit = () => {
    setFilteredFiles((prev) => {
      return prev.map((value) => {
        if (value.id === editItemId) {
          let item = {
            ...value,
            name: editItem,
          };

          return item;
        }
        return value;
      });
    });

    setEditItem(null);
    setEditItemId(null);
  };

  const onFileAdd = () => {
    let payload: FileFolderType = {
      parentId: currentParentId,
      id: 1 + Math.floor(Math.random() * 10000),
      name: "Untitled file",
      type: "file",
    };

    setFiles((prev) => [...prev, payload]);

    setFilteredFiles((prev) => [...prev, payload]);
  };

  return (
    <div className="p-4">
      <div className="text-2xl pb-4">File system</div>

      <div className="flex flex-col gap-2">
        {!isRoot() && <ArrowBigLeft onClick={setPath} />}

        {editItem && (
          <>
            <input
              placeholder="enter file name"
              value={editItem}
              onChange={editHandler}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}

        <div className="cursor-pointer" onClick={onFileAdd}>
          Add File +
        </div>
        {filteredFiles.map((file) => {
          const shouldRender = isRoot() ? !file.parentId : true;

          if (!shouldRender) return null;

          return (
            <div onClick={(event) => handleClick(event, file)} key={file.id}>
              {isFolder(file) ? (
                <div className="flex gap-2 p-2 font-bold cursor-pointer hover:bg-sky-300">
                  <Folder /> <span>{file.name}</span>
                  <Edit2 onClick={(e) => handleEdit(e, file)} />
                </div>
              ) : (
                <div className="flex gap-2 p-2 cursor-pointer hover:bg-sky-100">
                  <FileText /> <span>{file.name}</span>
                  <Edit2 onClick={(e) => handleEdit(e, file)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default practice;
