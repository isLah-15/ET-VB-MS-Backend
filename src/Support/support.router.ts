import { Express } from "express";
import { createCustomerSupportController, deleteCustomerSupportController, getAllCustomerSupportController, getCustomerSupportByIdController, updateCustomerSupportByIdController } from "./support.controller";

const support = (app: Express) => {
    // Create a new customer support ticket
    app.route('/support').post(
        async (req, res, next) => {
            try {
                await createCustomerSupportController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get all customer support tickets
    app.route('/support').get(
        async (req, res, next) => {
            try {
                await getAllCustomerSupportController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get customer support ticket by ID
    app.route('/support/:id').get(
        async (req, res, next) => {
            try {
                await getCustomerSupportByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Update customer support ticket by ID
    app.route('/support/:id').put(
        async (req, res, next) => {
            try {
                await updateCustomerSupportByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Delete customer support ticket by ID
    app.route('/support/:id').delete(
        async (req, res, next) => {
            try {
                await deleteCustomerSupportController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );
};

export default support;