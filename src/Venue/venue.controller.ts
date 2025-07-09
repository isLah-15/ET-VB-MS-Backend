import { Request, Response } from "express";
import { createVenueService, deleteVenuebyIdService, getAllVenuesService, getVenueByIdService, updateVenueByIdService } from "./venue.service";

// Create a new venue
export const createVenueController = async (req: Request, res: Response) => {
  try {
    const venue = req.body;
    console.log(venue);

    const newVenue = await createVenueService(venue);
    console.log("New Venue Created:", newVenue);
    if (newVenue) {
      return res.status(201).json({ message: "Venue created successfully", newVenue });
    }
    return res.status(500).json({ message: "Failed to create venue" });
  } catch (error) {
    console.error("Error creating venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all venues
export const getAllVenuesController = async (req: Request, res: Response) => {
  try {
    const venues = await getAllVenuesService();

    if (venues.length === 0) {
      return res.status(404).json({ message: "No venues found" });
    }
    return res.status(200).json({ message: "Venues retrieved successfully", venues });
  } catch (error) {
    console.error("Error retrieving venues:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get venue by ID
export const getVenueByIdController = async (req: Request, res: Response) => {
  try {
    const venueId = parseInt(req.params.id);
    if (isNaN(venueId)) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }
    const venue = await getVenueByIdService(venueId);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json({ message: "Venue retrieved successfully", venue });
  } catch (error) {
    console.error("Error retrieving venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update venue by ID
export const updateVenueByIdController = async (req: Request, res: Response) => {
  try {
    const venueId = parseInt(req.params.venueId);
    if (isNaN(venueId)) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }
    const venueData = req.body;
    console.log("Updating venue with ID:", venueId);

    //check if venue exists
    const existingVenue = await getVenueByIdService(venueId);
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }   

    const updatedVenue = await updateVenueByIdService(venueId, venueData);
    if (updatedVenue) {
      return res.status(200).json({ message: "Venue updated successfully", updatedVenue });
    } else {
        return res.status(400).json({ message: "Failed to update venue" });
    }
    } catch (error: any) {
    console.error("Error updating venue:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete venue by ID
export const deleteVenuebyIdController = async (req: Request, res: Response) => {
  try {
    const venueId = parseInt(req.params.venueId);
    if (isNaN(venueId)) {
      return res.status(400).json({ message: "Invalid venue ID" });
    }

    const existingVenue = await getVenueByIdService(venueId);
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const deleted = await deleteVenuebyIdService(venueId);
    if (deleted === "Venue not found") {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting venue:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
