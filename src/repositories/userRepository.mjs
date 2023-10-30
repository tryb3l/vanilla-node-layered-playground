"use strict";
import { readFile, writeFile } from "fs/promises";

export default class UserRepository {
  constructor({ file }) {
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file, { encoding: "utf-8" }));
  }

  async find() {
    return this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
}

//verification of the UserRepository class
// const userRepository = new UserRepository({
//   file: "./database/data.json",
// });
// console.log(await userRepository.create({ id: 33, name: "Bohdan" }));
// console.log(await userRepository.find());
