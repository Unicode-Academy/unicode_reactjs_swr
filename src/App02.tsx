import useSWR from "swr";

const todoListFetcher = async (): Promise<any> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
};

const todoFtecher = async (id: number): Promise<any> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return response.json();
};

export default function App() {
  //   const { data, error, isLoading } = useSWR("/todos", todoListFetcher);
  //   console.log(data, error, isLoading);

  const { data, error, isLoading } = useSWR("/todos/1", () => todoFtecher(1));
  console.log(data);

  return <div>App</div>;
}
