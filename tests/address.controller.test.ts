import request from "supertest";
import app from "../src/app";

describe("Address Controller", () => {
  let token: string;

  // Login first
  beforeAll(async () => {
    const loginResponse = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = loginResponse.body.token;
  });

  describe("POST /addresses", () => {
    it("should create a new address", async () => {
      const response = await request(app)
        .post("/addresses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          street: "123 Main St",
          city: "New York",
          country: "USA",
        });

      expect(response.status).toBe(201);
      expect(response.body.street).toBe("123 Main St");
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(app)
        .post("/addresses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          // Missing street and country
          city: "New York",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /addresses", () => {
    it("should return a list of addresses", async () => {
      const response = await request(app)
        .get("/addresses")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/addresses");

      expect(response.status).toBe(401);
    });
  });
});
