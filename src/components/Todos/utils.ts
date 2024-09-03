import useSWR, { mutate as mutateGlobal } from "swr";
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

export const useTodosQuery = () => {
  return useSWR({ url: todoUrl }, todoFetcher, {
    revalidateOnFocus: false,
    // refreshInterval: 1000,
    revalidateOnReconnect: true,
  });
};

export const useTodosMutate = () => {
  const mutate = (callback: (data?: Todo[]) => Todo[] | undefined) => {
    if (typeof callback === "function") {
      return mutateGlobal({ url: todoUrl }, callback, {
        revalidate: false,
      });
    }
  };
  return { mutate };
};
