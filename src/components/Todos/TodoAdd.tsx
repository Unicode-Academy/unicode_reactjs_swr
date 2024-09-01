import { ChangeEvent, FormEvent, useState } from "react";
import { mutate } from "swr";
import { todoUrl } from "./utils";

const addTodo = async (title: string): Promise<boolean> => {
  const response = await fetch(todoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  return response.ok;
};
// type TodoAddProps = {
//   mutate?: () => void;
// };
export default function TodoAdd() {
  const [title, setTitle] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await addTodo(title);
    if (status) {
      setMsg("Thêm thành công");
      setTitle("");
      mutate({ url: todoUrl });
    }
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
