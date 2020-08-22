import { Application } from 'https://deno.land/x/oak@v6.0.2/mod.ts';

const app = new Application();
const port = 8080;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

app.use((ctx) => {
  ctx.response.body = 'Hello World!';
});

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
