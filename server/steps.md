1. `npm init -y` to create package.json
2. `npm i typescript @types/node -D` to install typescript and its types.
3. `npx tsc --init` to create tsconfig.json

   - Go to `https://github.com/tsconfig/bases` to find a tsconfig for your node version.
   - Add `"type": "module"` in `package.json` which allows to use import/export statements.

4. `npm i fastify @fastify/cors fastify-type-provider-zod zod` -> Some starters packages.
5. Creating folder `/src` and `server.ts` file.
6. Created:

```json
"scripts": {
    "start": "node --env-file .env --experimental-strip-types --no-warnings src/server.ts",
    "dev": "node --env-file .env --experimental-strip-types --no-warnings --watch src/server.ts"
},
```

7. `npm i @biomejs/biome -D` + `npx ultracite init` -> enter in everything for now.

8. Docker:
    - `docker ps` -> list all running containers.
    - `docker compose up -d` -> start the containers.
    
9. `npx drizzle-kit generate` -> generate the migrations.
10. `npx drizzle-kit migrate` -> migrate the database.
11. `npx drizzle-kit studio` -> studio the database.

12. `npx i drizzle-seed -D` -> seed the database.