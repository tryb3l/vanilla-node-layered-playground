"use strict";
import { randomUUID } from "crypto";

export default class User {
  constructor({ name, age }) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
  }
}
