"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { client } from "../client";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<
    Awaited<ReturnType<typeof client.queries.listUsers>>["data"]
  >([]);
  const ListUsers = async () => {
    const response = await client.queries.listUsers({});
    setUsers(response.data);
  };

  useEffect(() => {
    ListUsers();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user?.username}>
            <TableCell>{user?.username}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>
              <Button>Assign Device</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
