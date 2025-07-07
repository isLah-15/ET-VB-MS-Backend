import { Express } from "express";
import { createVenueController, deleteVenuebyIdController, getAllVenuesController, getVenueByIdController, updateVenueByIdController } from "./venue.controller";

const venue = (app: Express) => {
    // Create a new venue
    app.route('/venue').post(
        async (req, res, next) => {
            try {
                await createVenueController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get all venues
    app.route('/venue').get(
        async (req, res, next) => {
            try {
                await getAllVenuesController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get venue by ID
    app.route('/venue/:id').get(
        async (req, res, next) => {
            try {
                await getVenueByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Update venue by ID
    app.route('/venue/:id').put(
        async (req, res, next) => {
            try {
                await updateVenueByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Delete venue by ID
    app.route('/venue/:id').delete(
        async (req, res, next) => {
            try {
                await deleteVenuebyIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );
};

export default venue;
