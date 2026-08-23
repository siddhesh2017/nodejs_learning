# Day 2 - Practical Node HTTP Notes

These notes explain the raw `node:http` server built during Day 2. The goal is
to understand what Express will later simplify.

## 1) What happens during an HTTP request?

An HTTP client, such as a browser or `curl`, sends a request to a server.
The server reads the request and sends a response back.

```text
client -> request -> server
client <- response <- server
```

A request commonly contains:

- Method: `GET`, `POST`, `PATCH`, or `DELETE`
- URL path: `/customers`
- Query string: `?name=Siddhesh`
- Headers: metadata such as `Host` and `Content-Type`
- Body: data sent mainly with `POST`, `PUT`, or `PATCH`

A response contains:

- Status code: `200`, `201`, `404`, and so on
- Headers
- Optional body, often JSON

## 2) `createServer`, request, and response

```ts
const server = createServer((request, response) => {
    // This function runs once for every request.
});
```

`createServer` creates a Node HTTP server. Its callback receives:

- `request`: information coming from the client
- `response`: the object used to reply to the client

The callback runs for every request. A browser may make more requests than
expected while loading or refreshing a page, so repeated log lines are normal.

```ts
console.log("Received request:", request.method, request.url);
```

## 3) Why use `new URL`?

The request URL is usually a relative URL such as:

```text
/hello?name=Siddhesh
```

Comparing the raw string works only when there is no query string:

```ts
request.url === "/hello"; // true only for exactly /hello
```

It fails for:

```text
/hello?name=Siddhesh
```

The `URL` class separates the URL into useful parts:

```ts
const requestUrl = new URL(
    request.url ?? "/",
    `http://${request.headers.host ?? "localhost"}`,
);

const pathname = requestUrl.pathname;
const name = requestUrl.searchParams.get("name");
```

The constructor is defined as:

```ts
new URL(input, base)
```

The first argument is the URL input. Here, `request.url` is the input.

The second argument is the base. Because `/hello?name=Siddhesh` is relative,
the parser needs a base such as `http://localhost:3000`.

`request.url ?? "/"` means: use `request.url` when it exists; otherwise use
`/` as a fallback. The `??` operator only falls back for `null` or
`undefined`.

`request.headers.host` is the HTTP `Host` header. For a local request it is
usually `localhost:3000`. The template literal turns it into a base such as:

```text
http://localhost:3000
```

The base is needed for URL parsing. It does not change the route. For this
small server, a fixed base also works:

```ts
new URL(request.url ?? "/", "http://localhost");
```

## 4) Query parameters and path parameters

For:

```text
/hello?name=Siddhesh
```

the values are:

```ts
requestUrl.pathname;                 // "/hello"
requestUrl.searchParams.get("name"); // "Siddhesh"
```

A query parameter is optional input after `?`.

For:

```text
/customers/2
```

the `2` is part of the path. A simple learning implementation can read it
with:

```ts
const parts = pathname.split("/");
const customerId = Number(parts[2]);
```

The result of splitting `/customers/2` is:

```ts
["", "customers", "2"]
```

Production code should validate that the ID is a valid integer before using it.

## 5) Methods are part of a route

These are different API operations:

```text
GET    /customers
POST   /customers
PATCH  /customers/2
DELETE /customers/2
```

The path alone does not define the complete route. The method and path together
form the route contract.

Common meanings:

- `GET`: read data
- `POST`: create data
- `PUT`: replace a resource
- `PATCH`: partially update a resource
- `DELETE`: remove data

## 6) Status codes used in the project

- `200 OK`: successful response with a body
- `201 Created`: a new resource was created
- `204 No Content`: success with no response body
- `400 Bad Request`: the client sent invalid input
- `404 Not Found`: the route or resource was not found
- `405 Method Not Allowed`: the route exists, but that method is unsupported
- `500 Internal Server Error`: unexpected server-side failure

Example:

```ts
response.statusCode = 201;
response.end(JSON.stringify(newCustomer));
```

`201` is used for `POST /customers` because a customer was created.

For `DELETE`, `204` is appropriate when there is nothing to return:

```ts
response.statusCode = 204;
response.end();
```

## 7) Headers and JSON responses

Headers describe the response body:

```ts
response.setHeader("Content-Type", "application/json");
```

JavaScript objects exist inside the server, but HTTP sends text or bytes. Use
`JSON.stringify` to convert an object into JSON text:

```ts
response.end(JSON.stringify({ status: "ok" }));
```

Without `JSON.stringify`, the client would not receive a valid JSON body.

The response header and body should agree. If the body is plain text, use
`text/plain`; if the body is JSON, use `application/json`.

## 8) Reading a request body with `data` and `end`

The request body is a readable stream. It may arrive in multiple chunks, so it
is not safe to assume that one event contains the whole body.

```ts
const chunks: Buffer[] = [];

request.on("data", (chunk) => {
    chunks.push(chunk);
});

request.on("end", () => {
    const bodyText = Buffer.concat(chunks).toString("utf8");
    const body = JSON.parse(bodyText);
});
```

`.on("data", ...)` registers a function that runs whenever another piece of
the body arrives.

`.on("end", ...)` registers a function that runs once after all body pieces
have arrived.

The sequence is:

```text
data -> data -> data -> end
```

`Buffer.concat(chunks)` joins all byte chunks. `.toString("utf8")` converts
the bytes into text. `JSON.parse` converts JSON text into a JavaScript value.

The `as` syntax in this example:

```ts
const body = JSON.parse(bodyText) as {
    name?: string;
    active?: boolean;
};
```

only tells TypeScript what shape we expect. It does not validate the input at
runtime. Runtime validation is intentionally deferred to Day 3.

A modern alternative is `for await...of`:

```ts
for await (const chunk of request) {
    chunks.push(chunk);
}
```

Both approaches consume the same readable stream. Express will later hide
this work behind `express.json()`, which makes the parsed value available as
`request.body`.

## 9) Customer API built in memory

The learning server currently uses an in-memory array:

```ts
const customers = [
    { id: 1, name: "Aarav", active: true },
    { id: 2, name: "Diya", active: false },
    { id: 3, name: "Vihaan", active: true },
];
```

Routes implemented:

```text
GET    /customers       -> return all customers
GET    /customers/:id   -> return one customer
POST   /customers       -> add a customer
PATCH  /customers/:id   -> update provided fields
DELETE /customers/:id   -> remove a customer
```

This data resets when the server restarts. That is intentional for now so the
focus remains on HTTP. File/database persistence will be a separate concern.

## 10) Common mistakes from this session

- Treating `request.url` as only a pathname when it can include a query string.
- Assuming the complete request body arrives in one `data` event.
- Forgetting `return` after sending a response, allowing later code to send a
  second response.
- Returning plain text while declaring `Content-Type: application/json`.
- Using `200` for every operation instead of communicating creation, absence,
  or method errors with the correct status code.
- Assuming a TypeScript `as` assertion validates untrusted request data.
- Expecting in-memory changes to survive a server restart.

## Quick recall

- A route is usually method + path.
- `new URL(input, base)` separates pathname and query parameters.
- `data` receives body chunks; `end` means the full body has arrived.
- `JSON.stringify` prepares a JavaScript value for an HTTP JSON response.
- `JSON.parse` converts JSON request text into a JavaScript value.
- `POST` creates, `PATCH` partially updates, and `DELETE` removes.
- Express will simplify these mechanics, but the underlying HTTP concepts stay
  the same.

## Questions to revisit

- How can the same body-reading logic be moved into a reusable helper?
- How should customer IDs be generated safely after deletions?
- How should invalid JSON and invalid customer fields be handled centrally?
- How can the in-memory repository be replaced with a file or database?

## My Notes

- I initially expected a browser request to happen only once; repeated `GET`
  logs are normal while loading or refreshing a page.
- The simpler in-memory API was chosen before adding persistence so each HTTP
  concept could be learned separately.
