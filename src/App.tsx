import { Route, Routes } from "react-router-dom";
import TodoList from "./components/Todos/TodoList";
import TodoDetail from "./components/Todos/TodoDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/todos" element={<TodoList />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
    </Routes>
  );
}
