'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postProject } from "../api/project";
import { IAddProject } from "../interfaces/Project";
import ProtectedRoute from "../components/protectRoute";
import { IUser } from "../interfaces/User";
import * as yup from "yup";

const projectSchema = yup.object().shape({
    groupName: yup.string().required("Task group is required"),
    projectName: yup.string().required("Project name is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().oneOf(["Todo", "Doing"], "Invalid status"),
    startDate: yup
        .date()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .required("Start date is required"),
    endDate: yup
        .date()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .min(yup.ref("startDate"), "End date cannot be earlier than start date")
        .required("End date is required"),
});

const AddProject = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [project, setProject] = useState({
        groupName: "Work",
        projectName: "",
        description: "",
        status: "Todo",
        startDate: new Date().toISOString().split("T")[0], // Default to today
        endDate: new Date().toISOString().split("T")[0],   // Default to today
    });
    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            // Validate project data against the schema
            await projectSchema.validate(project, { abortEarly: false });
            const projectFormat: IAddProject = {
                ...project,
                ownerId: userId,
            };

            await postProject(projectFormat);
            router.push("/home");
            console.log("Project Submitted:", projectFormat);
        } catch (validationError: any) {
            if (validationError.inner) {
                // Convert yup errors to a readable format
                const validationErrors: { [key: string]: string; } = {};
                validationError.inner.forEach((err: any) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error("Unexpected validation error:", validationError);
            }
        }
    };

    return (
        <ProtectedRoute>
            {(user: IUser) => (
                <div className="flex items-center justify-center">
                    <div className="rounded-2xl w-full">
                        <div className="flex justify-between items-center mb-6">
                            <div
                                onClick={() => router.back()}
                                className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-200"
                            >
                                <i className="fa-solid fa-arrow-left text-lg"></i>
                            </div>
                            <div className="text-xl font-bold text-gray-800">Add Project</div>
                            <div />
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Task Group */}
                            <div className="mb-4">
                                <label htmlFor="groupName" className="block text-sm font-medium text-gray-600">
                                    Task Group
                                </label>
                                <select
                                    id="groupName"
                                    name="groupName"
                                    value={project.groupName}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full p-2 border ${errors.groupName ? "border-red-500" : "border-gray-300"
                                        } rounded-xl bg-white outline-none`}
                                >
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.groupName && (
                                    <span className="text-red-500 text-sm">{errors.groupName}</span>
                                )}
                            </div>

                            {/* Project Name */}
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-600">
                                    Project Name
                                </label>
                                <input
                                    id="projectName"
                                    name="projectName"
                                    type="text"
                                    value={project.projectName}
                                    onChange={handleInputChange}
                                    placeholder="Enter project name"
                                    className={`mt-1 block w-full p-2 border ${errors.projectName ? "border-red-500" : "border-gray-300"
                                        } rounded-xl bg-white outline-none`}
                                />
                                {errors.projectName && (
                                    <span className="text-red-500 text-sm">{errors.projectName}</span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={project.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter project description"
                                    className={`mt-1 block w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                        } rounded-xl bg-white outline-none`}
                                    rows={3}
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-sm">{errors.description}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="taskGroup" className="block text-sm font-medium text-gray-600">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={project.status}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 rounded-xl border border-gray-300 
                                bg-white outline-none"
                                >
                                    <option value="Todo">Todo</option>
                                    <option value="Doing">Doing</option>
                                </select>
                            </div>

                            {/* Start Date */}
                            <div className="mb-4">
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
                                    Start Date
                                </label>
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={project.startDate}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full p-2 border ${errors.startDate ? "border-red-500" : "border-gray-300"
                                        } rounded-xl bg-white outline-none`}
                                />
                                {errors.startDate && (
                                    <span className="text-red-500 text-sm">{errors.startDate}</span>
                                )}
                            </div>

                            {/* End Date */}
                            <div className="mb-4">
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
                                    End Date
                                </label>
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={project.endDate}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full p-2 border ${errors.endDate ? "border-red-500" : "border-gray-300"
                                        } rounded-xl bg-white outline-none`}
                                />
                                {errors.endDate && (
                                    <span className="text-red-500 text-sm">{errors.endDate}</span>
                                )}
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={() => setUserId(user.userId)}
                                className="w-full bg-purple-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-purple-200 hover:text-black border-0 mb-5"
                            >
                                Add Project
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </ProtectedRoute>
    );
};

export default AddProject;