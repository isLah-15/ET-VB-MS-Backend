import { Request, Response } from "express";
import { createCustomerSupportService, deleteCustomerSupportService, getAllCustomerSupportService, getCustomerSupportByIdService, updateCustomerSupportByIdService } from "./support.service";

// Create a new customer support ticket
export const createCustomerSupportController = async (req: Request, res: Response) => {
    try {
        const ticket = req.body;
        console.log(ticket);

        const newTicket = await createCustomerSupportService(ticket);

        console.log(newTicket);
        if (newTicket) {
            return res.status(201).json({ message: "Customer support ticket created successfully", newTicket });
        } else {
            return res.status(400).json({ message: "Failed to create customer support ticket" });
        }
    } catch (error: any) {
        console.error("CREATE CUSTOMER SUPPORT TICKET ERROR:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all customer support tickets
export const getAllCustomerSupportController = async (req: Request, res: Response) => {
    try {
        const tickets = await getAllCustomerSupportService();
        
        if (tickets.length === 0) {
            return res.status(404).json({ message: "No customer support tickets found" });
        }
        return res.status(200).json({ message: "Customer support tickets retrieved successfully", tickets });
    } catch (error: any) {
        console.error("GET ALL CUSTOMER SUPPORT TICKETS ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get customer support ticket by ID
export const getCustomerSupportByIdController = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        if (isNaN(ticketId)) {
            return res.status(400).json({ message: "Invalid ticket ID" });
        }
        const ticket = await getCustomerSupportByIdService(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: "Customer support ticket not found" });
        }
        return res.status(200).json({ message: "Customer support ticket retrieved successfully", ticket });
    } catch (error: any) {
        console.error("GET CUSTOMER SUPPORT TICKET BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update customer support ticket by ID
export const updateCustomerSupportByIdController = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        if (isNaN(ticketId)) {
            return res.status(400).json({ message: "Invalid ticket ID" });
        }

        const ticket = req.body;
        console.log("Ticket to update:", ticket);
        
        //check if ticket exists
        const existingTicket = await getCustomerSupportByIdService(ticketId);
        if (!existingTicket) {
            return res.status(404).json({ message: "Customer support ticket not found" });
        }

        //update the ticket
        const updatedTicket = await updateCustomerSupportByIdService(ticketId, ticket);
        if (updatedTicket) {
            return res.status(200).json({ message: "Customer support ticket updated successfully", updatedTicket });
        } else {
            return res.status(400).json({ message: "Failed to update customer support ticket" });
        }
    } catch (error: any) {
        console.error("UPDATE CUSTOMER SUPPORT TICKET BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete customer support ticket by ID
export const deleteCustomerSupportController = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.id);
        if (isNaN(ticketId)) {
            return res.status(400).json({ message: "Invalid ticket ID" });
        }

        const existingTicket = await getCustomerSupportByIdService(ticketId);
        if (!existingTicket) {
            return res.status(404).json({ message: "Customer support ticket not found" });
        }

        const deleted = await deleteCustomerSupportService(ticketId);
        if (deleted == "Customer support ticket not found") {
            res.status(404).json({ message: "Customer support ticket not found" });
            return;
        }
        return res.status(200).json({ message: "Customer support ticket deleted successfully" });
    } catch (error: any) {
        console.error("DELETE CUSTOMER SUPPORT TICKET BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};