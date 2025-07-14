import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentByIdService,
  deletePaymentService,
} from "../../src/Payment/payment.service";

import db from "../../src/Drizzle/db";

// Mock the db module
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      PaymentTable: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
  },
}));

// Sample payment with user and booking relation
const mockPayment = {
  paymentId: 1,
  bookingId: 1,
  userId: 1,
  transactionId: 10001,
  amount: 4000,
  paymentStatus: "completed",
  paymentMethod: "m_pesa",
  user: {
    userId: 1,
    firstName: "Alex",
    lastName: "Okindo",
  },
  booking: {
    bookingId: 1,
    eventId: 1,
    quantity: 2,
    totalAmount: 4000,
  },
};

describe("Payment Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new payment", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockPayment]),
      }),
    });

    const result = await createPaymentService(mockPayment as any);
    expect(result).toEqual([mockPayment]);
    expect(db.insert).toHaveBeenCalled();
  });

  test("should return all payments with user and booking", async () => {
    (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValue([mockPayment]);

    const result = await getAllPaymentsService();
    expect(result).toEqual([mockPayment]);
    expect(db.query.PaymentTable.findMany).toHaveBeenCalled();
  });

  test("should return 'No payments found' when empty", async () => {
    (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getAllPaymentsService();
    expect(result).toBe("No payments found");
  });

  test("should return payment by ID with user and booking", async () => {
    (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValue(mockPayment);

    const result = await getPaymentByIdService(1);
    expect(result).toEqual(mockPayment);
  });

  // test("should return 'Payment not found' if ID doesn't exist", async () => {
  //   (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValue(undefined);

  //   const result = await getPaymentByIdService(999);
  //   expect(result).toBe("Payment not found");
  // });

  test("should update payment by ID", async () => {
  (db.update as jest.Mock).mockReturnValue({
    set: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockPayment]),
      }),
    }),
  });

  const result = await updatePaymentByIdService(1, mockPayment as any);
  expect(result).toEqual(mockPayment); // ✅ match returned object
  expect(db.update).toHaveBeenCalled();
});


  test("should delete a payment by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockPayment]),
      }),
    });

    const result = await deletePaymentService(1);
    expect(result).toBe("Payment deleted successfully");
  });

  test("should return 'Payment not found' on failed delete", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await deletePaymentService(999);
    expect(result).toBe("Payment not found");
  });
});
