import useSWR, { useSWRConfig } from "swr";
export default function Photo({ id }: { id: number }) {
  const { data, isLoading } = useSWR(`/photos/${id}`, null, {
    fallbackData: {},
  });
  const { cache } = useSWRConfig();

  const handleChangeImage = () => {
    // const newImageUrl = `https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY`;
    // cache.set("/photos/1", {
    //   ...cache.get("/photos/1"),
    //   data: {
    //     ...cache.get("/photos/1").data,
    //     url: newImageUrl,
    //   },
    // });
    console.log(cache.get("/photos/1"));
  };

  return (
    <div>
      <button onClick={handleChangeImage}>Change Image</button>
      {isLoading ? <h3>Loading...</h3> : <img src={data.url} />}
    </div>
  );
}
