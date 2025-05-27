import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { Spinner } from "../spinner";
import { ErrorMessage } from "../error-message";
import { Todo } from "@/types";

export const TodosSection = () => {
  const todos: Todo[] = [];
  const isLoading = false; // Simulating loading state
  const error = null; // Simulating no error state
  return (
    <main>
      {error && <ErrorMessage message={"test"} />}
      <TodoForm />
      <div className="todo-container">
        <ul>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  );
};
