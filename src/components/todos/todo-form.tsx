"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";

export const TodoForm = () => {
  const [todoName, setTodoName] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoName.trim()) {
      return;
    }
    console.log("Form submitted with todo:", todoName);
    // addTodo({
    //   name: todoName.trim(),
    //   description: 'test description',
    //   priority: 1,
    // })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          value={todoName}
          onChange={handleInputChange}
          name="todo-text"
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
