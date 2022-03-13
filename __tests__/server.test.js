const server = require("../server");
const supertest = require("supertest");
const request = supertest(server);

const { sequelize } = require("../models/index");

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe("unit testing", () => {
  it("POST /signup creates a new user and sends an object with the user", async () => {
    let user = {
      username: "test",
      password: "1234",
      role: "writer",
    };
    const response = await request.post("/signup").send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual("test");
  });

  it("POST to /signin to login as a user (use basic auth)", async () => {
    let user = {
      username: "test",
      password: "1234",
      role: "writer",
    };
    const response = await request
      .post("/signin")
      .auth(user.username, user.password);
    expect(response.status).toBe(200);
  });

  it("POST to /signin to login as a user (use basic auth)", async () => {
    let user = {
      username: "test",
      password: "1234",
      role: "writer",
    };
    const response = await request
      .post("/signin")
      .auth(user.username, user.password);
    expect(response.status).toBe(200);
  });



});
