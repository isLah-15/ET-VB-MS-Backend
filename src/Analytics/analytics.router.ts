// src/Features/Analytics/Analytics.router.ts
import { Express } from "express";
import { analyticsController } from "./analytics.controller";

const analytics = (app: Express) => {
  // Get total revenue
  app.route('/analytics/revenue').get(
    async (req, res, next) => {
      try {
        await analyticsController.totalRevenue(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  // Get total bookings
  app.route('/analytics/bookings').get(
    async (req, res, next) => {
      try {
        await analyticsController.totalBookings(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  //  Get top 5 most booked events
  app.route('/analytics/events/top').get(
    async (req, res, next) => {
      try {
        await analyticsController.topEvents(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  // Get total users
  app.route('/analytics/users').get(
    async (req, res, next) => {
      try {
        await analyticsController.totalUsers(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  // Get booking status stats
  app.route('/analytics/booking-status').get(
    async (req, res, next) => {
      try {
        await analyticsController.bookingStatus(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  // Get payment method stats
  app.route('/analytics/payment-methods').get(
    async (req, res, next) => {
      try {
        await analyticsController.paymentMethods(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default analytics;
