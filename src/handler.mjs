"use strict";
import { parse } from "node:url";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_HEADERS } from "./utils/util.mjs";
import { routes } from "./routes/userRoute.mjs";
import { generateInstance } from "./factories/userFactory.mjs";

const currentDir = dirname(fileURLToPath(import.meta.url));

const filePath = join(currentDir, "./../database", "data.json");
const userService = generateInstance({ filePath });

const userRoutes = routes({ userService });

const allRoutes = {
  ...userRoutes,
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADERS);
    response.write("ooops, not found");
    response.end();
  },
};

function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  const choosen = allRoutes[key] || allRoutes.default;

  return Promise.resolve(choosen(request, response)).catch(
    errorHandler(response),
  );
}

function errorHandler(response, request) {
  return (/** @type {{ stack: any; message: string; }} */ error) => {
    console.log("error:", error.stack);
    response.writeHead(500, DEFAULT_HEADERS);
    response.write(
      JSON.stringify({ error: error.message + " Internal server error" }),
    );
    return response.end();
  };
}

export default handler;
