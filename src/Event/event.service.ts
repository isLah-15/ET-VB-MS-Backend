import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { EventTable, TIEvent } from "../Drizzle/schema";


// Create a new event
export const createEventService = async (event: TIEvent) => {
    const inserted = await db.insert(EventTable).values(event).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};

// Get all events with venue details
export const getAllEventsService = async () => {
    const events = await db.query.EventTable.findMany({
        with: {
            venue: true,
        },
    });
    if (events.length === 0) {
        return "No events found";
    }
    return events;
};

// Get event by ID with venue details
export const getEventByIdService = async (eventId: number) => {
    const event = await db.query.EventTable.findFirst({
        where: eq(EventTable.eventId, eventId),
        with: {
            venue: true,
        },
    });
    if (!event) {
        return "Event not found";
    }
    return event;
};

// Update event by ID
export const updateEventByIdService = async (eventId: number, event: TIEvent) => {
    await db.update(EventTable)
        .set(event)
        .where(eq(EventTable.eventId, eventId)).returning();
    return "Event updated successfully";
};

// Delete event by ID
export const deleteEventService = async (eventId: number) => {
    const deleted = await db.delete(EventTable)
        .where(eq(EventTable.eventId, eventId)).returning();
    if (deleted.length === 0) {
        return "Event not found";
    }
    return "Event deleted successfully";
};

