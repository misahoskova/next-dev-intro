import { Header } from '@/components/header';
import prisma from '@/lib/prisma';
import { Todo } from '@/types';
import Link from 'next/link';

async function getTodo(id: number) {
  return await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
}

const TodoDetailPage = ({ params }: { params: { id: string } }) => {
  // Simulating fetching a todo item based on the ID from params
  const id = Number(params.id);
  const todo: Todo = await getTodo(id);

  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={'completed'}>{todo.priority}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}
        </div>

        <div>
          <Link href="/">
            <button className="back-button">Back to Home</button>
          </Link>
          <button className="complete-button">
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;
