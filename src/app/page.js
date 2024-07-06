"use client";
import { useState, useEffect } from "react";
import { addUser, deleteUser, getUsers } from "../utils/firebase";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      console.log("Fetched Users:", fetchedUsers); // Debugging: Log fetched users
      setUsers(fetchedUsers || []);
    }
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUserName.trim()) {
      await addUser(newUserName);
      setNewUserName("");
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    }
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl mb-6">Pantry Users</h1>

      <form onSubmit={handleAddUser} className="mb-4">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter user name"
          className="border px-4 py-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>

      <ul>
        {users.length > 0 ? (
          
          users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{user.name}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </main>
  );
}
