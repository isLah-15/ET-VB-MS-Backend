import { Express } from "express";
import { createEventController, deleteEventController, getAllEventsController, getEventByIdController, updateEventByIdController } from "./event.controller";


const event = (app: Express) => {
    // Create a new event
    app.route('/event').post(
        async (req, res, next) => {
            try {
                await createEventController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get all events
    app.route('/event').get(
        async (req, res, next) => {
            try {
                await getAllEventsController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get all events
    app.route('/event').get(
        async (req, res, next) => {
            try {
                await getAllEventsController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Get event by ID
    app.route('/event/:id').get(
        async (req, res, next) => {
            try {
                await getEventByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Update event by ID
    app.route('/event/:id').put(
        async (req, res, next) => {
            try {
                await updateEventByIdController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );

    // Delete event by ID
    app.route('/event/:id').delete(
        async (req, res, next) => {
            try {
                await deleteEventController(req, res);
            } catch (error) {
                next(error);
            }
        }
    );
};

export default event;
