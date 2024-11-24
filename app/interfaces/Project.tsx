export interface IAddProject {
    groupName: string,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string,
    status: string,
    ownerId: string;
}

export interface IProject {
    id: string;
    groupName: string,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string,
    status: string,
    ownerId: string,
    createdAt: string;
}