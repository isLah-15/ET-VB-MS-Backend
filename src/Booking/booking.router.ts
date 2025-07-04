import { Express } from "express";
import { createBookingController, deleteBookingbyIdController, getAllBookingsByIdController, getAllBookingsController, updateBookingbyIdController } from "./booking.controller";

const booking = (app:Express) => {
    app.route('/booking').post(
        async(req, res, next) => {
            try {
                await createBookingController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )


    // get all bookings
    app.route('/booking').get(
        // adminRoleAuth,
        async (req, res, next) => {
            try {
                await getAllBookingsController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )

    // get booking by id
    app.route('/booking/:id').get(
        // bothRoleAuth,
        async(req, res, next) => {
            try {
                await getAllBookingsByIdController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )




    // update booking by id
    app.route('/booking/:id').put(
        // bothRoleAuth,
        async(req, res, next) => {
            try {
                await updateBookingbyIdController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )

    // delete booking by id
    app.route('/booking/:id').delete(
        // bothRoleAuth,
        async(req, res, next) => {
            try {
                await deleteBookingbyIdController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )
}

export default booking
