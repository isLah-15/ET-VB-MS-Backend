import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";

let ticketId: number;
let userId: number;

const testUser = {
  email: "matirita80@gmail.com",
  password: "Mkuu00$",
};

const testTicket = {
  subject: "Login Issue",
  description: "I can't log into my account.",
  status: "open",
};

describe("Customer Support Integration Tests", () => {
  beforeAll(async () => {
    const userRes = await request(app).post("/auth/login").send(testUser);
    console.log("User Response:", userRes.body);

    userId = userRes.body.user?.user_id || userRes.body.userId;
    console.log("User ID:", userId);
  });

  it("should create a new customer support ticket", async () => {
    const res = await request(app)
      .post("/support")
      .send({ ...testTicket, userId });

    console.log("Create Ticket Response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Customer support ticket created successfully");
    expect(res.body.newTicket).toHaveProperty("ticketId");

    ticketId = res.body.newTicket.ticketId;
  });

  it("should fetch all customer support tickets", async () => {
    const res = await request(app).get("/support");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support tickets retrieved successfully");
    expect(Array.isArray(res.body.tickets)).toBe(true);
  });

  it("should fetch customer support ticket by ID", async () => {
    const res = await request(app).get(`/support/${ticketId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket retrieved successfully");
    expect(res.body.ticket).toHaveProperty("ticketId", ticketId);
  });

  it("should update the customer support ticket", async () => {
    const updatedTicket = {
      subject: "Updated Login Issue",
      description: "Issue persists after trying password reset.",
      status: "in_progress",
    };

    const res = await request(app)
      .put(`/support/${ticketId}`)
      .send(updatedTicket);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket updated successfully");
    expect(res.body.updatedTicket.status).toBe("in_progress");
  });

  it("should delete the customer support ticket", async () => {
    const res = await request(app).delete(`/support/${ticketId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Customer support ticket deleted successfully");
  });

  it("should return 404 for deleted ticket", async () => {
    const res = await request(app).get(`/support/${ticketId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Customer support ticket not found");
  });

  // Optionally clean up test user
  // afterAll(async () => {
  //   await db.delete(UserTable).where(eq(UserTable.userId, userId));
  // });
});
