// import useSWR from "swr";
// import { todoFetcher, todoUrl } from "./utils";
import { Link } from "react-router-dom";
import { useTodosQuery } from "./utils";

export default function TodoList() {
  // const {
  //   data: todoList,
  //   error,
  //   isLoading,
  //   // mutate,
  // } = useSWR({ url: todoUrl }, todoFetcher);
  const { data: todoList, error, isLoading } = useTodosQuery();
  if (error) {
    return <h3>Failed to load</h3>;
  }
  return (
    <div>
      <h1>Todo List</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        todoList?.map((todo) => (
          <h4 key={todo.id}>
            {todo.title} <Link to={`/todos/${todo.id}`}>Detail</Link>
          </h4>
        ))
      )}
    </div>
  );
}
