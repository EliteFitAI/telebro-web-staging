type IVideoCategory = {
    id: number;
    name: string;
    url: string;
};

type IAuthor = {
    name: string;
    url: string;
    profilePic?: string;
};

type IVideo = {
    videoId: number;
    title: string;
    description?: string | null;
    duration: number;
    url: string;
    thumbnail: string;
    categories: IVideoCategory[];
    author: IAuthor;
    ytEmbedId?: string;
    workoutTypeId?: number;
}

export type { IVideo, IAuthor, IVideoCategory }