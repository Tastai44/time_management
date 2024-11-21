import { IAddUser } from "../interfaces/User";
import prisma from "../lib/db";
// import bcrypt from 'bcrypt';

export const getUserById = async () => {
    const userWithProjects = await prisma.user.findUnique({
        where: { id: "cm3r00rmq000056tl5kwgllct" },
        include: { projects: true },
    });
    return userWithProjects;
};

export const addUser = async (userData: IAddUser) => {
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
        },
    });
    return newUser;
};

export const checkUser = async (email: string, password: string) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // If user exists and passwords match
    // if (user && await bcrypt.compare(password, user.password)) {
    //     return user;
    // }
    if (user && user.password === password) {
        return user;
    }

    // If user doesn't exist or password doesn't match
    return null;
};
