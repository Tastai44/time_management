'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddProject = () => {
    const router = useRouter();
    const [project, setProject] = useState({
        taskGroup: "Work",
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Project Submitted:", project);
    };

    return (
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
                        <label htmlFor="taskGroup" className="block text-sm font-medium text-gray-600">
                            Task Group
                        </label>
                        <select
                            id="taskGroup"
                            name="taskGroup"
                            value={project.taskGroup}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </select>
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
                            className="mt-1 block w-full p-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        />
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
                            className="mt-1 block w-full p-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                        />
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
                            className="mt-1 block w-full p-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        />
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
                            className="mt-1 block w-full p-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5F33E1] text-white font-medium py-3 rounded-xl shadow-md hover:bg-purple-200 hover:text-black border-0"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
