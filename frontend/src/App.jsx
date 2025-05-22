

  import { useEffect, useState, useTransition } from 'react';
   
  import { CreateTodo } from './components/CreateTodo';
  import { Todos } from './components/Todos';

  function App() {
    const [todos, setTodos] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [updateTodos, setUpdateTodos] = useState(false);
    const [summary, setSummary] = useState("");

    const [isSummarizing, setIsSummarizing] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/todos");
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
          const json = await response.json();
          setTodos(json.todos);
        } catch (error) {
          console.error('Error fetching todos:', error);
          // Handle error state or display a message to the user
        }
      };

      fetchData();
    }, [updateTodos]);

    const handleTodoAdded = () => {
      startTransition(() => {
        setUpdateTodos(prev => !prev); 
      });
    };


  const handleTodoDeleted = () => {
    startTransition(() => {
      setUpdateTodos(prev => !prev);
    });
  };

  const handleTodoCompleted = () => {
    startTransition(() => {
      setUpdateTodos(prev => !prev);
    });
  };

 

const handleSummarize = async () => {
  setIsSummarizing(true); // Start loading
  try {
    const response = await fetch('http://localhost:3000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todos: todos.map(todo => todo.title),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch summary');
    }

    const data = await response.json();
    setSummary(data.summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
  } finally {
    setIsSummarizing(false); // Stop loading
  }
};

  

return (
  <div className="min-h-screen bg-gray-100">
   

    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">📋 Todo List</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <CreateTodo onTodoAdded={handleTodoAdded} />
      </div>

      {isPending ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Todos
            todos={todos}
            onDeleteTodo={handleTodoDeleted}
            onCompleteTodo={handleTodoCompleted}
          />
        </div>
      )}

      
    </div>  
   

      
   
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <div className="mt-6 text-center">
       

    
<button
  onClick={handleSummarize}
  className={`bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 ${isSummarizing ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={isSummarizing}
>
  {isSummarizing ? (
    <>
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <span>Please wait, summarizing...</span>
    </>
  ) : (
    'Summarize Todos'
  )}
</button>

      </div>

      <div className="mt-6 p-4 bg-white shadow-lg rounded-lg min-h-[100px]">
  <h2 className="text-xl font-bold mb-2">{summary ? "Summary:" : "Summary will appear here :"}</h2>
  <p className="text-gray-700">
    {summary ? summary : ""}
  </p>
</div>
     
     </div>
  </div>
</section>
  </div>



);

  }

  export default App; 