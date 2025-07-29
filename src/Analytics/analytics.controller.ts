
import { Request, Response } from "express";
import {
  getTotalRevenue,
  getTotalBookings,
  getTopEvents,
  getTotalUsers,
  getBookingStatusStats,
  getPaymentMethodStats
} from "./analytics.service";

export const analyticsController = {
  totalRevenue: async (_: Request, res: Response) => {
    const total = await getTotalRevenue();
    return res.status(200).json({ totalRevenue: total });
  },

  totalBookings: async (_: Request, res: Response) => {
    const total = await getTotalBookings();
    return res.status(200).json({ totalBookings: total });
  },

  topEvents: async (_: Request, res: Response) => {
    const events = await getTopEvents();
    return res.status(200).json({ topEvents: events });
  },

  totalUsers: async (_: Request, res: Response) => {
    const total = await getTotalUsers();
    return res.status(200).json({ totalUsers: total });
  },

  bookingStatus: async (_: Request, res: Response) => {
    const stats = await getBookingStatusStats();
    return res.status(200).json({ bookingStatusDistribution: stats });
  },

  paymentMethods: async (_: Request, res: Response) => {
    const stats = await getPaymentMethodStats();
    return res.status(200).json({ paymentMethodStats: stats });
  }
};
