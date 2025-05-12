'use client';
import { useRouter } from "next/navigation";
import "../../styles/todo.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface TodoItem {
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  // ✅ Load todos from localStorage on first render
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
    <div className="container mx-auto p-8 relative">
      <div className="header">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 text-white"
      >
        <i className="fa fa-long-arrow-left text-2xl" aria-hidden="true"></i>
      </button>
        <div className="clear">
          <button onClick={clearAll}>Clear All</button>
        </div>
        <div id="date">{new Date().toDateString()}</div>
      </div>

      {/* ✅ Fix scroll on desktop */}
      <div className="content ">
        <ul className="space-y-2 overflow-y-scroll md:h-96">
          {todos.map((todo, index) => (
            <li key={index} className="item">
              <i
                className={`far co ${
                  todo.completed ? "fa-check-circle" : "fa-circle"
                }`}
                onClick={() => checkTodo(index)}
              ></i>
              <p className={`text ${todo.completed ? "lineThrough" : ""}`}>
                {todo.text}
              </p>
              <i
                className="far fa-trash-alt de"
                onClick={() => deleteTodo(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={addTodo} className="add-to-do mb-8">
        <button type="submit">
          <i className="fa fa-plus-circle"></i>
        </button>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          className="mt-3 ml-3"
        />
      </form>
    </div>
  );
}
