import os from "node:os";

export function printRuntimeInfo() {
    console.log("\n");
    console.log("Operating System:", os.type());
    console.log("Platform:", os.platform());
    console.log("Current working directory:", process.cwd());
    console.log("Number of CPU cores:", os.cpus().length);
    console.log("Current process ID:", process.pid);
    console.log("\n");
}