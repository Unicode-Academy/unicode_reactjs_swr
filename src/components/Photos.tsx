// import useSWR from "swr";
import Photo from "./Photo";

export default function Photos() {
  // const { data } = useSWR("/photos");
  //   const config = useSWRConfig();
  //   console.log(config);

  // console.log(data);

  return (
    <div>
      <h1>Photos</h1>
      <Photo id={11111} />
    </div>
  );
}
