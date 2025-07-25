import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { PaymentTable, TIPayment } from "../Drizzle/schema";


//Create a new payment
export const createPaymentService = async (payment: TIPayment) => {
    const inserted = await db.insert(PaymentTable).values(payment).returning()
        if(inserted) {
            return inserted;
        }
        return null;
};

// Get all payments with user and booking details
export const getAllPaymentsService = async () => {
  const payments = await db.query.PaymentTable.findMany({
    with: {
      user: true,
      booking: true,
    },
  });

  if (payments.length === 0) {
    return "No payments found";
  }

  return payments;
};


//get payment by id with user and event details
export const getPaymentByIdService = async (paymentId: number) => {
    const payment = await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.paymentId, paymentId),
        with: {
            user: true,
            booking: true
        }
    });

    return payment ?? null;
};

// update payment by Id service
export const updatePaymentByIdService = async (paymentId: number, payment: TIPayment) => {
  const updated = await db
    .update(PaymentTable)
    .set({ ...payment, updatedAt: new Date().toISOString() }) // ensure correct type
    .where(eq(PaymentTable.paymentId, paymentId))
    .returning();

  return updated[0]; // return the updated record
};


//delete payment service
export const deletePaymentService = async (paymentId: number) => {
    const deleted = await db.delete(PaymentTable)
        .where(eq(PaymentTable.paymentId, paymentId)).returning();
    if (deleted.length === 0) {
        return "Payment not found";
    }
    return "Payment deleted successfully";
};
