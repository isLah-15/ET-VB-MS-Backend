
import db from "../Drizzle/db";
import { BookingTable, EventTable, PaymentTable, UserTable } from "../Drizzle/schema";
import { sql } from "drizzle-orm";

// 1. Total Revenue
export const getTotalRevenue = async () => {
  const result = await db.select({ total: sql<number>`SUM(${PaymentTable.amount})` }).from(PaymentTable).where(sql`${PaymentTable.paymentStatus} = 'completed'`);
  return result[0]?.total || 0;
};

// 2. Total Bookings
export const getTotalBookings = async () => {
  const result = await db.select({ total: sql<number>`COUNT(*)` }).from(BookingTable);
  return result[0]?.total || 0;
};

// 3. Top 5 Events by Tickets Sold
export const getTopEvents = async () => {
  return await db.select({
    eventId: EventTable.eventId,
    eventName: EventTable.eventName,
    ticketsSold: EventTable.ticketsSold
  })
  .from(EventTable)
  .orderBy(sql`${EventTable.ticketsSold} DESC`)
  .limit(5);
};

// 4. Total Users Registered
export const getTotalUsers = async () => {
  const result = await db.select({ total: sql<number>`COUNT(*)` }).from(UserTable);
  return result[0]?.total || 0;
};

// 5. Booking Status Distribution
export const getBookingStatusStats = async () => {
  return await db.select({
    status: BookingTable.bookingStatus,
    count: sql<number>`COUNT(*)`
  }).from(BookingTable).groupBy(BookingTable.bookingStatus);
};

// 6. Payment Method Breakdown
export const getPaymentMethodStats = async () => {
  return await db.select({
    method: PaymentTable.paymentMethod,
    count: sql<number>`COUNT(*)`
  }).from(PaymentTable).groupBy(PaymentTable.paymentMethod);
};
