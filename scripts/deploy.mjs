import { copyFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const targetDir =
  "/Volumes/Macintosh HD/Users/wudao/Obsidian/Obsidian笔记库/.obsidian/plugins/Odaily";

const pluginFiles = [
  "main.js",
  "manifest.json",
  "styles.css"
];

await run("npm", ["run", "build"]);
await mkdir(targetDir, { recursive: true });

for (const file of pluginFiles) {
  await copyFile(resolve(projectRoot, file), resolve(targetDir, file));
}

console.log(`Deployed Odaily plugin to: ${targetDir}`);

function run(command, args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: "inherit"
    });

    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      rejectPromise(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}
