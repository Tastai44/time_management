'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjectById, updateProject } from "../../api/project";
import { IAddProject } from "../../interfaces/Project";
import ProtectedRoute from "../../components/protectRoute";
import { IUser } from "../../interfaces/User";
import * as yup from "yup";
import { ValidationError } from "yup";

type ValidationErrors = {
    [key: string]: string;
};

const projectSchema = yup.object().shape({
    groupName: yup.string().required("Task group is required"),
    projectName: yup.string().required("Project name is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().oneOf(["Todo", "Doing", "Done"], "Invalid status"),
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

const AddProject = ({
    params,
}: {
    params: Promise<{ id: string; }>;
}) => {
    const router = useRouter();
    const [projectId, setProjectId] = useState("");
    const [userId, setUserId] = useState("");
    const [project, setProject] = useState({
        groupName: "Work",
        projectName: "",
        description: "",
        status: "Todo",
        startDate: new Date().toISOString().split("T")[0], // Default to today
        endDate: new Date().toISOString().split("T")[0],   // Default to today
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        params.then((res) => {
            setProjectId(res.id);
            const fetchProject = async () => {
                const resProject = await getProjectById(res.id);
                resProject.map((data) => {
                    setProject({
                        groupName: data.groupName,
                        projectName: data.projectName,
                        description: data.description,
                        status: data.status,
                        startDate: new Date(data.startDate).toISOString().split("T")[0],
                        endDate: new Date(data.endDate).toISOString().split("T")[0],
                    });
                });

            };
            fetchProject();
        }
        );
    }, [params]);


    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            await projectSchema.validate(project, { abortEarly: false });
            const projectFormat: IAddProject = { ...project, ownerId: userId };

            await updateProject(projectFormat, projectId);
            router.push("/home");
            console.log("Project Submitted:", projectFormat);
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                const validationErrors: { [key: string]: string; } = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });
                setErrors(validationErrors);
            } else {
                console.error("Unexpected validation error:", error);
            }
        }
    };

    return (
        <ProtectedRoute>
            {(user: IUser, projects) => (
                <>
                    {projects
                        .filter((data) => data.id === projectId)
                        .map((value, index) =>
                        (
                            <div key={index} className="flex items-center justify-center">
                                <div className="rounded-2xl w-full">
                                    <div className="flex justify-between items-center mb-6">
                                        <div
                                            onClick={() => router.back()}
                                            className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-200"
                                        >
                                            <i className="fa-solid fa-arrow-left text-lg"></i>
                                        </div>
                                        <div className="text-xl font-bold text-gray-800 dark:text-white">Edit Project</div>
                                        <div />
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {/* Task Group */}
                                        <div className="mb-4">
                                            <label htmlFor="groupName" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                Task Group
                                            </label>
                                            <select
                                                id="groupName"
                                                name="groupName"
                                                value={project.groupName}
                                                onChange={handleInputChange}
                                                className={`dark:bg-black mt-1 block w-full p-2 border ${errors.groupName ? "border-red-500" : "border-gray-300"
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
                                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                Project Name
                                            </label>
                                            <input
                                                id="projectName"
                                                name="projectName"
                                                type="text"
                                                value={project.projectName}
                                                onChange={handleInputChange}
                                                placeholder="Enter project name"
                                                className={`dark:bg-black mt-1 block w-full p-2 border ${errors.projectName ? "border-red-500" : "border-gray-300"
                                                    } rounded-xl bg-white outline-none`}
                                            />
                                            {errors.projectName && (
                                                <span className="text-red-500 text-sm">{errors.projectName}</span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={project.description}
                                                onChange={handleInputChange}
                                                placeholder="Enter project description"
                                                className={`dark:bg-black mt-1 block w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                                    } rounded-xl bg-white outline-none`}
                                                rows={3}
                                            />
                                            {errors.description && (
                                                <span className="text-red-500 text-sm">{errors.description}</span>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div className="mb-4">
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={project.status}
                                                onChange={handleInputChange}
                                                className="dark:bg-black mt-1 block w-full p-2 rounded-xl border border-gray-300 bg-white outline-none"
                                            >
                                                <option value="Todo">Todo</option>
                                                <option value="Doing">Doing</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>

                                        {/* Start Date */}
                                        <div className="mb-4">
                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                Start Date
                                            </label>
                                            <input
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                value={project.startDate}
                                                onChange={handleInputChange}
                                                className={`dark:bg-black mt-1 block w-full p-2 border ${errors.startDate ? "border-red-500" : "border-gray-300"
                                                    } rounded-xl bg-white outline-none`}
                                            />
                                            {errors.startDate && (
                                                <span className="text-red-500 text-sm">{errors.startDate}</span>
                                            )}
                                        </div>

                                        {/* End Date */}
                                        <div className="mb-4">
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-600 dark:text-white">
                                                End Date
                                            </label>
                                            <input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                value={project.endDate}
                                                onChange={handleInputChange}
                                                className={`dark:bg-black mt-1 block w-full p-2 border ${errors.endDate ? "border-red-500" : "border-gray-300"
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
                                            className="w-full bg-purple-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-purple-200 hover:text-black border-0 mb-[100px]"
                                        >
                                            Edit Project
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </ProtectedRoute>

    );
};

export default AddProject;
