import { SWRConfig } from "swr";
import axios from "axios";
import Photos from "./components/Photos";
const fetcher = async <T,>(url: string): Promise<T> => {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "x-api-key": "ahihi",
    },
  });
  const response = await instance.get(url);
  return response.data;
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
