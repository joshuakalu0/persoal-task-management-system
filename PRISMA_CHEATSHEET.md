# Prisma Comprehensive Cheatsheet

> **Prisma** is a next-generation ORM for Node.js and TypeScript. It helps you manage your database schema, run migrations, and write type-safe database queries. This cheatsheet will take you from beginner to pro, with detailed explanations and examples.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prisma Schema](#prisma-schema)
3. [Models & Fields](#models--fields)
4. [Relations](#relations)
5. [Migrations](#migrations)
6. [Prisma Client](#prisma-client)
7. [CRUD Operations](#crud-operations)
8. [Advanced Queries](#advanced-queries)
9. [Raw SQL](#raw-sql)
10. [Transactions](#transactions)
11. [Middlewares](#middlewares)
12. [Seeding Data](#seeding-data)
13. [Performance & Best Practices](#performance--best-practices)
14. [Troubleshooting](#troubleshooting)

---

## 1. Getting Started

### Install Prisma CLI and Client

```bash
npm install @prisma/cli @prisma/client --save-dev
# or
pnpm add -D @prisma/cli @prisma/client
```

### Initialize Prisma in your project

```bash
npx prisma init
```

- This creates a `prisma/` folder with a `schema.prisma` file and a `.env` file for your database URL.

### Set up your database connection

- Edit `.env`:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
  ```
- Supported: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB (Preview)

---

## 2. Prisma Schema

- The `schema.prisma` file defines your data models, database connection, and generator settings.

```prisma
// Example schema.prisma
// Datasource: tells Prisma which database to use
// Generator: tells Prisma to generate the client

datasource db {
  provider = "postgresql" // or "mysql", "sqlite", etc.
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 3. Models & Fields

- Models map to database tables. Fields map to columns.
- Each model must have a unique `@id` field (primary key).

```prisma
model User {
  id        Int      @id @default(autoincrement()) // Primary key, auto-incremented
  email     String   @unique                      // Unique constraint
  name      String?                              // Optional field (nullable)
  posts     Post[]                               // One-to-many relation
  createdAt DateTime @default(now())             // Default value: now
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

### Field Types

- `Int`, `String`, `Boolean`, `DateTime`, `Float`, `Decimal`, `Json`, `Bytes`
- Optional: `fieldName?`
- Array: `fieldName Type[]`

### Attributes

- `@id` — Primary key
- `@default(value)` — Default value
- `@unique` — Unique constraint
- `@relation` — Foreign key/relation
- `@updatedAt` — Auto-update timestamp

---

## 4. Relations

### One-to-Many

```prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[] // One user, many posts
}

model Post {
  id      Int   @id @default(autoincrement())
  userId  Int
  user    User  @relation(fields: [userId], references: [id])
}
```

### Many-to-Many

```prisma
model User {
  id     Int     @id @default(autoincrement())
  groups Group[] @relation("UserGroups")
}

model Group {
  id    Int    @id @default(autoincrement())
  users User[] @relation("UserGroups")
}
```

- Prisma creates a join table automatically.

### One-to-One

```prisma
model User {
  id     Int    @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int   @id @default(autoincrement())
  userId Int   @unique
  user   User  @relation(fields: [userId], references: [id])
}
```

---

## 5. Migrations

### Create migration after editing schema

```bash
npx prisma migrate dev --name init
```

- Applies migration and updates Prisma Client.

### Reset database

```bash
npx prisma migrate reset
```

### View migration history

```bash
npx prisma migrate status
```

---

## 6. Prisma Client

- Auto-generated, type-safe query builder for your database.
- Import and instantiate:

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

---

## 7. CRUD Operations

### Create

```js
// Create a new user
const user = await prisma.user.create({
  data: {
    email: "alice@prisma.io",
    name: "Alice",
  },
});
```

### Read (Find)

```js
// Find one user by unique field
const user = await prisma.user.findUnique({
  where: { email: "alice@prisma.io" },
});

// Find many users
const users = await prisma.user.findMany({
  where: { name: { contains: "A" } },
});
```

### Update

```js
// Update a user
const updated = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: { name: "Alice Smith" },
});
```

### Delete

```js
// Delete a user
await prisma.user.delete({ where: { email: "alice@prisma.io" } });
```

---

## 8. Advanced Queries

### Filtering

```js
const posts = await prisma.post.findMany({
  where: {
    published: true,
    title: { contains: "Prisma" },
    author: { name: { startsWith: "A" } },
  },
});
```

### Sorting

```js
const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
```

### Pagination

```js
const users = await prisma.user.findMany({
  skip: 10, // Skip first 10
  take: 5, // Take next 5
});
```

### Include Relations

```js
const posts = await prisma.post.findMany({
  include: { author: true },
});
```

### Select Specific Fields

```js
const users = await prisma.user.findMany({
  select: { id: true, email: true },
});
```

---

## 9. Raw SQL

- For advanced queries not supported by Prisma Client.

```js
const result =
  await prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;
```

- Use `$executeRaw` for non-SELECT queries.

---

## 10. Transactions

- Run multiple queries atomically.

```js
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: "bob@prisma.io" } }),
  prisma.post.create({ data: { title: "Hello", authorId: 1 } }),
]);
```

---

## 11. Middlewares

- Run logic before/after queries (logging, validation, etc.)

```js
prisma.$use(async (params, next) => {
  // Log all queries
  console.log(params.model, params.action);
  return next(params);
});
```

---

## 12. Seeding Data

- Add a `prisma/seed.js` file:

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({ data: { email: "seed@prisma.io" } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

- Add to `package.json`:
  ```json
  "prisma": {
    "seed": "node prisma/seed.js"
  }
  ```
- Run:
  ```bash
  npx prisma db seed
  ```

---

## 13. Performance & Best Practices

- **Reuse PrismaClient**: Instantiate once per app, not per request.
- **Use connection pooling** in serverless environments.
- **Paginate** large queries.
- **Use select/include** to fetch only needed data.
- **Monitor slow queries** with logs.
- **Keep Prisma and your DB up to date.**
- **Use environment variables** for secrets.
- **Handle errors** gracefully (try/catch).

---

## 14. Troubleshooting

- **Common Errors**
  - `P2002`: Unique constraint failed (e.g., duplicate email)
  - `P2025`: Record not found
  - `P1001`: Database connection error
- **Debugging**
  - Enable query logging: `DEBUG="prisma:query" npx ...`
- **Regenerate client** after schema changes:
  ```bash
  npx prisma generate
  ```

---

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Prisma GitHub](https://github.com/prisma/prisma)
- [Prisma Slack](https://slack.prisma.io/)

---

> **This cheatsheet is designed to be a living document. Add your own notes and examples as you grow!**
