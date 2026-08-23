import { printRuntimeInfo } from "./runtime-info.js";
import { readFile, writeFile, appendFile, unlink, mkdir } from "node:fs/promises";
import { resolve, basename } from "node:path";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";

async function main(): Promise<void> {
    
    printRuntimeInfo();
    const appName:string = process.env.APP_NAME ?? "";
    const userName:string = process.argv[2] ?? "Anonymous";

    if(!appName){
        console.error("Error: APP_NAME environment variable is required");
        console.log("\n");
        process.exitCode = 1;
    } else{
        console.log(`${appName} is running for ${userName}`);
        console.log("\n");
        console.log("\n");
        console.log("\n");
    }


    type Customer = {
        id: number;
        name: string;
        active: boolean;
    }
    
    
    const appEvents = new EventEmitter();
    appEvents.on("processing:start", (payload) => {
        console.log("[event] processing:start", payload);
        console.log("\n");
    });

    appEvents.on("processing:fileRead", (payload) => {
        console.log("[event] processing:fileRead", payload);
        console.log("\n");
    });

    appEvents.on("processing:parsed", (payload) => {
        console.log("[event] processing:parsed", payload);
        console.log("\n");
    });

    appEvents.on("processing:fileWritten", (payload) => {
        console.log("[event] processing:fileWritten", payload);
        console.log("\n");
    });

    appEvents.on("processing:fileUpdated", (payload) => {
        console.log("[event] processing:fileUpdated", payload);
        console.log("\n");
    });

    appEvents.on("processing:fileDeleted", (payload) => {
        console.log("[event] processing:fileDeleted", payload);
        console.log("\n");
    });
    
    appEvents.on("processing:error", (payload) => {
        console.error("[event] processing:error", payload);
        console.log("\n");
    });




    //Reading file path from command line arguments.
    const filePath:string = process.argv[3] ?? "data/customers.json";

    //File path using node:path module
    const inputArg = process.argv[3];
    const defaultInputPath = resolve(process.cwd(), "data/customers.json");
    const inputPath = inputArg ? resolve(process.cwd(), inputArg) : defaultInputPath;
    console.log("\n");
    console.log("Input file path:", inputPath);
    console.log("\n");
    appEvents.emit("processing:start", {inputPath: inputPath, userName: userName});
    
    try{
        const json_data:string = await readFile(inputPath, {encoding: "utf-8"});
        appEvents.emit("processing:fileRead", { data: json_data });

        //creating checksum of the file content using SHA256 algorithm
        const hash:string = createHash("sha256").update(json_data, "utf-8").digest("hex");
        console.log("SHA256 Hash of file content:", hash);
        console.log("\n");
        console.log("\n");

        const data:Customer[] = JSON.parse(json_data);
        appEvents.emit("processing:parsed", { data: data });

        const active:Customer[] = data.filter((customer : Customer) => {
            return customer.active === true;
        });
        console.log("File content:", data);
        console.log("Total records: " + data.length);
        console.log("Active records: " + active.length);
        console.log("\n");
        console.log("\n");





        //Writing active records to a new file
        const reportDir_path: string = resolve(process.cwd(), "reports");
        await mkdir(reportDir_path, { recursive: true });

        const summaryPath: string = resolve(reportDir_path, "summary.json");
        const summary = {
            appName,
            userName,
            inputPath,
            hash,
            total: data.length,
            active: active.length,
            generatedAt: new Date().toISOString()
        }

        await writeFile(summaryPath, JSON.stringify(summary, null, 2), {encoding: "utf-8"});
        appEvents.emit("processing:fileWritten", { summaryPath: summaryPath, summary: summary });




        const logPath: string = resolve(reportDir_path, "log.txt");
        const line = `${new Date().toISOString()} | user=${userName} | input=${inputPath} | total=${data.length}\n`;
        await appendFile(logPath, line, {encoding: "utf-8"});
        appEvents.emit("processing:fileUpdated", { logPath: logPath, line: line });


        //Deleting the input file
        const tempPath: string = resolve(reportDir_path, "temp.json");
        await writeFile(tempPath, "temp file for deletion", {encoding: "utf-8"});
        setTimeout(async () => {
            await unlink(tempPath);
            appEvents.emit("processing:fileDeleted", { tempPath: tempPath });
        }, 3000);

    } catch(error){
        console.error("Error reading file:", error);
        process.exitCode = 1;
    }
    
}

await main();



















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