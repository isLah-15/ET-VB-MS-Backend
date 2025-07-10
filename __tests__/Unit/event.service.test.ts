import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventByIdService,
  deleteEventService
} from "../../src/Event/event.service"; // Adjust path as needed

import db from "../../src/Drizzle/db";

// Mock the database module
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      EventTable: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
  },
}));

const mockVenue = {
  venueId: 1,
  venueName: "Mock Venue",
  address: 123,
  capacity: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockEvent = {
  eventId: 1,
  eventName: "Mock Festival",
  venueId: 1,
  category: "Music",
  eventDate: new Date(),
  startTime: "18:00:00",
  endTime: "23:00:00",
  description: "A great event",
  ticketPrice: 500,
  ticketsTotal: 100,
  ticketsAvailable: 80,
  ticketsSold: 20,
  isActive: true,
  imageUrl: "http://example.com/image.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
  venue: mockVenue, 
};

describe("Event Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new event", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockEvent]),
      }),
    });

    const result = await createEventService(mockEvent as any);
    expect(result).toEqual([mockEvent]);
    expect(db.insert).toHaveBeenCalled();
  });

  test("should return all events with venue", async () => {
    (db.query.EventTable.findMany as jest.Mock).mockResolvedValue([mockEvent]);

    const result = await getAllEventsService();
    expect(result).toEqual([mockEvent]);
    if (typeof result[0] !== "string") {
      expect(result[0]).toHaveProperty("venueId");
      expect(result[0].venueId).toEqual(mockVenue.venueId);
    }
  });

  test("should return event by ID with venue", async () => {
    (db.query.EventTable.findFirst as jest.Mock).mockResolvedValue(mockEvent);

    const result = await getEventByIdService(1);
    expect(result).toEqual(mockEvent);
    expect(typeof result !== "string" && result).toHaveProperty("venue");
    if (typeof result !== "string" && result !== null) {
      expect(result.venue).toEqual(mockVenue);
    }
  });

  test("should update event by ID", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockEvent]),
        }),
      }),
    });

    const result = await updateEventByIdService(1, mockEvent as any);
    expect(result).toBe("Event updated successfully");
  });

  test("should delete event by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockEvent]),
      }),
    });

    const result = await deleteEventService(1);
    expect(result).toBe("Event deleted successfully");
  });

  test("should return 'Event not found' if delete fails", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await deleteEventService(999);
    expect(result).toBe("Event not found");
  });
});
