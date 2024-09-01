import { fetcher } from "../../utils/fetcher";
type TodoFetcher = {
  url: string;
  method?: string;
  headers?: HeadersInit;
};
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
export const todoFetcher = ({ url, method = "GET", headers }: TodoFetcher) =>
  fetcher<Todo[]>(url, method, null, headers);
export const todoDetailFetcher = ({
  url,
  method = "GET",
  headers,
}: TodoFetcher) => fetcher<Todo>(url, method, null, headers);

export const todoUrl = `https://jsonplaceholder.typicode.com/todos`;
