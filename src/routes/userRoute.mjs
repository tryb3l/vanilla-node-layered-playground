"use strict";
import { once } from "node:events";
import User from "../entities/user.mjs";
import { DEFAULT_HEADERS } from "../utils/util.mjs";

const routes = ({ userService }) => ({
  "/users:get": async (request, response) => {
    const users = await userService.find();
    response.write(JSON.stringify({ results: users }));
    return response.end();
  },
  "/users:post": async (request, response) => {
    const data = await once(request, "data");
    // @ts-ignore
    const item = JSON.parse(data.toString());
    const user = new User(item);

    const id = await userService.create(user);

    response.writeHead(201, DEFAULT_HEADERS);
    response.write(
      JSON.stringify({
        id,
        success: "User created",
      }),
    );

    return response.end();
  },
});

export { routes };
