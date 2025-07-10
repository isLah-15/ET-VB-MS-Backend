import request from "supertest";
import app from "../../src/index"; // Update if your app is exported from another file
import db from "../../src/Drizzle/db";

import { UserTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

let createdUserEmail: string = "";
let verificationCode: string = "";

describe("Auth Integration Tests", () => {
  const testUser = {
    firstName: "Test",
    lastName: "User",
    email: `testuser${Date.now()}@example.com`, // unique email per run
    password: "password123",
    contactPhone: 1234567890,
    address: "Test Address",
    role: "user",
  };

  // Create user
  it("should register a new user and send verification code", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toContain("Verification code sent to email");
    createdUserEmail = testUser.email;

    // Get verification code from DB (assuming test DB)
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, createdUserEmail),
    });
    verificationCode = user?.verificationCode || "";
    expect(verificationCode).not.toBe("");
  });

  // Verify user
  it("should verify the newly created user", async () => {
    const res = await request(app)
      .post("/auth/verify")
      .send({
        email: createdUserEmail,
        code: verificationCode,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User verified successfully");
  });

  // Login user
  it("should log in the verified user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: createdUserEmail,
        password: testUser.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successfull");
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(createdUserEmail);
  });

  // Get all users
  it("should fetch all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.users).toBeInstanceOf(Array);
  });

  // Get user by ID
  it("should fetch a user by ID", async () => {
    const user = await db.query.UserTable.findFirst({
      where:  eq(UserTable.email, createdUserEmail)  
    });

    const res = await request(app).get(`/user/${user?.userId}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(createdUserEmail);
  });

  // Update user by ID
  it("should update user info", async () => {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, createdUserEmail) 
    });

    const res = await request(app)
      .put(`/user/${user?.userId}`)
      .send({
        userId: user?.userId,
        firstName: "Updated",
        role: "admin",
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
    expect(res.body.updatedUser.firstName).toBe("Updated");
  });

  // Delete user
  it("should delete user by ID", async () => {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, createdUserEmail),
    });

    const res = await request(app).delete(`/user/${user?.userId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});
