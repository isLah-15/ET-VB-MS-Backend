
import {
  createUserService,
  deleteUserbyIdService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
  loginUserService,
  updateUserbyIdService,
  verifyUserService,
} from "../../src/Auth/auth.service";
import db from "../../src/Drizzle/db";

// Mock the database module
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      UserTable: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
    },
  },
}));

const mockUser = {
  userId: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "hashedpassword123",
  contactPhone: 123456789,
  address: "123 Street",
  verificationCode: "ABC123",
  role: "user" as "user",
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Auth Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a user", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockResolvedValue(undefined),
    });

    const res = await createUserService(mockUser as any);
    expect(res).toBe("User created successfully");
    expect(db.insert).toHaveBeenCalled();
  });

  test("should get user by email", async () => {
    (db.query.UserTable.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const user = await getUserByEmailService(mockUser.email);
    expect(user).toEqual(mockUser);
    expect(db.query.UserTable.findFirst).toHaveBeenCalled();
  });

  test("should verify user by email", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      }),
    });

    await verifyUserService(mockUser.email);
    expect(db.update).toHaveBeenCalled();
  });

  test("should login a user", async () => {
    (db.query.UserTable.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const user = await loginUserService({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(user).toEqual(mockUser);
    expect(db.query.UserTable.findFirst).toHaveBeenCalled();
  });

  test("should get all users", async () => {
    (db.query.UserTable.findMany as jest.Mock).mockResolvedValue([mockUser]);

    const users = await getAllUsersService();
    expect(users).toEqual([mockUser]);
    expect(db.query.UserTable.findMany).toHaveBeenCalled();
  });

  test("should get user by ID", async () => {
    (db.query.UserTable.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const user = await getUserByIdService(1);
    expect(user).toEqual(mockUser);
    expect(db.query.UserTable.findFirst).toHaveBeenCalled();
  });

  test("should update a user by ID", async () => {
    const updatedMock = { 
      ...mockUser, 
      firstName: "Jane", 
      role: mockUser.role as "user",
      createdAt: mockUser.createdAt.toISOString(),
      updatedAt: mockUser.updatedAt.toISOString(),
    };

    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([updatedMock]),
        }),
      }),
    });

    const updated = await updateUserbyIdService(1, updatedMock);
    expect(updated.firstName).toBe("Jane");
    expect(db.update).toHaveBeenCalled();
  });

  test("should delete a user by ID", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockResolvedValue(undefined),
    });

    const deleted = await deleteUserbyIdService("1");
    expect(deleted).toBeUndefined();
    expect(db.delete).toHaveBeenCalled();
  });
});
