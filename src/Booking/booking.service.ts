import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { BookingTable, TIBooking } from "../Drizzle/schema";

//create booking service
export const createBookingService = async (booking: TIBooking) => {
    const inserted = await db.insert(BookingTable).values(booking).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

//get all bookings service with user and event details
export const getAllBookingService = async () => {
    const bookings = await db.query.BookingTable.findMany({
        with: {
            user: true,
            event: true
        }
    });
    if (bookings.length === 0) {
        return "No bookings found";
    }
    return bookings;
};

export const getBookingByIdService = async (bookingId: number) => {
  const booking = await db.query.BookingTable.findFirst({
    where: eq(BookingTable.bookingId, bookingId),
    with: {
      user: true,
      event: true,
    },
  });

  return booking ?? null; // Return null if not found
};

//get booking by userId service
export const getBookingByUserIdService = async (userId: number) => {
  const bookings = await db.query.BookingTable.findMany({
    where: eq(BookingTable.userId, userId),
    with: {
      user: true,
      event: true,
    },
  });

  return bookings.length > 0 ? bookings : null;
};

export const updateBookingByIdService = async (
  bookingId: number,
  booking: { updatedBooking: TIBooking } // or adjust type accordingly
) => {
  console.log("Updating booking with ID:", bookingId, "and data:", booking);

  const { bookingId: _, ...updateData } = booking.updatedBooking;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided to update.");
  }

  await db.update(BookingTable)
    .set(updateData)
    .where(eq(BookingTable.bookingId, bookingId))
    .returning();

  return "Booking updated successfully";
};


//delete booking service by Id
export const deleteBookingbyIdService = async (bookingId: number) => {
    const deleted = await db.delete(BookingTable)
        .where(eq(BookingTable.bookingId, bookingId)).returning();
        if(deleted.length === 0) {
            return "Booking not found";
        }
        return "Booking deleted successfully";
};
