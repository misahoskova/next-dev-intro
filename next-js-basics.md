# Next.js Basics for Beginners

## Introduction

Next.js is a React framework that provides structure, features, and optimizations for your application. It handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations.

## Core Concepts

### Server-Side Rendering (SSR)

Next.js allows rendering pages on the server before sending them to the client.

- **Benefits**: Better SEO, faster initial page load, improved performance on low-powered devices
- **Implementation**: In Next.js, pages are server-rendered by default

### React Server Components (RSC)

RSC is a new architecture that allows React components to render on the server.

- **Default in App Router**: All components inside the App Router are React Server Components by default
- **Benefits**: Reduced client-side JavaScript, server-side data fetching, secure handling of sensitive data
- **Types of components**:
  - Server Components: Render on the server, no client-side JavaScript
  - Client Components: Hydrated on the client, support interactivity

## Client and Server Directives

### `'use client'` Directive

Used to mark a boundary between Server and Client Components:

```jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- Place at the top of the file before imports
- Once used, all other components imported into this file are also Client Components

### `'use server'` Directive

Marks server functions that can be called from Client Components:

```jsx
// Server Component
export default function Form() {
  async function submitForm(formData) {
    "use server";
    // This code runs on the server
    const name = formData.get("name");
    await saveToDatabase(name);
  }

  return (
    <form action={submitForm}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

You can also create a separate file with server actions:

```jsx
// actions.js
"use server";

export async function submitForm(formData) {
  // Server-side code
}
```

## Basic Next.js Hooks

### `useRouter`

Navigate programmatically between routes:

```jsx
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return <button onClick={() => router.push("/dashboard")}>Dashboard</button>;
}
```

### `usePathname`

Access the current URL pathname:

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return <p>Current pathname: {pathname}</p>;
}
```

### `useSearchParams`

Access and manipulate URL search parameters:

```jsx
"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return <p>Search query: {query}</p>;
}
```

## Routing in App Router

### File-based Routing

The App Router uses a file-system based router where folders define routes:

```
app/
├── page.tsx         # Home route (/)
├── about/
│   └── page.tsx     # About route (/about)
├── blog/
│   ├── page.tsx     # Blog index route (/blog)
│   └── [slug]/     # Dynamic route
│       └── page.tsx # Individual blog post (/blog/post-1)
└── dashboard/
    └── layout.tsx   # Layout for dashboard section
    └── page.tsx     # Dashboard route (/dashboard)
```

### Special Files

- `page.tsx`: Creates a route and makes it publicly accessible
- `layout.tsx`: Shared UI for a segment and its children
- `loading.tsx`: Loading UI for a segment
- `error.tsx`: Error UI for a segment
- `not-found.tsx`: UI for not found routes

### Dynamic Routes

Create dynamic routes using brackets `[param]`:

```tsx
// app/blog/[slug]/page.tsx
import { FC } from "react";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const BlogPost: FC<BlogPostProps> = ({ params }) => {
  return <h1>Post: {params.slug}</h1>;
};

export default BlogPost;
```

## Data Fetching

### Server Components

Fetch data directly in Server Components:

```tsx
// app/users/page.tsx
interface User {
  id: number;
  name: string;
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://api.example.com/users");
  return res.json();
}

export default async function UsersPage() {
  const users: User[] = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Client Components

Use SWR or React Query in Client Components:

```tsx
"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Metadata and SEO

Next.js provides ways to manage metadata for better SEO:

```jsx
// app/page.js
export const metadata = {
  title: "Home Page",
  description: "Welcome to my website",
};

export default function Home() {
  return <h1>Welcome</h1>;
}
```

## Conclusion

Next.js provides a powerful framework for building React applications with server-side rendering, optimized routing, and enhanced developer experience. The App Router introduces a more intuitive file-based routing system and leverages React Server Components for improved performance.

To start a new Next.js project:

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

This covers the fundamentals, but Next.js offers many more features like API routes, image optimization, internationalization, and more that you can explore as you become more familiar with the framework.
