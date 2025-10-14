import { describe, test, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { User } from "../models/userModel.js";
import { app } from "../../index.js";

describe("Testing users endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const newUser = new User({
      username: "lukara",
      passwordHash: "12345",
      name: "Luka Radic",
    });
    await newUser.save();
  });
  test("POST /api/users shouldn't create an invalid user", async () => {
    const invalidUserData = {
      username: "lu",
      password: "12",
      name: "Luka Radic",
    };
    const response = await request(app)
      .post("/api/users")
      .send(invalidUserData);
    assert.equal(400, response.statusCode);
  });
});
