

import { useState, useTransition } from "react";
import axios from "axios";

export function CreateTodo({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddTodo = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
        title,
        description,
      });
      // alert("Todo added successfully");
      startTransition(() => {
        onTodoAdded();
      });
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded shadow-md bg-white">
      <input
        className="w-full p-2 mb-2 border rounded"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className={`w-full p-2 rounded text-white  ${
          isPending ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={handleAddTodo}
        disabled={isPending}
      >
        {isPending ? "Adding Todo..." : "Add Todo"}
      </button>
    </div>
  );
}
