import request from "supertest";
import app from "../src/app";

describe("User Controller", () => {
  describe("POST /users/register", () => {
    it("should create a new user", async () => {
      // Generate unique email
      const uniqueEmail = `test${Date.now()}@example.com`;

      const response = await request(app).post("/users/register").send({
        email: uniqueEmail,
        password: "password123",
        name: "Test User",
      });

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(uniqueEmail);
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app).post("/users/register").send({
        email: "invalid-email",
        password: "short",
      });

      expect(response.status).toBe(400);
    });
  });

  // Test for user login
  describe("POST /users/login", () => {
    it("should log in the user and return a token", async () => {
      const response = await request(app).post("/users/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(app).post("/users/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });
});
