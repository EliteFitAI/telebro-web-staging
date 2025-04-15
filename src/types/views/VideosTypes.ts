type VideoItemType = {
    id: number;
    title: string;
    description?: string;
    thumbnail: string;
    is_public: boolean;
    duration : number;
    video_status: string;
    created_at: string | Date;
  }

  export type {VideoItemType}