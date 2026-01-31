import axios from "axios";
import { IAddProject, IProject } from "../interfaces/Project";

const getAuthHeader = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    return { Authorization: `Bearer ${token}` };
};

export const postProject = async (project: IAddProject) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            groupName: project.groupName,
            projectName: project.projectName,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status
        }, {
            headers: getAuthHeader()
        });
        console.log("Create successful:", response.data);
    } catch (error) {
        console.error("Failed to create project:", error);
        throw error;
    }
};

export const updateProject = async (project: IAddProject, projectId: string) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            groupName: project.groupName,
            projectName: project.projectName,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status
        }, {
            headers: getAuthHeader()
        });
        console.log("Update successful:", response.data);
    } catch (error) {
        console.error("Failed to update project:", error);
        throw error;
    }
};

export const getProjectByUserId = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            headers: getAuthHeader()
        });
        return response.data as IProject[];
    } catch (error) {
        console.error("Failed to get projects:", error);
        throw error;
    }
};

export const getProjectById = async (id: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projectsById/${id}`, {
            headers: getAuthHeader()
        });
        return response.data as IProject[];
    } catch (error) {
        console.error("Failed to get project by id:", error);
        throw error;
    }
};

export const deleteProject = async (projectId: string) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            headers: getAuthHeader()
        });
        return response.status;
    } catch (error) {
        console.error("Failed to delete project:", error);
        throw error;
    }
};