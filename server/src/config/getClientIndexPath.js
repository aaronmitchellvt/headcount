import { fileURLToPath } from "url";
import path, { dirname } from "path";
import config from "../config.js";

const getClientIndexPath = () => {
  const currentPath = dirname(fileURLToPath(meta.url));
  let indexPath = path.join(currentPath, "index.html");
  if (config.nodeEnv !== "production") {
    indexPath = path.join(currentPath, "index.html");
  }

  return indexPath;
};

export default getClientIndexPath;
