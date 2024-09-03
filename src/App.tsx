import { SWRConfig } from "swr";
// import axios from "axios";
import Photos from "./components/Photos";
interface ResponseError extends Error {
  status?: number;
}

const fetcher = async <T,>(url: string): Promise<T> => {
  // const instance = axios.create({
  //   baseURL: "https://jsonplaceholder.typicode.com",
  //   headers: {
  //     "x-api-key": "ahihi",
  //   },
  // });
  // const response = await instance.get(url);
  // return response.data;
  const response = await fetch(`https://jsonplaceholder.typicode.com${url}`);
  if (!response.ok) {
    const error: ResponseError = new Error("Photos not found");
    error.status = response.status;
    throw error;
  }
  return response.json();
};
export default function App() {
  const fallbackData = {
    // "/photos": [],
    // "/photos/1": {},
  };
  return (
    <SWRConfig
      value={{
        fetcher,
        // revalidateOnFocus: false,
        fallbackData: [],
        fallback: fallbackData,
      }}
    >
      <Photos />
    </SWRConfig>
  );
}
