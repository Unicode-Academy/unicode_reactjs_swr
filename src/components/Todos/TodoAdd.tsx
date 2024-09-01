import { ChangeEvent, FormEvent, useState } from "react";
// import { mutate } from "swr";
import { Todo, todoUrl, useTodosMutate } from "./utils";

const addTodo = async (title: string): Promise<Todo | boolean> => {
  const response = await fetch(todoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    return false;
  }
  return response.json();
};
// type TodoAddProps = {
//   mutate?: () => void;
// };
export default function TodoAdd() {
  const [title, setTitle] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const { mutate } = useTodosMutate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = await addTodo(title);
    if (!todo) {
      return setMsg("Add Todo Failed");
    }
    setMsg("Thêm thành công");
    setTitle("");
    mutate((data) => {
      //data ==> Dữ liệu cũ
      //return về dữ liệu mới ==> todoList sẽ được update
      if (!data) {
        return;
      }
      return [...data, todo as Todo];
    });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <button>Add</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
