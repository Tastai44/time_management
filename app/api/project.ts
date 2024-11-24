import axios from "axios";
import { IAddProject, IProject } from "../interfaces/Project";

export const postProject = async (project: IAddProject) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            groupName: project.groupName,
            projectName: project.projectName,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status,
            ownerId: project.ownerId
        });
        console.log("Crate successful:", response.data);
    } catch (error) {
        console.error("Failed to login:", error);
        throw error; // rethrow error for further handling if needed
    }
};

export const getProjectByUserId = async (userId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${userId}`);
        return response.data as IProject[];
    } catch (error) {
        console.error("Failed to login:", error);
        throw error; // rethrow error for further handling if needed
    }
};