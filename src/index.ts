import { printRuntimeInfo } from "./runtime-info.js";
import { readFile } from "node:fs/promises";

printRuntimeInfo();
const appName:string = process.env.APP_NAME ?? "";
const userName:string = process.argv[2] ?? "Anonymous";

if(!appName){
    console.error("Error: APP_NAME environment variable is required");
    process.exitCode = 1;
} else{
    console.log(`${appName} is running for ${userName}`);
    console.log(filePath);
}

type Customer = {
    id: number;
    name: string;
    active: boolean;
}

try{
    const filePath:string = process.argv[3] ?? "data/customers.json";
    const json_data:string = await readFile(filePath, {encoding: "utf-8"});
    const data:Customer[] = JSON.parse(json_data);
    const active:Customer[] = data.filter((customer : Customer) => {
        return customer.active === true;
    });
    console.log("File content:", data);
    console.log("Total records: " + data.length);
    console.log("Active records: " + active.length);

} catch(error){
    console.error("Error reading file:", error);
}




























// npm run dev
// npm run dev -- Siddhesh
// $env:App_Name="Customer CLI"  # For PowerShell
// node --env-file=.env --import=tsx src/index.ts Siddhesh
// node --env-file=.env --import=tsx src/index.ts
// node --env-file=.env dist/index.js
// node --env-file=.env dist/index.js Siddhesh
// commands





// const message: string = "Customer CLI is running for ";

// Reading command line arguments
// const args2 = process.argv[2] ?? "Anonymous";
// console.log(message + " " + args2);
// const args = process.argv;
// args.forEach((arg) => {
//     console.log(arg);
// });


// Reading environment variables from .evn file

// In powershell, run the following command to set the environment variable:
// $env:App_Name="Customer CLI"  # For PowerShell 
// const appName = process.env.APP_NAME;
// console.log("App Name:", appName);

// Important: environment variables are always strings or undefined. They are not automatically numbers or booleans.