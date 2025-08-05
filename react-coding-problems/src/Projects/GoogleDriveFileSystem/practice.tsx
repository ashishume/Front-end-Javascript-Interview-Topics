export type FileType = "file" | "folder";
export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
}
import { Button } from "@mui/material";
import { ArrowBigLeft, ArrowBigRight, Pencil, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";

const fileSystemData: FileSystemItem[] = [
  {
    id: "1",
    name: "Root Folder",
    type: "folder" as FileType,
    parentId: null,
  },
  {
    id: "2",
    name: "Documents",
    type: "folder" as FileType,
    parentId: "1",
  },
  {
    id: "3",
    name: "Photos",
    type: "folder" as FileType,
    parentId: "1",
  },
  {
    id: "4",
    name: "Resume.pdf",
    type: "file" as FileType,
    parentId: "2",
  },
  {
    id: "5",
    name: "CoverLetter.docx",
    type: "file" as FileType,
    parentId: "2",
  },
  {
    id: "6",
    name: "Vacation.png",
    type: "file" as FileType,
    parentId: "3",
  },
  {
    id: "7",
    name: "2023",
    type: "folder" as FileType,
    parentId: "3",
  },
  {
    id: "8",
    name: "GoaTrip.jpg",
    type: "file" as FileType,
    parentId: "7",
  },
];

const FileSystem = () => {
  const [allFiles, setAllFiles] = useState(fileSystemData); // Full data
  const [files, setFiles] = useState(
    fileSystemData.filter((f) => f.parentId === null)
  );
  const [currentFolders, setCurrentFolders] = useState<string[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [showInputFileName, setFileInput] = useState(false);
  const [editMode, setEditMode] = useState<FileSystemItem | null>(null);
  const [fileName, setFileName] = useState("");

  const findNestedFiles = (folderId: string | null, allFs = allFiles) => {
    return allFs.filter((val) => val.parentId === folderId);
  };

  const onFolderClick = (folderId: string) => {
    setCurrentFolders((prev) => [...prev, folderId]);
    setActiveFolderId(folderId);
    const nestedFiles = findNestedFiles(folderId);
    setFiles(nestedFiles);
  };

  const onBackPress = () => {
    const updatedStack = [...currentFolders];
    updatedStack.pop(); // remove current folder
    const previousFolderId = updatedStack[updatedStack.length - 1] ?? null;

    setCurrentFolders(updatedStack);
    setActiveFolderId(previousFolderId);
    const nestedFiles = findNestedFiles(previousFolderId);
    setFiles(nestedFiles);
  };

  const handleFileSubmit = (e: any) => {
    e.preventDefault();

    const payload: FileSystemItem = {
      id: editMode ? editMode.id : uuid(),
      name: fileName,
      type: "file",
      parentId: editMode ? editMode.parentId : activeFolderId,
    };

    if (!editMode) {
      setAllFiles((prev) => [...prev, payload]);
      if (payload.parentId === activeFolderId) {
        setFiles((prev) => [...prev, payload]);
      }
    } else {
      setAllFiles((prev) =>
        prev.map((item) =>
          item.id === payload.id ? { ...item, name: fileName } : item
        )
      );
      setFiles((prev) =>
        prev.map((item) =>
          item.id === payload.id ? { ...item, name: fileName } : item
        )
      );
    }

    setFileInput(false);
    setFileName("");
    setEditMode(null);
  };

  const handleEdit = (file: FileSystemItem) => {
    setEditMode(file);
    setFileName(file.name);
    setFileInput(true);
  };

  return (
    <div className="p-2 m-2">
      {currentFolders.length > 0 && (
        <div
          className="flex items-center underline cursor-pointer"
          onClick={onBackPress}
        >
          <ArrowBigLeft /> Go back
        </div>
      )}

      <Button onClick={() => setFileInput(true)}>Add New file</Button>

      {showInputFileName && (
        <form className="flex gap-2 items-center" onSubmit={handleFileSubmit}>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="enter file name"
          />
          <Button variant="outlined" size="small" type="submit">
            Submit
          </Button>
          <Trash2 onClick={() => setFileInput(false)} />
        </form>
      )}

      {files.map((file) => (
        <Fragment key={file.id}>
          <div
            className={`${
              file.type === "folder"
                ? "font-bold cursor-pointer hover:bg-gray-200"
                : "text-base"
            } flex py-4 border-b max-w-[50%] justify-between`}
            onClick={
              file.type === "folder" ? () => onFolderClick(file.id) : undefined
            }
          >
            <span>{file.name}</span>
            {file.type === "folder" && <ArrowBigRight />}
            {file.type === "file" && (
              <Pencil onClick={() => handleEdit(file)} />
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default FileSystem;
