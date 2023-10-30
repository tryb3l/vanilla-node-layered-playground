import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";
test("Users Integration Test Suite", async (t) => {
  const testPort = 9009;

  // that's bad practice because it mutates the environment
  process.env.PORT = testPort;
  const { server } = await import("../../src/index.mjs");

  const testServerAddress = `http://localhost:${testPort}/users`;

  await t.test("it should create a user", async (t) => {
    const data = {
      name: "Bohdan2",
      age: 29,
    };

    const request = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.strictEqual(request.headers.get("content-type"), "application/json");

    assert.strictEqual(request.status, 201);

    const result = await request.json();
    assert.strictEqual(
      result.success,
      "User successfully created",
      "it should return a valid text message",
    );

    assert.ok(result.id.length > 30, "id should be a valid uuid");
  });

  await promisify(server.close.bind(server))();
});
