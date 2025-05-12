'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface TodoItem {
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const checkTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div
        className="relative h-52 rounded-t-lg bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/images/bg1.jpg')" }}
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-white bg-gradient-to-b from-blue-950 to-blue-700 p-2 rounded-md"
        >
          <i className="fa fa-long-arrow-left text-lg" aria-hidden="true"></i>
        </button>
        <button
          onClick={clearAll}
          className="absolute top-4 right-4 text-white bg-gradient-to-b from-blue-950 to-blue-700 p-2 rounded-md font-bold"
        >
          Clear All
        </button>
        <div className="absolute bottom-4 left-4 text-white text-2xl font-titillium">
          {new Date().toDateString()}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white max-h-[350px] overflow-y-auto no-scrollbar ">
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="relative border-b border-gray-200 min-h-[45px] flex items-center px-2"
            >
              <i
                className={`far ${
                  todo.completed ? "fa-check-circle text-green-600" : "fa-circle"
                } text-xl cursor-pointer`}
                onClick={() => checkTodo(index)}
              ></i>
              <p
                className={`ml-4 text-lg flex-1 break-words ${
                  todo.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {todo.text}
              </p>
              <i
                className="far fa-trash-alt text-xl text-red-600 cursor-pointer"
                onClick={() => deleteTodo(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Todo */}
      <form
        onSubmit={addTodo}
        className="relative mt-4 border-t border-gray-200 flex items-center p-2"
      >
        <button type="submit" className="text-3xl text-blue-600 cursor-pointer">
          <i className="fa fa-plus-circle"></i>
        </button>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          className="ml-4 w-full h-10 border-2 border-blue-600 rounded-lg px-3 text-lg placeholder-blue-600 font-titillium"
        />
      </form>
    </div>
  );
}
