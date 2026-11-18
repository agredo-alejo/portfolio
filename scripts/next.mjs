import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const [major, minor] = process.versions.node.split(".").map(Number);
// Keep the compatibility flag local to Next on this workstation's Node 22.11.
const flags =
  major === 22 && minor < 12 ? ["--experimental-require-module"] : [];
const child = spawn(
  process.execPath,
  [...flags, require.resolve("next/dist/bin/next"), ...process.argv.slice(2)],
  { stdio: "inherit", env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
child.on("error", () => {
  process.stderr.write("Could not start Next.js.\n");
  process.exit(1);
});
