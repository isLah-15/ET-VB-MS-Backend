import {
  createBookingService,
  getAllBookingService,
  getBookingByIdService,
  updateBookingByIdService,
  deleteBookingbyIdService,
} from "../../src/Booking/booking.service";

import db from "../../src/Drizzle/db";

// Mock the db module and its structure
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      BookingTable: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
  },
}));

// Sample mock booking with relationship data
const mockBooking = {
  bookingId: 1,
  userId: 1,
  eventId: 1,
  quantity: 2,
  totalAmount: 1000,
  bookingStatus: "confirmed",
  user: {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
  },
  event: {
    eventId: 1,
    eventName: "Mock Festival",
  },
};

describe("Booking Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new booking", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockBooking]),
      }),
    });

    const result = await createBookingService(mockBooking as any);
    expect(result).toEqual([mockBooking]);
    expect(db.insert).toHaveBeenCalled();
  });

  test("should return all bookings with user and event", async () => {
    (db.query.BookingTable.findMany as jest.Mock).mockResolvedValue([mockBooking]);

    const result = await getAllBookingService();
    expect(result).toEqual([mockBooking]);
    expect(db.query.BookingTable.findMany).toHaveBeenCalled();
  });

  test("should return 'No bookings found' when empty", async () => {
    (db.query.BookingTable.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getAllBookingService();
    expect(result).toBe("No bookings found");
  });

  test("should return booking by ID with user and event", async () => {
    (db.query.BookingTable.findFirst as jest.Mock).mockResolvedValue(mockBooking);

    const result = await getBookingByIdService(1);
    expect(result).toEqual(mockBooking);
    expect(db.query.BookingTable.findFirst).toHaveBeenCalled();
  });

  test("should return 'Booking not found' if ID doesn't exist", async () => {
    (db.query.BookingTable.findFirst as jest.Mock).mockResolvedValue(undefined);

    const result = await getBookingByIdService(999);
    expect(result).toBe("Booking not found");
  });

  test("should update a booking by ID", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockBooking]),
        }),
      }),
    });

    const result = await updateBookingByIdService(1, mockBooking as any);
    expect(result).toBe("Booking updated successfully");
    expect(db.update).toHaveBeenCalled();
  });

  test("should delete a booking by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockBooking]),
      }),
    });

    const result = await deleteBookingbyIdService(1);
    expect(result).toBe("Booking deleted successfully");
    expect(db.delete).toHaveBeenCalled();
  });

  test("should return 'Booking not found' on failed delete", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await deleteBookingbyIdService(999);
    expect(result).toBe("Booking not found");
  });
});
