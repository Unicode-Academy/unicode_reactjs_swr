import { Route, Routes } from "react-router-dom";
import TodoList from "./components/Todos/TodoList";
import TodoDetail from "./components/Todos/TodoDetail";
import TodoAdd from "./components/Todos/TodoAdd";

export default function App() {
  return (
    <Routes>
      <Route
        path="/todos"
        element={
          <>
            <TodoList />
            <TodoAdd />
          </>
        }
      />
      <Route path="/todos/:id" element={<TodoDetail />} />
    </Routes>
  );
}
