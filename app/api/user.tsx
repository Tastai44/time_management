import prisma from "../lib/db";

export const getUserById = async () => {
    const userWithProjects = await prisma.user.findUnique({
        where: { id: "cm3r00rmq000056tl5kwgllct" },
        include: { projects: true },
    });
    return userWithProjects;
};