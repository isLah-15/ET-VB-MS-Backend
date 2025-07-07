import { Request, Response } from "express";
import { createEventService, deleteEventService, getAllEventsService, getEventByIdService, updateEventByIdService } from "./event.service";

// Create a new event   
export const createEventController = async (req: Request, res: Response) => {
    try {
        const event = req.body;
        console.log(event);

        const newEvent = await createEventService(event);
        console.log("New Event Created:", newEvent);
        if (newEvent) {
            return res.status(201).json({ message: "Event created successfully", newEvent });
        } else {
            return res.status(500).json({ message: "Failed to create event" });
        }
    } catch (error: any) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all events
export const getAllEventsController = async (req: Request, res: Response) => {
    try {
        const events = await getAllEventsService();
        console.log("Events:", events);
        if (events.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }
        return res.status(200).json({ message: "Events retrieved successfully", events });
    } catch (error: any) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get event by ID
export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        console.log("Event ID:", eventId);
        if (isNaN(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await getEventByIdService(eventId);
        console.log("Event:", event);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({ message: "Event retrieved successfully", event });
    } catch (error: any) {
        console.error("Error fetching event:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update event by ID
export const updateEventByIdController = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        if (isNaN(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = req.body;
        console.log("Event to update:", event);

        // Check if the event exists
        const existingEvent = await getEventByIdService(eventId);
        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Update the event
        const updatedEvent = await updateEventByIdService(eventId, event);
        if (updatedEvent) {
            return res.status(200).json({ message: "Event updated successfully", updatedEvent });
        } else {
            return res.status(400).json({ message: "Failed to update event" });
        }
    } catch (error: any) {
        console.error("Error updating event:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Delete event by ID
export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        if (isNaN(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const existingEvent = await getEventByIdService(eventId);
        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        const deletedEvent = await deleteEventService(eventId);
        if (deletedEvent) {
            return res.status(200).json({ message: "Event deleted successfully", deletedEvent });
        } else {
            return res.status(400).json({ message: "Failed to delete event" });
        }
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
