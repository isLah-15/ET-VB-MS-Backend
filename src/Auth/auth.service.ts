
import { sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIUser, UserTable } from "../Drizzle/schema";

// create a new user
export const createUserService = async (user: TIUser) => {
    await db.insert(UserTable).values(user);
    return "User created successfully";
}

// get users by email
export const getUserByEmailService = async (email: string) => {
    return await db.query.UserTable.findFirst({
        where: sql`${UserTable.email} = ${email}`
    });
}

// verify user by email
export const verifyUserService = async (email: string) => {
    await db.update(UserTable)
        .set({ verificationCode: null, isVerified: true })
        .where(sql`${UserTable.email} = ${email}`);
};

//login a user
export const loginUserService = async (user: Partial<TIUser>) => {
    // email and password are used to find the user
    const {email} = user;

    return await db.query.UserTable.findFirst({
        columns: {
            userId: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true,
            isVerified: true,
        },
            where: sql`${UserTable.email} = ${email}`
        });
}

// get all users
export const getAllUsersService = async () => {
    const users = await db.query.UserTable.findMany({
        columns: {
            userId: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true,
            
        }
    });
    return users;
};  

// get user by Id
export const getUserByIdService = async (userId: number) => {
    const user = await db.query.UserTable.findFirst({
        where: sql`${UserTable.userId} = ${userId}`,
    });
    return user;
};

// update a user by Id by role either user or admin
export const updateUserbyIdService = async (userId: number, user: TIUser) => {
    console.log("Updating user with ID:", userId);
    const updatedUser = await db.update(UserTable)
        .set(user)
        .where(sql`${UserTable.userId} = ${userId}`)
        .returning();

    console.log("Updated User:", updatedUser);
    return updatedUser[0];
};

// delete a user by Id
export const deleteUserbyIdService = async (userId: string) => {
    const deletedUser = await db.delete(UserTable)
        .where(sql`${UserTable.userId} = ${userId}`);
    return deletedUser;
};

