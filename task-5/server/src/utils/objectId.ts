import * as os from "node:os";
import { createHash } from "node:crypto";

function generateObjectId() {
  const seconds = Math.floor(Date.now() / 1000).toString(16);
  const machineId = createHash("md5")
    .update(os.hostname())
    .digest("hex")
    .slice(0, 6);
  const processId = process.pid.toString(16).slice(0, 4).padStart(4, "0");
  const counter = process.hrtime()[1].toString(16).slice(0, 6).padStart(6, "0");

  return seconds + machineId + processId + counter;
}

export { generateObjectId };
