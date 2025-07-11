// api
import { Request, Response } from "express";
import { createUserService, deleteUserbyIdService, getAllUsersService, getUserByEmailService, getUserByIdService, loginUserService, updateUserbyIdService, verifyUserService } from "./auth.service";
import bcrypt from "bcryptjs"
import { sendEmail } from "../Utils/mailer";
import "dotenv/config"
import jwt from "jsonwebtoken"


// create a user controller
export const createUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const password = user.password;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        user.password = hashedPassword;

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.isVerified = false;

        const createUser = await createUserService(user);
        if (!createUser) return res.json({ message: "User not created" });

        try {
            await sendEmail(
                user.email,
                "Verify your account",
                `Hello ${user.lastName}, your verification code is: ${verificationCode}`,
                `<div>
                <h2>Hello ${user.lastName},</h2>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>
                <p>Enter this code to verify your account.</p>
                </div>`
            );} catch (emailError) {
            console.error("Failed to send registration email:", emailError);
        }
        return res.status(201).json({ message: "User created. Verification code sent to email." })

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
};


//verify a user controller
export const verifyUserController = async (req: Request, res: Response) => {
    const { email, code } = req.body;
    try {
        const user = await getUserByEmailService(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationCode === code) {
            await verifyUserService(email);

            // Send verification success email
            try {
                await sendEmail(
                    user.email,
                    "Account Verified Successfully",
                    `Hello ${user.lastName}, your account has been verified. You can now log in and use all features.`,
                    `<div>
                    <h2>Hello ${user.lastName},</h2>
                    <p>Your account has been <strong>successfully verified</strong>!</p>
                    <p>You can now log in and enjoy our services.</p>
                    </div>`
                );
            } catch (error: any) {
                console.error("Failed to send verification success email:", error);
            }
            return res.status(200).json({ message: "User verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid verification code" });
        }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
};


//login user controller
export const loginUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // check if the user exist
        const userExist = await loginUserService(user)
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!userExist.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please verify your email." });
        }

        // verify the password - mypassword123 - $2b$10$0cbYaTQm2MzqJiK7FKMzU.2a1w5/6Mu3RuCn8SLEWXQcRIeflRqdG
        const userMatch = await bcrypt.compareSync(user.password, userExist.password)
        if (!userMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // create a payload
        const payload = {
            sub: userExist.userId, // assuming userId is the unique identifier for the user
            user_id: userExist.userId,
            first_name: userExist.firstName,
            last_name: userExist.lastName,
            role: userExist.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }

        // Generate the JWT token
        const secret = process.env.JWT_SECRET as string
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jwt.sign(payload, secret)

        // return the token with user info
        return res.status(200).json({
            message: "Login successfull",
            token,
            user: {
                user_id: userExist.userId,
                first_name: userExist.firstName,
                last_name: userExist.lastName,
                email: userExist.email,
                role: userExist.role
            }
        })
    } catch (error: any) {
        return res.status(500).json({ error: error.message });

    }
};


// get all users
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// get a user by id
export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await getUserByIdService(Number(userId));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// update a user by id either user or admin
export const updateUserbyIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const { body } = req.body;

        const user = await getUserByIdService(userId);
        if (!user) { 
            return res.status(404).json({ message: "User not found" });
        }
        
        // Update the user role
        const updatedUser = await updateUserbyIdService( userId, req.body );
        return res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// delete a user by id
export const deleteUserbyIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await getUserByIdService(Number( userId));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await deleteUserbyIdService(userId);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};