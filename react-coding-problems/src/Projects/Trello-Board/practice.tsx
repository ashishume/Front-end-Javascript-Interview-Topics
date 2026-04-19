import { PlusCircle, X } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

type BoardItem = {
    itemId: string;
    itemName: string;
    itemDesc: string;
};

type ColumnData = {
    id: string;
    name: string;
    items: BoardItem[];
};

type BoardData = Record<string, ColumnData>;

type EditingState = {
    id: string | null;
    itemId: string | null;
    isVisible: boolean;
};

type BoardCardProps = {
    columnId: string;
    itemId: string;
    itemName: string;
    isEditing: boolean;
    onRequestEdit: (columnId: string, itemId: string) => void;
    onSave: (columnId: string, itemId: string, itemName: string) => void;
    onCancel: () => void;
};

const BoardCard = memo(function BoardCard({
    columnId,
    itemId,
    itemName,
    isEditing,
    onRequestEdit,
    onSave,
    onCancel,
}: BoardCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [draft, setDraft] = useState(itemName);

    useEffect(() => {
        if (isEditing) {
            setDraft(itemName);
        }
    }, [isEditing, itemName]);

    useEffect(() => {
        if (!isEditing) return;
        let cancelled = false;
        const frame = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!cancelled) inputRef.current?.focus();
            });
        });
        return () => {
            cancelled = true;
            cancelAnimationFrame(frame);
        };
    }, [isEditing]);

    if (isEditing) {
        return (
            <div className="p-1 m-2 flex flex-row justify-center items-center">
                <input
                    ref={inputRef}
                    placeholder="enter title"
                    className="border border-black max-w-full"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                />
                <PlusCircle
                    className="cursor-pointer shrink-0"
                    onClick={() => onSave(columnId, itemId, draft)}
                />
                <X className="cursor-pointer shrink-0" onClick={onCancel} />
            </div>
        );
    }

    return (
        <div
            onDoubleClick={() => onRequestEdit(columnId, itemId)}
            className="flex justify-center items-center h-[100px] border px-2 m-2 rounded bg-blue-100"
        >
            {itemName}
        </div>
    );
});

type BoardColumnProps = {
    id: string;
    name: string;
    items: BoardItem[];
    editingColumnId: string | null;
    editingItemId: string | null;
    onAddCard: (columnId: string) => void;
    onRequestEdit: (columnId: string, itemId: string) => void;
    onSaveCard: (columnId: string, itemId: string, itemName: string) => void;
    onCancelEdit: () => void;
};

const BoardColumn = memo(function BoardColumn({
    id,
    name,
    items,
    editingColumnId,
    editingItemId,
    onAddCard,
    onRequestEdit,
    onSaveCard,
    onCancelEdit,
}: BoardColumnProps) {
    const handleAdd = useCallback(() => onAddCard(id), [id, onAddCard]);

    return (
        <div className="border border-1 flex-grow flex-1">
            <div className="p-2 text-center text-lg border-b">
                {name}{" "}
                <button
                    type="button"
                    className="p-2 bg-gray-100 rounded-lg text-sm"
                    onClick={handleAdd}
                >
                    Add New
                </button>
            </div>
            <div className="overflow-x-hidden border-black">
                {items.map((item) => (
                    <BoardCard
                        key={item.itemId}
                        columnId={id}
                        itemId={item.itemId}
                        itemName={item.itemName}
                        isEditing={
                            editingColumnId === id &&
                            editingItemId === item.itemId
                        }
                        onRequestEdit={onRequestEdit}
                        onSave={onSaveCard}
                        onCancel={onCancelEdit}
                    />
                ))}
            </div>
        </div>
    );
});

const App = () => {
    const [showInputField, setInputField] = useState<EditingState>({
        id: null,
        itemId: null,
        isVisible: false,
    });

    const [data, setData] = useState<BoardData>({
        todo: {
            id: "todo",
            name: "Todo",
            items: [],
        },
        "in-progress": {
            id: "in-progress",
            name: "In progress",
            items: [],
        },
        "pr-raised": {
            id: "pr-raised",
            name: "PR raised",
            items: [],
        },
        done: {
            id: "done",
            name: "Done",
            items: [],
        },
    });

    const addNewCard = useCallback((columnId: string) => {
        setData((prev) => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                items: [
                    ...prev[columnId].items,
                    {
                        itemId: uuid(),
                        itemName: "Empty Todo",
                        itemDesc: "",
                    },
                ],
            },
        }));
    }, []);

    const handleCardClick = useCallback((columnId: string, itemId: string) => {
        setInputField({
            id: columnId,
            itemId,
            isVisible: true,
        });
    }, []);

    const submitCardValue = useCallback(
        (columnId: string, itemId: string, itemName: string) => {
            setData((prev) => ({
                ...prev,
                [columnId]: {
                    ...prev[columnId],
                    items: prev[columnId].items.map((item) =>
                        item.itemId === itemId ? { ...item, itemName } : item
                    ),
                },
            }));
            setInputField({
                id: null,
                itemId: null,
                isVisible: false,
            });
        },
        []
    );

    const cancelEdit = useCallback(() => {
        setInputField({
            id: null,
            itemId: null,
            isVisible: false,
        });
    }, []);

    const editingColumnId = showInputField.isVisible ? showInputField.id : null;
    const editingItemId = showInputField.isVisible ? showInputField.itemId : null;

    return (
        <div className="max-h-screen container">
            <div className="flex shadow-lg h-screen rounded-md">
                {Object.entries(data).map(([key, { id, name, items }]) => (
                    <BoardColumn
                        key={key}
                        id={id}
                        name={name}
                        items={items}
                        editingColumnId={editingColumnId}
                        editingItemId={editingItemId}
                        onAddCard={addNewCard}
                        onRequestEdit={handleCardClick}
                        onSaveCard={submitCardValue}
                        onCancelEdit={cancelEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
