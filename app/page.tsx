"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Button, Input, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
Amplify.configure(outputs);

export default function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const [content, setContent] = useState<string>("");
  // function listTodos() {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({
  //     content: content,
  //   });
  //   setContent("");
  // }
  const navigate = useRouter();
  const { signOut, user } = useAuthenticator();
  console.log(user);
  return (
    <main>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </Button>

      <Button
        onClick={() => {
          navigate.push("/admin");
        }}
      >
        Open Admin Panel
      </Button>
    </main>
  );
}
