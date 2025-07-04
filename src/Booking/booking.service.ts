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

//get booking by id service with user and event details
export const getBookingByIdService = async (bookingId: number) => {
    const booking = await db.query.BookingTable.findFirst({
        where: eq(BookingTable.bookingId, bookingId),
        with: {
            user: true,
            event: true
        }
    });

    if (!booking) {
        return "Booking not found";
    }

    return booking;
};

//update booking by Id service
export const updateBookingByIdService = async (bookingId: number, booking: TIBooking) => {
    await db.update(BookingTable)
        .set(booking)
        .where(eq(BookingTable.bookingId, bookingId)).returning();
    return "Booking updated successfully";
};

//delete booking service
export const deleteBookingService = async (bookingId: number) => {
    const deleted = await db.delete(BookingTable)
        .where(eq(BookingTable.bookingId, bookingId)).returning();
        if(deleted.length === 0) {
            return "Booking not found";
        }
        return "Booking deleted successfully";
};
