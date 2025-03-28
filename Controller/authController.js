import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createUserSchema } from '../validations/userValidation.js';

const prisma = new PrismaClient();


export const signUp = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
    if (error?.details) return res.status(400).json({ error: true, message: error.details });

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email: value.email } });
        if (existingUser) return res.status(409).json({ error: true, message: "User already exists" });

        // Create user
        const newUser = await prisma.user.create({
            data: {
                full_name: value.full_name,
                email: value.email,
                phone_number: value.phone_number || null,
                interest: value.interest,
            },
        });

        return res.status(201).json({
            error: false,
            message: "User registered successfully",
            data: newUser,
        });

    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
};