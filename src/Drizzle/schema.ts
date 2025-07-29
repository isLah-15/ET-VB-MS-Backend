import { integer } from 'drizzle-orm/pg-core';
import { time } from 'drizzle-orm/pg-core';
import { date } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

// User Table
export const UserTable = pgTable('users', {
    userId: serial('user_id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    contactPhone: integer('contact_phone').notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    verificationCode: varchar("verification_code"),
    role: text('role', { enum: ['admin', 'user'] }).default('user').notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
    isVerified: boolean('is_verified').default(false).notNull(),
});

// Booking Table
export const BookingTable = pgTable('bookings', {
    bookingId: serial('booking_id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => UserTable.userId, { onDelete: 'cascade' }),
    eventId: integer('event_id')
        .notNull()
        .references(() => EventTable.eventId, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    totalAmount: integer('total_amount').notNull(),
    bookingStatus: text('booking_status', { enum: ['pending', 'confirmed', 'cancelled'] }).notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});

// Payment Table
export const PaymentTable = pgTable('payments', {
    paymentId: serial('payment_id').primaryKey(),
    bookingId: integer('booking_id')
        .notNull()
        .references(() => BookingTable.bookingId, { onDelete: 'cascade' }),
    userId: integer('user_id')
        .notNull()
        .references(() => UserTable.userId, { onDelete: 'cascade' }),
    transactionId: integer('transaction_id').notNull(),
    amount: integer('amount').notNull(),
    paymentStatus: text('payment_status', { enum: ['pending', 'completed', 'failed'] }).notNull(),
    paymentMethod: text('payment_method', { enum: ['credit_card', 'paypal', 'm_pesa'] }).notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});

// Customer Support Table
export const CustomerSupportTable = pgTable('customer_support', {
    ticketId: serial('ticket_id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => UserTable.userId, { onDelete: 'cascade' }),
    subject: text('subject').notNull(),
    description: text('description').notNull(),
    status: text('status', { enum: ['open', 'in_progress', 'resolved'] }).notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});

// Venue Table
export const VenueTable = pgTable('venues', {
    venueId: serial('venue_id').primaryKey(),
    venueName: text('venue_name').notNull(),
    address: integer('address').notNull(),
    capacity: integer('capacity').notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});

// Event Table
export const EventTable = pgTable('events', {
    eventId: serial('event_id').primaryKey(),
    
    eventName: text('event_name').notNull(),
    venueId: integer('venue_id')
        .notNull()
        .references(() => VenueTable.venueId, { onDelete: 'cascade' }),
    category: text('category').notNull(),
    eventDate: date('event_date').notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    description: text('description').notNull(),
    ticketPrice: integer('ticket_price').notNull(),
    ticketsTotal: integer('tickets_total').notNull(),
    ticketsAvailable: integer('tickets_available').notNull(),
    imageUrl: varchar('image_url', { length: 255 }).notNull(),
    ticketsSold: integer('tickets_sold').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});

//Relationships

//UserTable Relationships - 1 User can have many Bookings, Payments, and Customer Support Tickets
export const UserRelationships = relations(UserTable, ({ many }) => ({
    bookings: many(BookingTable),
    payments: many(PaymentTable),
    customerSupportTickets: many(CustomerSupportTable),
}));

//BookingTable Relationships - 1 Booking belongs to 1 User and 1 Event
export const BookingRelationships = relations(BookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [BookingTable.userId],
    references: [UserTable.userId],
  }),
  event: one(EventTable, {
    fields: [BookingTable.eventId],
    references: [EventTable.eventId],
  }),
}));

//PaymentTable Relationships - 1 Payment belongs to 1 Booking and 1 User
export const PaymentRelationships = relations(PaymentTable, ({ one }) => ({
  booking: one(BookingTable, {
    fields: [PaymentTable.bookingId],
    references: [BookingTable.bookingId],
  }),
  user: one(UserTable, {
    fields: [PaymentTable.userId],
    references: [UserTable.userId],
  }),
}));

//CustomerSupportTable Relationships - 1 Ticket belongs to 1 User
export const CustomerSupportRelationships = relations(CustomerSupportTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [CustomerSupportTable.userId],
    references: [UserTable.userId],
  }),
}));


//EventTable Relationships - 1 Event belongs to 1 Venue and can have many Bookings
export const EventRelationships = relations(EventTable, ({ one, many }) => ({
  venue: one(VenueTable, {
    fields: [EventTable.venueId],
    references: [VenueTable.venueId],
  }),
  bookings: many(BookingTable),
}));

// types for the tables
export type TIUser = typeof UserTable.$inferInsert;
export type TSUser = typeof UserTable.$inferSelect;

export type TIBooking = typeof BookingTable.$inferInsert;
export type TSBooking = typeof BookingTable.$inferSelect;

export type TIPayment = typeof PaymentTable.$inferInsert;
export type TSPayment = typeof PaymentTable.$inferSelect;

export type TICustomerSupport = typeof CustomerSupportTable.$inferInsert;
export type TSCustomerSupport = typeof CustomerSupportTable.$inferSelect;

export type TIVenue = typeof VenueTable.$inferInsert;
export type TSVenue = typeof VenueTable.$inferSelect;

export type TIEvent = typeof EventTable.$inferInsert
export type TSEvent = typeof EventTable.$inferSelect;
