"use strict";
import http from "node:http";
import handler from "./handler.mjs";

const PORT = process.env.PORT || 3000;

const server = http
  .createServer(handler)
  .listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`),
  );

export default server;
