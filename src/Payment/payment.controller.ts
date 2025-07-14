import { Request, Response } from "express";
import { createPaymentService, deletePaymentService, getAllPaymentsService, getPaymentByIdService, updatePaymentByIdService } from "./payment.service";

//Create a new payment
export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const payment = req.body;
        console.log(payment);

        const newPayment = await createPaymentService(payment);

        console.log(newPayment);
        if (newPayment) {
            return res.status(201).json({ message: "Payment created successfully", newPayment });
        } else {
            return res.status(400).json({ message: "Failed to create payment" });
        }
    } catch (error: any) {
        console.error("CREATE PAYMENT ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Get all payments
export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();
    console.log(payments);

    return res.status(200).json({ message: "Payments retrieved successfully", payments }); // Always return 200
  } catch (error: any) {
    console.error("GET ALL PAYMENTS ERROR:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Get payment by ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.paymentId);
        console.log("Payment ID:", paymentId);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const payment = await getPaymentByIdService(paymentId);
        console.log("Payment:", payment);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ message: "Payment retrieved successfully", payment });
    } catch (error: any) {
        console.error("GET PAYMENT BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update payment by ID
export const updatePaymentByIdController = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.paymentId);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const payment = req.body;
        console.log("Payment to update:", payment);

        // Check if the payment exists
        const existingPayment = await getPaymentByIdService(paymentId);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Update the payment
        const updatedPayment = await updatePaymentByIdService(paymentId, payment);
        if (updatedPayment) {
            return res.status(200).json({ message: "Payment updated successfully", updatedPayment });
        } else {
            return res.status(400).json({ message: "Failed to update payment" });
        }
    } catch (error: any) {
        console.error("UPDATE PAYMENT BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Delete payment by ID
export const deletePaymentController = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.paymentId);
        if (isNaN(paymentId)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const existingPayment = await getPaymentByIdService(paymentId);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        const deletedPayment = await deletePaymentService(paymentId);
        if (deletedPayment) {
            return res.status(200).json({ message: "Payment deleted successfully", deletedPayment });
        } else {
            return res.status(400).json({ message: "Failed to delete payment" });
        }
    } catch (error: any) {
        console.error("DELETE PAYMENT BY ID ERROR:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
