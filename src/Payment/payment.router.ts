import { Express } from "express";
import { createPaymentController, deletePaymentController, getAllPaymentsController, getPaymentByIdController, updatePaymentByIdController } from "./payment.controller";

const payment = (app: Express) => {
    // Create a new payment
    app.route('/payment').post(
        async (req, res, next) => {
            try {
                await createPaymentController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get all payments
    app.route('/payments').get(
        async (req, res, next) => {
            try {
                await getAllPaymentsController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get payment by ID
    app.route('/payment/:paymentId').get(
        async (req, res, next) => {
            try {
                await getPaymentByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Update payment by ID
    app.route('/payment/:paymentId').put(
        async (req, res, next) => {
            try {
                await updatePaymentByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Delete payment by ID
    app.route('/payment/:paymentId').delete(
        async (req, res, next) => {
            try {
                await deletePaymentController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );
};

export default payment;
