import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTNI0AHWWh5Q6Vx-mkdSMb7K2Ua7VDNpA",
  authDomain: "cycle-demo-client.firebaseapp.com",
  projectId: "cycle-demo-client",
  storageBucket: "cycle-demo-client.firebasestorage.app",
  messagingSenderId: "641959779564",
  appId: "1:641959779564:web:2546dba74b39eedf4099c9",
  measurementId: "G-B50G4LYHSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add TypeScript interfaces at the top of the file
interface User {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  paidBy: string;
  paidByName: string;
  amount: number;
  description: string;
  splitWith: string[];
  date: string;
}

interface Settlement {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  amount: number;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// PWA installation prompt component
const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const onClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
      }
    });
  };

  if (!supportsPWA || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 flex justify-between items-center">
      <p>Install this app on your device for offline use</p>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded font-medium"
        onClick={onClick}
      >
        Install
      </button>
    </div>
  );
};

const ExpenseSplittingApp = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    paidBy: "",
    amount: "",
    description: "",
    splitWith: [] as string[],
  });
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  // Add a new user
  const addUser = async () => {
    if (newUserName.trim() === "") return;

    const userExists = users.some(
      (user) => user.name.toLowerCase() === newUserName.toLowerCase()
    );

    if (userExists) {
      alert("This user already exists!");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: newUserName,
        createdAt: new Date().toISOString(),
      });
      setNewUserName("");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Error adding user. Please try again.");
    }
  };

  // Toggle user selection for expense splitting
  const toggleUserForExpense = (userId: string) => {
    const currentSelection = [...newExpense.splitWith];
    const index = currentSelection.indexOf(userId);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(userId);
    }

    setNewExpense({
      ...newExpense,
      splitWith: currentSelection,
    });
  };

  // Add a new expense
  const addExpense = async () => {
    if (
      !newExpense.paidBy ||
      !newExpense.amount ||
      !newExpense.description ||
      newExpense.splitWith.length === 0
    ) {
      alert(
        "Please fill in all expense details and select at least one person to split with!"
      );
      return;
    }

    const paidByUser = users.find((user) => user.id === newExpense.paidBy);

    if (!paidByUser) {
      alert("Error: Payer not found!");
      return;
    }

    try {
      const expenseData = {
        paidBy: newExpense.paidBy,
        paidByName: paidByUser.name,
        amount: parseFloat(newExpense.amount),
        description: newExpense.description,
        splitWith: newExpense.splitWith,
        date: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "expenses"), expenseData);

      setNewExpense({
        paidBy: "",
        amount: "",
        description: "",
        splitWith: [],
      });
    } catch (error) {
      console.error("Error adding expense: ", error);
      alert("Error adding expense. Please try again.");
    }
  };

  // Calculate settlements
  const calculateSettlements = (currentExpenses: Expense[]) => {
    // Create a balance object for each user
    const balances: Record<string, number> = {};
    users.forEach((user) => {
      balances[user.id] = 0;
    });

    // Calculate initial balances based on who paid and how much
    currentExpenses.forEach((expense) => {
      const paidBy = expense.paidBy;
      const totalAmount = expense.amount;
      const splitWith = expense.splitWith;
      const amountPerPerson = totalAmount / (splitWith.length + 1); // +1 for the payer

      // Add the full amount to the payer's balance
      balances[paidBy] += totalAmount;

      // Subtract the individual share from each person's balance
      splitWith.forEach((userId) => {
        balances[userId] -= amountPerPerson;
      });

      // Subtract payer's own share
      balances[paidBy] -= amountPerPerson;
    });

    // Generate settlements
    const newSettlements: Settlement[] = [];

    // Helper function to round to 2 decimal places
    const roundTo2Decimals = (num: number) => {
      return Math.round(num * 100) / 100;
    };

    // For each user with negative balance (owes money)
    users.forEach((debtor) => {
      if (balances[debtor.id] < -0.01) {
        // Small threshold to handle floating point errors
        // Find users with positive balances (owed money)
        users.forEach((creditor) => {
          if (balances[creditor.id] > 0.01 && balances[debtor.id] < -0.01) {
            // Determine the amount to settle
            const amountToSettle = Math.min(
              Math.abs(balances[debtor.id]),
              balances[creditor.id]
            );

            if (amountToSettle > 0.01) {
              // Another small threshold
              // Create a settlement record
              newSettlements.push({
                id: `${debtor.id}-${creditor.id}-${Date.now()}`,
                from: debtor.id,
                fromName: debtor.name,
                to: creditor.id,
                toName: creditor.name,
                amount: roundTo2Decimals(amountToSettle),
              });

              // Update balances
              balances[debtor.id] += amountToSettle;
              balances[creditor.id] -= amountToSettle;
            }
          }
        });
      }
    });

    setSettlements(newSettlements);
  };

  // Remove user
  const removeUser = async (userId: string) => {
    // Check if user is involved in any expenses
    const userInExpenses = expenses.some(
      (expense) =>
        expense.paidBy === userId || expense.splitWith.includes(userId)
    );

    if (userInExpenses) {
      alert("Cannot remove user who is involved in expenses!");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      console.error("Error removing user: ", error);
      alert("Error removing user. Please try again.");
    }
  };

  // Remove expense
  const removeExpense = async (expenseId: string) => {
    try {
      await deleteDoc(doc(db, "expenses", expenseId));
    } catch (error) {
      console.error("Error removing expense: ", error);
      alert("Error removing expense. Please try again.");
    }
  };

  // Set up real-time listeners for Firestore data
  useEffect(() => {
    // Users listener
    const usersQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "asc")
    );
    const usersUnsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersData);
    });

    // Expenses listener
    const expensesQuery = query(
      collection(db, "expenses"),
      orderBy("createdAt", "desc")
    );
    const expensesUnsubscribe = onSnapshot(expensesQuery, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Expense[];
      setExpenses(expensesData);
      calculateSettlements(expensesData);
    });

    // Cleanup listeners on component unmount
    return () => {
      usersUnsubscribe();
      expensesUnsubscribe();
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <InstallPWA />
      <h1 className="text-2xl font-bold mb-6 text-center">SplitEase</h1>

      {/* User Management Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Group Members</h2>

        {/* Add User Form */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l"
            placeholder="Enter name"
          />
          <button
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add User
          </button>
        </div>

        {/* User List */}
        <div>
          {users.length === 0 ? (
            <p className="text-gray-500 italic">No users added yet</p>
          ) : (
            <ul className="divide-y">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  <button
                    onClick={() => removeUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Expense Management Section */}
      {users.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

          {/* Add Expense Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                placeholder="What was this expense for?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                placeholder="How much was spent?"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Paid by</label>
              <select
                value={newExpense.paidBy}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, paidBy: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select who paid</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Split with
              </label>
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`split-${user.id}`}
                      checked={newExpense.splitWith.includes(user.id)}
                      onChange={() => toggleUserForExpense(user.id)}
                      disabled={user.id === newExpense.paidBy}
                      className="mr-2"
                    />
                    <label htmlFor={`split-${user.id}`}>
                      {user.name}{" "}
                      {user.id === newExpense.paidBy ? "(Payer)" : ""}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={addExpense}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {expenses.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Paid By</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-t">
                    <td className="px-4 py-2">{expense.description}</td>
                    <td className="px-4 py-2">{expense.paidByName}</td>
                    <td className="px-4 py-2">₹{expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-2">{expense.date}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settlements */}
      {settlements.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Settlements Needed</h2>

          <div className="space-y-2">
            {settlements.map((settlement) => (
              <div key={settlement.id} className="p-3 bg-white rounded border">
                <p className="font-medium">
                  <span className="text-red-500">{settlement.fromName}</span>{" "}
                  owes{" "}
                  <span className="text-green-500">{settlement.toName}</span>{" "}
                  <span className="font-bold">₹{settlement.amount}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSplittingApp;
