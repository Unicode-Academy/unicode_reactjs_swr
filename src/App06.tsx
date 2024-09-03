import axios from "axios";
import useSWR from "swr";
const fetcher = async <T,>(url: string): Promise<T> => {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "x-api-key": "ahihi",
    },
  });
  const response = await instance.get(url);
  return response.data;
};
type Todo = {
  title: string;
  completed: boolean;
};
type Post = {
  title: string;
  body: string;
};
export default function App() {
  //   const { data } = useSWR("/todos", fetcher<Todo>);
  //   console.log(data);
  const { data } = useSWR("/posts", fetcher<Post>);
  console.log(data);

  return <div>App</div>;
}
