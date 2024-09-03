import { SWRConfig } from "swr";
// import axios from "axios";
import Photos from "./components/Photos";
interface ResponseError extends Error {
  status?: number;
}
interface Cache<Data> {
  get(key: string): Data | undefined;
  set(key: string, value: Data): void;
  delete(key: string): void;
  keys(): IterableIterator<string>;
}
const localStorageProvider = <T,>(): Cache<T> => {
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));
  return {
    get: (key: string): T | undefined => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    },
    set: (key: string, value: T) => {
      map.set(key, value);
      localStorage.setItem(
        "app-cache",
        JSON.stringify(Array.from(map.entries()))
      );
    },
    delete: (key: string): void => {
      map.delete(key);
      localStorage.setItem(
        "app-cache",
        JSON.stringify(Array.from(map.entries()))
      );
    },
    keys: (): IterableIterator<string> => {
      const keys = Object.keys(localStorage);
      return keys[Symbol.iterator]();
    },
  };
};

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
        provider: localStorageProvider,
      }}
    >
      <Photos />
    </SWRConfig>
  );
}
