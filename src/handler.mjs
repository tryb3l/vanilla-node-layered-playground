"use strict";
import { parse } from "node:url";
import { DEFAULT_HEADERS } from "./utils/util.mjs";

const allRoutes = {
  "/users:get": (request, response) => {
    response.writeHead(200, DEFAULT_HEADERS);
    response.end("Hello World");
  },
  //404 route
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADERS);
    response.write("ooops, not found");
    response.end();
  },
};

function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  console.log("url:", url);
  console.log("method:", method);
  const key = `${pathname}:${method.toLowerCase()}`;
  const choosen = allRoutes[key] || allRoutes.default;
  return Promise.resolve(choosen(request, response)).catch(
    errorHandler(response),
  );
}

function errorHandler(response) {
  return (error) => {
    console.log("error:", error.stack);
    response.writeHead(500, DEFAULT_HEADERS);
    response.write(
      JSON.stringify({ error: error.message + " Internal server error" }),
    );
    return response.end();
  };
}

export default handler;
