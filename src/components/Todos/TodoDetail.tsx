import { useParams } from "react-router-dom";
import useSWR from "swr";
import { todoDetailFetcher, todoUrl } from "./utils";

export default function TodoDetail() {
  const { id } = useParams();
  const {
    data: todo,
    error,
    isLoading,
  } = useSWR({ url: `${todoUrl}/${id}` }, todoDetailFetcher);
  if (error) {
    return <h3>Failed to load</h3>;
  }
  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h1>{todo?.title}</h1>
          <p>{todo?.completed ? "Completed" : "Not Completed"}</p>
        </>
      )}
    </div>
  );
}
