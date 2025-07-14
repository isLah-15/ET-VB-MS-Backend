import request from "supertest";
import app from "../../src/index";

let paymentId: number;
let userId: number;
let bookingId: number;

const testUser = {
  email: "matirita80@gmail.com",
  password: "Mkuu00$",
};

const testBooking = {
  quantity: 1,
  totalAmount: 2500,
  bookingStatus: "confirmed",
};

const testPayment = {
  transactionId: 10001,
  amount: 2500,
  paymentStatus: "completed",
  paymentMethod: "m_pesa",
};

const updatedPayment = {
  paymentStatus: "pending",
  paymentMethod: "credit_card",
};

describe("Payment Integration Tests", () => {
  beforeAll(async () => {
    // Login and fetch user ID
    const userRes = await request(app).post("/auth/login").send(testUser);
    userId = userRes.body.user.user_id;

    // Create a booking to attach to the payment
    const eventRes = await request(app).get("/events");
    const eventId = eventRes.body.events[0].eventId;

    const bookingRes = await request(app)
      .post("/booking")
      .send({ ...testBooking, userId, eventId });

    bookingId = bookingRes.body.newBooking.bookingId;
  });

  it("should create a new payment", async () => {
    const res = await request(app)
      .post("/payment")
      .send({ ...testPayment, userId, bookingId });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Payment created successfully");
    expect(res.body.newPayment[0]).toHaveProperty("paymentId");

    paymentId = res.body.newPayment[0].paymentId;
  });

  it("should get all payments", async () => {
    const res = await request(app).get("/payments");
    expect(res.status).toBe(200);
    expect(res.body.payments).toBeInstanceOf(Array);
  });

  it("should get payment by ID", async () => {
    const res = await request(app).get(`/payment/${paymentId}`);
    expect(res.status).toBe(200);
    expect(res.body.payment).toHaveProperty("paymentId", paymentId);
  });

  it("should update the payment", async () => {
    const res = await request(app).put(`/payment/${paymentId}`).send(updatedPayment);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Payment updated successfully");
    expect(res.body.updatedPayment.paymentStatus).toBe("pending");
    expect(res.body.updatedPayment.paymentMethod).toBe("credit_card");
  });

  it("should delete the payment", async () => {
    const res = await request(app).delete(`/payment/${paymentId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Payment deleted successfully");
  });

  it("should return 404 for deleted payment", async () => {
    const res = await request(app).get(`/payment/${paymentId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Payment not found");
  });
});
