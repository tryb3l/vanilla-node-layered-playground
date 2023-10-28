import { test, describe } from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

//TODO 
test("User API", async (t) => {
  const { server } = await import("../../src/index.mjs");

  const testPort = 9009;

  process.env.PORT = testPort;
  const testServerAddress = `http://localhost:${testPort}/users`;

  await t.test("Creating a user", async (t) => {
    const data = {
      name: "Bohdan",
      age: 29,
    };
    fetch;
  });

  await promisify(server.close.bind(server))();
});
