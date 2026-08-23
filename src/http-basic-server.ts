import { createServer } from "node:http";
import { URL } from "node:url";
import { getMemoryUssage, getCpu } from "./runtime-info.js";

const server = createServer((request, response) => {
    console.log("Received request:", request.method, request.url);
    // response.setHeader("Content-Type", "text/plain");
    response.setHeader("Content-Type", "application/json");
    // new URL(input, base)
    // The first argument is the URL we want to parse. 
    // The second argument is used when the first argument is relative.
    const requestUrl = new URL(
        request.url ?? "/",
        `http://${request.headers.host ?? "localhost"}`,
    );

    const pathname = requestUrl.pathname;
    const name = requestUrl.searchParams.get("name");

    if(request.method === "GET" && pathname === "/hello"){
        response.statusCode = 200;
        response.end(`Hello, ${name ?? "Anonymous"}`);
        return;
    }

    if(request.method === "GET" && request.url === "/health"){
        response.statusCode = 200;
        response.end("Server is healthy");
        return;
    }

    const spec = requestUrl.searchParams.get("spec");
    if(pathname === "/cpu-logs"){
        if(request.method === "GET") {
            if(spec?.toString() === "memory"){
                const memoryUsage = getMemoryUssage();
                response.statusCode = 200;
                response.end("Memory Usage: " + memoryUsage + " bytes");
                return;
            } else if(spec?.toString() === "cpu"){
                const cpu = getCpu();
                response.statusCode = 200;
                const result = {
                    status: "ok",
                    cpuCores: cpu.length,
                }
                response.end(JSON.stringify(result));
                return;
            }
        }
        response.statusCode = 405;
        response.setHeader("Allow", "GET");
        response.end(JSON.stringify({error: "Method not allowed"}));
        return;
    }

    let customers = [
        { id: 1, name: "Aarav", active: true },
        { id: 2, name: "Diya", active: false },
        { id: 3, name: "Vihaan", active: true }
    ];
    if(pathname === "/customers"){
        if(request.method === "GET") {
            response.statusCode = 200;
            response.end(JSON.stringify(customers));
            return;
        }
        if(request.method === "POST") {
            const chunks:Buffer[] = [];
            request.on("data", (chunk) => {
                chunks.push(chunk);
            });
            request.on("end", () => {
                const bodyText = Buffer.concat(chunks).toString("utf8");
                const body = JSON.parse(bodyText) as {
                    name: string;
                    active: boolean;
                };

                const newCustomer = {
                    id: customers.length + 1,
                    name: body.name,
                    active: body.active,
                }
                customers.push(newCustomer);
                response.statusCode = 201;
                response.end(JSON.stringify(newCustomer));
            });
            return;
        }
    }

    if (request.method === "GET" && pathname.startsWith("/customers/")) {
        const parts = pathname.split("/");
        const customerId = Number(parts[2]);
        // [ '', 'customers', '2' ]

        const customer = customers.find((customer) => customer.id === customerId);

        if (!customer) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: "Customer not found" }));
            return;
        }

        response.statusCode = 200;
        response.end(JSON.stringify(customer));
        return;
    }

    if(request.method === "DELETE" && pathname.startsWith("/customers/")) {
        const parts = pathname.split("/");
        const customerId = Number(parts[2]);

        const customerIndex = customers.findIndex((customer) => customer.id === customerId);
        if (customerIndex === -1) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: "Customer not found" }));
            return;
        }
        customers = customers.filter((customer) => customer.id !== customerId);
        response.statusCode = 200;
        response.end(JSON.stringify({ message: "Customer deleted successfully", deletedCustomerId: customerId, index: customerIndex }));
        return;
    }

    if (request.method === "PATCH" && pathname.startsWith("/customers/")) {
        const parts = pathname.split("/");
        const customerId = Number(parts[2]);

        const customer = customers.find(
            (customer) => customer.id === customerId,
        );

        if (!customer) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: "Customer not found" }));
            return;
        }

        const chunks: Buffer[] = [];

        request.on("data", (chunk) => {
            chunks.push(chunk);
        });

        request.on("end", () => {
            const bodyText = Buffer.concat(chunks).toString("utf8");

            const body = JSON.parse(bodyText) as {
                name?: string;
                active?: boolean;
            };

            if (body.name !== undefined) {
                customer.name = body.name;
            }

            if (body.active !== undefined) {
                customer.active = body.active;
            }

            response.statusCode = 200;
            response.end(JSON.stringify(customer));
        });

        return;
    }


    response.statusCode = 404;
    response.end(JSON.stringify({error: "Route Not Found"}));
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})