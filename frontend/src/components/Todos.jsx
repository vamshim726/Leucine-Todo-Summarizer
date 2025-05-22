 

import React from 'react'; 

export function Todos({ todos, onDeleteTodo, onCompleteTodo }) {        
  const handleDelete = async (id) => {
    console.log(id);    
    try {
      const response = await fetch(`http://localhost:3000/todo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      onDeleteTodo();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark todo as completed');
      }
      onCompleteTodo();
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };
 

  return (
    <div className="todos-container">
     
      {todos.map((todo) => (
        <div key={todo._id} className={`todo-item p-4 mb-2 border rounded ${todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'}`}>
          <h3 className="text-xl font-semibold">{todo.title}</h3>
          <p>{todo.description}</p>
          <button 
            onClick={() => handleComplete(todo._id)}
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            disabled={todo.completed}
          >
            {todo.completed ? 'Completed' : 'Mark as Completed'}
          </button>
          <button
            onClick ={() => handleDelete(todo._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
