import db from "../Drizzle/db";
import { TIVenue, VenueTable } from "../Drizzle/schema";
import { eq } from "drizzle-orm";


// Create a new venue
export const createVenueService = async (venue: TIVenue) => {
    const inserted = await db.insert(VenueTable).values(venue).returning();
    if (inserted) {
        return inserted;
    } 
    return null;
};

// Get all venues
export const getAllVenuesService = async () => {
    const venues = await db.query.VenueTable.findMany();
    if (venues.length === 0) {
        return "No venues found";
    }
    return venues;
};

// Get venue by ID
export const getVenueByIdService = async (venueId: number) => {
    const venue = await db.query.VenueTable.findFirst({
        where: eq(VenueTable.venueId, venueId),
    });
    if (!venue) {
        return "Venue not found";
    }
    return venue;
};

// Update venue by ID
export const updateVenueByIdService = async (venueId: number, venue: any) => {
    await db.update(VenueTable)
        .set(venue)
        .where(eq(VenueTable.venueId, venueId)).returning();
    return "Venue updated successfully";
};

// Delete venue by ID
export const deleteVenueService = async (venueId: number) => {
    const deleted = await db.delete(VenueTable)
        .where(eq(VenueTable.venueId, venueId)).returning();
    if (deleted.length === 0) {
        return "Venue not found";
    }
    return "Venue deleted successfully";
};
