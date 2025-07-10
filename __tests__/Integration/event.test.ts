import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";

import { EventTable, VenueTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

let eventId: number;
let venueId: number;

const testVenue = {
  venueName: "Event Venue Hall",
  address: 303,
  capacity: 7000,
};

const testEvent = {
  eventName: "Mega Concert",
  category: "Music",
  eventDate: "2025-08-01",
  startTime: "18:00:00",
  endTime: "23:00:00",
  description: "An amazing night of performances",
  ticketPrice: 3000,
  ticketsTotal: 5000,
  ticketsAvailable: 5000,
  imageUrl: "https://example.com/concert.jpg",
  isActive: true,
};

describe("Event Integration Tests", () => {
  beforeAll(async () => {
    const res = await request(app).post("/venue").send(testVenue);
    venueId = res.body.newVenue[0].venueId;
  });

  it("should create a new event", async () => {
    const res = await request(app)
      .post("/event")
      .send({ ...testEvent, venueId });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Event created successfully");
    expect(res.body.newEvent[0]).toHaveProperty("eventId");
    eventId = res.body.newEvent[0].eventId;
  });

  it("should fetch all events", async () => {
    const res = await request(app).get("/events");
    expect(res.status).toBe(200);
    expect(res.body.events).toBeInstanceOf(Array);
  });

  it("should get event by ID", async () => {
    const res = await request(app).get(`/event/${eventId}`);
    expect(res.status).toBe(200);
    expect(res.body.event).toHaveProperty("eventId", eventId);
  });

  it("should update the event", async () => {
  const updatedEvent = { eventName: "Updated Concert Night", description: "Now with more artists!" };

  const res = await request(app)
    .put(`/event/${eventId}`)
    .send(updatedEvent);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Event updated successfully");
});

  it("should delete the event", async () => {
    const res = await request(app).delete(`/event/${eventId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event deleted successfully");
  });

  it("should return 404 for deleted event", async () => {
    const res = await request(app).get(`/event/${eventId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Event not found");
  });

  afterAll(async () => {
    await request(app).delete(`/venue/${venueId}`);
  });
});
