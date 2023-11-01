"use strict";
import { once } from "events";
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
    const item = JSON.parse(data.toString());
    const user = new User(item);
    const id = await userService.create(user);
    response.writeHead(201, DEFAULT_HEADERS);
    response.write(
      JSON.stringify({ id, success: "User successfully created" }),
    );
    return response.end();
  },
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADERS);
    response.write("ooops, not found");
    response.end();
  },
});

export { routes };
