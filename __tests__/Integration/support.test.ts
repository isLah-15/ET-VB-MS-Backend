import request from "supertest";
import app from "../../src/index"; 
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

let ticketId: number;
let testUserId: number;

const testUser = {
  email: "matirita80@gmail.com",
  password: "Mkuu00$"
};

const testTicket = {
  subject: "Can't access event page",
  description: "I receive a 404 error when accessing my event.",
  status: "open"
};

const updatedTicket = {
  subject: "Updated Issue Title",
  description: "Updated ticket description.",
  status: "resolved"
};

describe("Customer Support Integration Tests", () => {
  beforeAll(async () => {
    // Login or register user to get userId
    const loginRes = await request(app).post("/auth/login").send(testUser);
    testUserId = loginRes.body.user?.user_id || loginRes.body.userId;

    if (!testUserId) throw new Error("User login failed: userId not found");
  });

  it("should create a new customer support ticket", async () => {
    const res = await request(app)
      .post("/support")
      .send({ ...testTicket, userId: testUserId });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Customer support ticket created successfully");
    expect(res.body.newTicket[0]).toHaveProperty("ticketId");

    ticketId = res.body.newTicket[0].ticketId;
  });

  it("should retrieve all customer support tickets", async () => {
    const res = await request(app).get("/support");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support tickets retrieved successfully");
    expect(Array.isArray(res.body.tickets)).toBe(true);
  });

  it("should retrieve a customer support ticket by ID", async () => {
    const res = await request(app).get(`/support/${ticketId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket retrieved successfully");
    expect(res.body.ticket.ticketId).toBe(ticketId);
    expect(res.body.ticket.userId).toBe(testUserId);
  });

  it("should update a customer support ticket by ID", async () => {
    const res = await request(app)
      .put(`/support/${ticketId}`)
      .send(updatedTicket);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket updated successfully");
    expect(res.body.updatedTicket.subject).toBe("Updated Issue Title");
    expect(res.body.updatedTicket.status).toBe("resolved");
  });

  it("should delete a customer support ticket by ID", async () => {
    const res = await request(app).delete(`/support/${ticketId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket deleted successfully");
  });

  it("should return 404 for a deleted customer support ticket", async () => {
    const res = await request(app).get(`/support/${ticketId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Customer support ticket not found");
  });

  afterAll(async () => {
    // Optional: clean up or close DB connections
  });
});
