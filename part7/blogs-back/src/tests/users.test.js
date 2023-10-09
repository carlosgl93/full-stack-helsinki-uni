const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { initialUsers, usersInDb } = require("./test_helper");

const api = supertest(app);

describe("initially there is one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userMongo = new User(initialUsers[0]);
    await userMongo.save();
  });
  test("create new user", async () => {
    const startingUsers = await usersInDb();
    const newUser = {
      username: "firstUSer",
      name: "First User",
      password: "firstUserPAssword",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(startingUsers.length + 1);

    const usernames = allUsers.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("username taken", async () => {
    const startingUsers = await usersInDb();
    const newUser = {
      ...startingUsers[0],
    };

    const res = api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toEqual(startingUsers);
  });

  test("too short username", async () => {
    const newShortUser = {
      username: "1a",
      name: "asdf",
      password: "asd223234a",
    };

    await api.post("/api/users").send(newShortUser).expect(400);
  });

  test("too short password", async () => {
    const newShortUser = {
      username: "1asdfa",
      name: "asdf",
      password: "a",
    };

    await api.post("/api/users").send(newShortUser).expect(400);
  });
});

// describe("manipulating blog from user", async () => {});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
