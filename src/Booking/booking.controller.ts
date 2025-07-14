import { Request, Response } from "express";
import { createBookingService, deleteBookingbyIdService, getAllBookingService, getBookingByIdService, updateBookingByIdService,  } from "./booking.service";


// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    console.log("Received Booking:", booking);

    const newBooking = await createBookingService(booking);

    console.log("Inserted Booking:", newBooking);
    if (newBooking && newBooking.length > 0) {
      return res.status(201).json({
        message: "Booking created successfully",
        newBooking: newBooking[0], // Return only the first object
      });
    } else {
      return res.status(400).json({ message: "Failed to create booking" });
    }
  } catch (error: any) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get all bookings
export const getAllBookingsController = async ( req: Request, res: Response) => {
  try {
    const bookings = await getAllBookingService();

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json({ message: "Bookings retrieved successfully", bookings });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get booking by ID
export const getAllBookingsByIdController = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    console.log("uuuuuuuuuuuuu ", req.params.bookingId)
    if (isNaN(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const booking = await getBookingByIdService(bookingId);

    console.log("23456787654 ", booking)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ booking });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update booking by ID
export const updateBookingbyIdController = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    if (isNaN(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = req.body;
    console.log("Booking to update:", booking);

    //Check if the booking exists
    const existingBooking = await getBookingByIdService(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking
    const updatedBooking = await updateBookingByIdService(bookingId, booking);
    if (updatedBooking) {
      return res.status(200).json({ message: "Booking updated successfully", updatedBooking });
    } else {
      return res.status(400).json({ message: "Failed to update booking" });
    }
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete booking by ID
export const deleteBookingbyIdController = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    if (isNaN(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const existingBooking = await getBookingByIdService(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const deleted = await deleteBookingbyIdService(bookingId);
    if (deleted == "Booking not found") {
      return res.status(404).json({ message: "Booking not found" });
      
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    console.error("DELETE BOOKING ERROR:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};