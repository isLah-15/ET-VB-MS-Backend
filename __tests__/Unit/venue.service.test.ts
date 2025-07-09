import {
  createVenueService,
  getAllVenuesService,
  getVenueByIdService,
  updateVenueByIdService,
  deleteVenuebyIdService
} from "../../src/Venue/venue.service"; // Adjust the path as needed

import db from "../../src/Drizzle/db";
import { TIVenue } from "../../src/Drizzle/schema"; // Adjust the path as needed

// Mock the entire db module
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    query: {
      VenueTable: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockVenue = {
  venueName: "Test Hall",
  address: 12345,
  capacity: 300
//   createdAt: new Date(),
//   updatedAt: new Date(),
};

describe("Venue Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new venue", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockVenue]),
      }),
    });

    const result = await createVenueService(mockVenue as any);
    expect(result).toEqual([mockVenue]);
    expect(db.insert).toHaveBeenCalled();
  });

  test("should return venues if available", async () => {
    (db.query.VenueTable.findMany as jest.Mock).mockResolvedValue([mockVenue]);

    const venues = await getAllVenuesService();
    expect(venues).toEqual([mockVenue]);
  });

  test("should return 'No venues found' if none exist", async () => {
    (db.query.VenueTable.findMany as jest.Mock).mockResolvedValue([]);

    const venues = await getAllVenuesService();
    expect(venues).toBe("No venues found");
  });

  test("should get venue by ID", async () => {
    (db.query.VenueTable.findFirst as jest.Mock).mockResolvedValue(mockVenue);

    const result = await getVenueByIdService(1);
    expect(result).toEqual(mockVenue);
  });

  test("should return 'Venue not found' if no venue exists for ID", async () => {
    (db.query.VenueTable.findFirst as jest.Mock).mockResolvedValue(undefined);

    const result = await getVenueByIdService(999);
    expect(result).toBe("Venue not found");
  });

  test("should update venue by ID", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockVenue]),
        }),
      }),
    });

    const result = await updateVenueByIdService(1, mockVenue as any);
    expect(result).toBe("Venue updated successfully");
  });

  test("should delete venue by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockVenue]),
      }),
    });

    const result = await deleteVenuebyIdService(1);
    expect(result).toBe("Venue deleted successfully");
  });

  test("should return 'Venue not found' on failed delete", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await deleteVenuebyIdService(999);
    expect(result).toBe("Venue not found");
  });
});
