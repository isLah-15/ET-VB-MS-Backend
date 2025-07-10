import request from "supertest";
import app from "../../src/index"; // Adjust path to your Express app
import db from "../../src/Drizzle/db";
import { VenueTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

describe("Venue Integration Tests", () => {
  let venueId: number;

  const testVenue = {
    venueName: "Test Arena",
    address: 101,
    capacity: 5000
  };

  // CREATE venue
it("should create a new venue", async () => {
  const res = await request(app)
    .post("/venue")
    .send(testVenue);

  expect(res.status).toBe(201);
  expect(res.body.message).toBe("Venue created successfully");
  expect(res.body.newVenue[0]).toHaveProperty("venueId"); // Access first item in array
  venueId = res.body.newVenue[0].venueId;
});


  // GET all venues
  it("should retrieve all venues", async () => {
    const res = await request(app).get("/venue");

    expect(res.status).toBe(200);
    expect(res.body.venues.length).toBeGreaterThan(0);
  });

  // GET venue by ID
  it("should get a venue by ID", async () => {
    const res = await request(app).get(`/venue/${venueId}`);

    expect(res.status).toBe(200);
    expect(res.body.venue).toHaveProperty("venueName", testVenue.venueName);
  });

  // UPDATE venue 
it("should update the venue", async () => {
  const updatedVenue = { venueName: "Updated Arena", address: 202, capacity: 6000 };

  const res = await request(app)
    .put(`/venue/${venueId}`)
    .send(updatedVenue);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Venue updated successfully");
});


  // DELETE venue
  it("should delete the venue", async () => {
    const res = await request(app).delete(`/venue/${venueId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Venue deleted successfully");
  });

  // GET deleted venue
  it("should return 404 for deleted venue", async () => {
    const res = await request(app).get(`/venue/${venueId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Venue not found");
  });
});