import { Express } from "express";
import { createBookingController, deleteBookingbyIdController, getAllBookingsByIdController, getAllBookingsController, getBookingByUserIdController, updateBookingbyIdController } from "./booking.controller";

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
    app.route('/bookings').get(
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
    app.route('/booking/:bookingId').get(
        // bothRoleAuth,
        async(req, res, next) => {
            try {
                await getAllBookingsByIdController(req, res)
            } catch (error) {
                next(error)
                
            }
        }
    )

    // get booking by user id
    app.route('/booking/user/:userId').get(
        async(req, res, next) => {
            try {
                await getBookingByUserIdController(req, res)
            } catch (error) {
                next(error)

            }
        }
    )

    // update booking by id
    app.route('/booking/:bookingId').put(
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
    app.route('/booking/:bookingId').delete(
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
