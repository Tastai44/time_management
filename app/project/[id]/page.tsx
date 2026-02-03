'use client';
import { useRouter } from "next/navigation";
import { deleteProject } from "@/app/api/project";
import ConfirmCard from "@/app/components/ConfirmCard";
import ProtectedRoute from "@/app/components/protectRoute";
import { IUser } from "@/app/interfaces/User";
import { IProject } from "@/app/interfaces/Project";
import { useState, use } from "react";

export default function Page({
    params,
}: {
    params: Promise<{ id: string; }>;
}) {
    const router = useRouter();
    const { id: projectId } = use(params);

    const [openDelete, setOpenDelete] = useState(false);

    const handleEdit = (projectId: string) => {
        // Logic to edit project
        router.push(`/addEditTask/${projectId}`);
    };

    const handleDelete = async () => {
        try {
            const res = await deleteProject(projectId as string);
            if (res == 200) {
                router.back();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setOpenDelete(!openDelete);
    };

    return (
        <ProtectedRoute>
            {(_user: IUser, projects: IProject[]) => {
                // 1. Safety check to ensure projects is an array
                const projectList = projects || [];
                const filteredProjects = projectList.filter((project) => project?.id === projectId);

                // 2. Helper to formatting dates consistently on Server and Client
                const formatDate = (dateString: string) => {
                    if (!dateString) return "N/A";
                    // Use a fixed locale (like 'en-GB' or 'en-US') to ensure Server and Client match.
                    // Alternatively, use a library like date-fns or dayjs.
                    return new Date(dateString).toLocaleDateString('en-GB');
                };

                return (
                    <div className="flex flex-col items-center justify-center w-full">

                        {/* 3. FIX: Move Modal OUTSIDE the loop. 
                   Ideally, 'openDelete' should track the ID of the item to delete, 
                   not just true/false. */}
                        <ConfirmCard
                            onConfirm={handleDelete}
                            onCancel={handleClose}
                            message={"Are you sure you want to delete this item?"}
                            isOpen={openDelete}
                        />

                        {filteredProjects.map((project) => (
                            <div
                                key={project?.id}
                                className="w-full max-w-lg bg-white shadow-xl rounded-lg overflow-hidden mb-6" // Added mb-6 for spacing
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-24 flex items-center justify-center">
                                    <h2 className="text-white text-xl font-bold">
                                        {project?.projectName || "Project Name"}
                                    </h2>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {/* Group Name */}
                                    <div>
                                        <h3 className="text-purple-800 text-sm font-semibold">Group Name</h3>
                                        <p className="text-gray-600">
                                            {project?.groupName || "No group name available"}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-purple-800 text-sm font-semibold">Description</h3>
                                        {/* 4. POTENTIAL FIX: Ensure description doesn't contain HTML block elements */}
                                        <div className="text-gray-600">
                                            {project?.description || "No description available"}
                                        </div>
                                    </div>

                                    {/* Dates - Using the safe formatter */}
                                    <div className="flex justify-between text-sm">
                                        <div>
                                            <h3 className="text-purple-800 font-semibold">Start Date</h3>
                                            <p className="text-gray-600">
                                                {formatDate(project?.startDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-purple-800 font-semibold">End Date</h3>
                                            <p className="text-gray-600">
                                                {formatDate(project?.endDate)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <h3 className="text-purple-800 text-sm font-semibold">Status</h3>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${project.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : project.status === "In Progress"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {project.status || "Unknown"}
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-between space-x-4">
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEdit(project.id)}
                                                className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenDelete(true);
                                                    // You likely need to set a selected ID here too
                                                    // setSelectedId(project.id);
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => router.back()}
                                                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg shadow-md"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }}
        </ProtectedRoute>
    );
};
