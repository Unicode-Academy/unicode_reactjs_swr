import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
const todoApiUrl = `https://jsonplaceholder.typicode.com/todos`;
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
const todoFetcher = ({
  url,
  method = "GET",
  headers,
}: {
  url: string;
  method?: string;
  headers?: HeadersInit;
}) => fetcher<Todo[]>(url, method, null, headers);
export default function App() {
  const { data, error, isLoading } = useSWR(
    {
      url: todoApiUrl,
      headers: {
        "x-api-key": "123",
      },
    },
    todoFetcher
  );
  console.log(data);

  return <div>App</div>;
}
