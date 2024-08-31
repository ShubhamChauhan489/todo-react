import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import { Trash2 } from 'lucide-react';

function App() {
  const [task, setTask] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    setData(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(data));
  }, [data]);

  const handleAddTask = () => {
    if (task.trim() === '') return; // Avoid adding empty tasks

    const newTask = {
      task: task.trim(),
      completed: false,
    };

    setData(prevData => [...prevData, newTask]);
    setTask('');
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTodos = data.filter(todo => todo.task !== taskToDelete);
    setData(updatedTodos);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-bold text-blue-500'>ToDo List</h1>
      <div className='text mt-8 font-sans flex items-center justify-center gap-5'>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder='Add new task'
          className='text-2xl border px-4 rounded-lg'
        />
        <button
          onClick={handleAddTask}
          className='text-white bg-blue-500 h-8 w-15 px-2 rounded-lg'
        >
          Add Task
        </button>
      </div>
      <div className=''>
        <h3 className='font-sans text-3xl mt-16 text-center w-full text-blue-500 font-bold'>My List</h3>
        <div>
          <ul className='mt-8 space-y-6'>
            {data.map((val) => (
              <li key={val.task} className='flex justify-between items-center gap-8 border border-gray-400 min-w-[40vw] p-4 shadow-lg rounded-lg'>
                <input
                  type="checkbox"
                  checked={val.completed}
                  onChange={() => {
                    setData(prevData => prevData.map(todo => 
                      todo.task === val.task ? { ...todo, completed: !todo.completed } : todo
                    ));
                  }}
                  className='w-6 h-6'
                />
                <p className={`font-semibold text-2xl ${val.completed ? 'line-through text-gray-500' : 'text-green-500'}`}>
                  {val.task}
                </p>
                <button
                  onClick={() => handleDeleteTask(val.task)}
                  className='text-red-600 h-6 w-6 text-2xl'
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
