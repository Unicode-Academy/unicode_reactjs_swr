import useSWR from "swr";
const fetcher = (...args: [string, object]) =>
  fetch(...args).then((res) => res.json());
type User = {
  id: number;
  name: string;
  email: string;
};
export default function UsersSwr() {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher, {
    fallbackData: [],
  });

  if (error) {
    return <h3>Failed to load</h3>;
  }
  return (
    <div>
      <h1>User List</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        users.map((user: User) => (
          <p key={user.id}>
            {user.name} - {user.email}
          </p>
        ))
      )}
    </div>
  );
}
