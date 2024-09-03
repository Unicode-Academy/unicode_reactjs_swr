import useSWR from "swr";

export default function Photo({ id }: { id: number }) {
  const { data, isLoading, error } = useSWR(`/photos/${id}`, null, {
    fallbackData: {},
  });
  console.log(data);
  if (!isLoading) {
    console.log(error.message);
    console.log(error.status);
  }

  return <div>{isLoading ? <h3>Loading...</h3> : <img src={data.url} />}</div>;
}
