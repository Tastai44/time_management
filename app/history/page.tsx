'use client';
import { useState, useEffect } from "react";
import { getProjectByUserId } from "../api/project";
import { IProject } from "../interfaces/Project";
import Skeleton from "../components/Skeleton";
import TaskCard from "../components/TaskCard";


export default function Page() {
    const [projects, setProjects] = useState<IProject[] | null>(null);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchProjects = async () => {
            if (userId) {
                try {
                    const data = await getProjectByUserId(userId);
                    const today = new Date(); // Get today's date
                    setProjects(data.filter((project) => new Date(project.endDate) < today)); // Compare dates
                } catch (error) {
                    console.error("Error fetching projects:", error);
                }
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            {
                !projects ? (
                    <Skeleton />
                ) : (
                    <div className="flex flex-col min-h-screen">
                        {/* Title Section */}
                        <div className="flex justify-center items-center mb-8">
                            <div className="text-3xl font-extrabold text-gray-900 tracking-wide">
                                History
                            </div>
                        </div>

                        {/* Search & Filter Section */}
                        <div className="relative w-2.5/4">
                            {/* Search Icon inside Input */}
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"></i>
                            <input
                                type="text"
                                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
                                placeholder="Search for past projects..."
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                        {
                            projects.length > 0 ? (
                                <div className="space-y-6">
                                    {
                                        searchInput !== "" ? (
                                            projects.filter((data) => data.description.includes(searchInput) ||
                                                data.groupName.includes(searchInput) || data.projectName.includes(searchInput)
                                            ).map((project, index) => (
                                                <a key={project.id} href={`/project/${project.id}`}>
                                                    <TaskCard
                                                        key={index}
                                                        projectName={project.projectName}
                                                        groupName={project.groupName}
                                                        description={project.description}
                                                        endDate={project.endDate}
                                                        status={project.status}
                                                    />
                                                </a>
                                            ))
                                        ) : (
                                            projects.map((project, index) => (
                                                <a key={project.id} href={`/project/${project.id}`}>
                                                    <TaskCard
                                                        key={index}
                                                        projectName={project.projectName}
                                                        groupName={project.groupName}
                                                        description={project.description}
                                                        endDate={project.endDate}
                                                        status={project.status}
                                                    />
                                                </a>
                                            ))
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-[60vh] text-2xl">
                                    There is no past project.
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}
