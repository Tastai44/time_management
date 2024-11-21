import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

async function addProject() {
    try {
        const project = await prisma.project.create({
            data: {
                groupName: "Development Team A",
                projectName: "E-Commerce Platform",
                description: "Building a scalable e-commerce platform.",
                startDate: new Date("2024-01-01"),
                endDate: new Date("2024-06-30"),
                status: "In Progress",
                ownerId: "cm3r00rmq000056tl5kwgllct", // Replace with the ID of an existing user in your database
            },
        });
        console.log("Project added:", project);
    } catch (error) {
        console.error("Error adding project:", error);
    } finally {
        await prisma.$disconnect();
    }
}

addProject();
