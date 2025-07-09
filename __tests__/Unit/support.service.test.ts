import {
  createCustomerSupportService,
  getAllCustomerSupportService,
  getCustomerSupportByIdService,
  updateCustomerSupportByIdService,
  deleteCustomerSupportService
} from "../../src/Support/support.service";

import db from "../../src/Drizzle/db";

// Mock the db module
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      CustomerSupportTable: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
  },
}));

// Mock data with relationship (ticket + user)
const mockTicket = {
  ticketId: 1,
  userId: 1,
  subject: "Login Issue",
  description: "I can't log into my account.",
  status: "open",
  user: {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  },
};

describe("Customer Support Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a customer support ticket", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockTicket]),
      }),
    });

    const result = await createCustomerSupportService(mockTicket as any);
    expect(result).toEqual([mockTicket]);
    expect(db.insert).toHaveBeenCalled();
  });

  test("should return all support tickets with user details", async () => {
    (db.query.CustomerSupportTable.findMany as jest.Mock).mockResolvedValue([mockTicket]);

    const result = await getAllCustomerSupportService();
    expect(result).toEqual([mockTicket]);
    expect(db.query.CustomerSupportTable.findMany).toHaveBeenCalled();
  });

  test("should return 'No customer support tickets found' if empty", async () => {
    (db.query.CustomerSupportTable.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getAllCustomerSupportService();
    expect(result).toBe("No customer support tickets found");
  });

  test("should return support ticket by ID with user details", async () => {
    (db.query.CustomerSupportTable.findFirst as jest.Mock).mockResolvedValue(mockTicket);

    const result = await getCustomerSupportByIdService(1);
    expect(result).toEqual(mockTicket);
  });

  test("should return 'Customer support ticket not found' if ticket doesn't exist", async () => {
    (db.query.CustomerSupportTable.findFirst as jest.Mock).mockResolvedValue(undefined);

    const result = await getCustomerSupportByIdService(999);
    expect(result).toBe("Customer support ticket not found");
  });

  test("should update support ticket by ID", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockTicket]),
        }),
      }),
    });

    const result = await updateCustomerSupportByIdService(1, mockTicket as any);
    expect(result).toBe("Customer support ticket updated successfully");
  });

  test("should delete support ticket by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockTicket]),
      }),
    });

    const result = await deleteCustomerSupportService(1);
    expect(result).toBe("Customer support ticket deleted successfully");
  });

  test("should return 'Customer support ticket not found' on failed delete", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await deleteCustomerSupportService(999);
    expect(result).toBe("Customer support ticket not found");
  });
});
