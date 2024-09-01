import { useEffect, useState } from "react";
type UserList = {
  id: number;
  name: string;
  email: string;
}[];
export default function Users() {
  const [users, setUsers] = useState<UserList>([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}
