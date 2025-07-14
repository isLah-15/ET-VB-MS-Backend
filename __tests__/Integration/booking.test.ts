import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";



let bookingId: number;
let userId: number;
let venueId: number;
let eventId: number;

const testUser = {
  email: "collinsturi@gmail.com",
  password: "Mkuu00$",
};

const testVenue = {
  venueName: "Mombasa Convention Center",
  address: 202,
  capacity: 1500,
};

const testEvent = {
  eventName: "Startup Connect Kenya",
  category: "Tech",
  eventDate: "2025-09-01",
  startTime: "10:00",
  endTime: "17:00",
  description: "Tech innovators and startups networking summit.",
  ticketPrice: 2500,
  ticketsTotal: 500,
  ticketsAvailable: 400,
  ticketsSold: 100,
  imageUrl: "https://example.com/images/event2.jpg",
  isActive: true,
};

const testBooking = {
  quantity: 2,
  totalAmount: 5000, 
  bookingStatus: "confirmed",
};


describe("Booking Integration Tests", () => {
  beforeAll(async () => {
    const userRes = await request(app).post("/auth/login").send(testUser);
    console.log("User Response:", userRes.body);
    console.log(userRes.body.user)
        console.log(userRes.body.user.user_id)

    
    userId = userRes.body.user.user_id;

    console.log("User ID:", userId);
    const venueRes = await request(app).post("/venue").send(testVenue);
    console.log("Venue Response:", venueRes.body);
    
    
    venueId = venueRes.body.newVenue[0].venueId;

    console.log("Venue ID:", venueId);

    const eventRes = await request(app)
      .post("/event")
      .send({ ...testEvent, venueId });
          console.log("rrrrrrrr", eventRes.body)

                    console.log("ggggggggg", eventRes.body.newEvent)
                              console.log("dddddddd", eventRes.body.newEvent[0].eventId)


    eventId = eventRes.body.newEvent[0].eventId;

  });

   it("should create a new booking", async () => {
        console.log("Booking Response:", testBooking, userId, eventId);
    
    const res = await request(app)
      .post("/booking")
      .send({ ...testBooking, userId, eventId });

    console.log("Sending Booking:", { ...testBooking, userId, eventId });
    console.log("Booking Response:", res.body);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Booking created successfully");
    expect(res.body.newBooking).toHaveProperty("bookingId");

    bookingId = res.body.newBooking.bookingId;
  });

  it("should fetch all bookings", async () => {
    const res = await request(app).get("/bookings");
    expect(res.status).toBe(200);
    expect(res.body.bookings).toBeInstanceOf(Array);
  });

  it("should get booking by ID", async () => {
    const res = await request(app).get(`/booking/${bookingId}`);
    expect(res.status).toBe(200);
    expect(res.body.booking).toHaveProperty("bookingId", bookingId);
  });

  it("should update the booking", async () => {
    const updatedBooking = { bookingStatus: "cancelled" };
    const res = await request(app).put(`/booking/${bookingId}`).send(updatedBooking);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking updated successfully");
  });

  it("should delete the booking", async () => {
    const res = await request(app).delete(`/booking/${bookingId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking deleted successfully");
  });

  

//   afterAll(async () => {
//     await request(app).delete(`/event/${eventId}`);
//     await request(app).delete(`/venue/${venueId}`);
//     await db.delete(UserTable).where(eq(UserTable.userId, userId));
//   });
});
