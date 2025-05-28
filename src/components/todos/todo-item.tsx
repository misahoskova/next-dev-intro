"use client";
import { deleteTodo, toggleTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import Link from "next/link";

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleToggleTodo = () => {
    toggleTodo(todo.id);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? "Undo" : "Completed"}
      </button>
      <Link href={`/todos/${todo.id}`} className="link">
        Go to Detail
      </Link>
    </li>
  );
};
