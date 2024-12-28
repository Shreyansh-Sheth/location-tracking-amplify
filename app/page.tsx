"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Button, Input, useAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [content, setContent] = useState<string>("");
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: content,
    });
    setContent("");
  }
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
      <h1>{user.username} todos</h1>
      <div>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="New todo"
        />
        <Button onClick={createTodo}>+ new</Button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
