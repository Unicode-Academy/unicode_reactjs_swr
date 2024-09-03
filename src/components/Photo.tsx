import useSWR from "swr";

export default function Photo({ id }: { id: number }) {
  const { data, isLoading } = useSWR(`/photos/${id}`, null, {
    fallbackData: {},
  });
  console.log(data);

  return <div>{isLoading ? <h3>Loading...</h3> : <img src={data.url} />}</div>;
}
