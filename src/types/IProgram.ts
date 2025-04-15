type IProgramVideo = {
    id: number,
    title: string,
    duration: number,
    thumbnail: string
}

type IUser = {
    id: number,
    email: string,
    name: string,
}

type ICorporate = {
    id: number,
    name: string,
}

type ITeam = {
    accessCode: string,
    name: string
}

type IProgram = {
    programId: number,
    name: string,
    description: string,
    thumbnail: string,
    videoCount: number,
    days: number,
    isActive: boolean,
    isDynamicDate: boolean,
    status: string,
    startDate: string,
    endDate: string,
    type: string,
    corporate: ICorporate,
    users: IUser[],
    teams: ITeam[],
    videos: IProgramVideo[],
    programRequired: Object,
}

export type { IProgram, IProgramVideo }