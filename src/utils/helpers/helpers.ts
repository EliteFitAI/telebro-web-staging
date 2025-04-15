import moment from 'moment';
import axiosServices from '../axios';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export function formatDateWithTime(date: any) {
    return moment(date).format('DD-MM-YYYY hh:mm');
}

export function formatDateWithTimeAMPM(date: any) {
    return moment(date).local().format('DD-MM-YYYY hh:mm A');
}


export function formatDate(date: any) {
    return moment(date).format('DD-MM-YYYY');
}

export function getTime(date : any){
    return moment(date).format('hh:mm')
}

export function getTimeAMPM(date : any){
    return moment(date).format('hh:mm A')
}

export function formatTime(timeInSeconds: any) {
    return `${moment.utc(timeInSeconds * 1000).format(timeInSeconds >= 3600 ? 'HH:mm' : 'mm:ss')} ${timeInSeconds >= 3600 ? 'hours' : 'mins'}`;
}

export function formatRelativeTime(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();

    if (isNaN(createdDate.getTime())) return 'Invalid Date';

    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
        return `more than a year ago`;
    }
}

export function getActiveDuration(startDate: string | null, endDate: string | null): string {
    if (!startDate || !endDate) return 'Always Active';

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const start = new Date(startDate).toLocaleDateString(undefined, options);
    const end = new Date(endDate).toLocaleDateString(undefined, options);

    return `${start} to ${end}`;
}

export function getvideoDuration(time: number) {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    // Output like "01:01" or "04:03:59" or "123:03:59"
    let ret = '';
    if (hrs > 0) {
        ret += '' + (hrs > 9 ? hrs : '0' + hrs) + ':';
    }
    ret += '' + (mins > 9 ? mins : '0' + mins) + ':';
    ret += '' + (secs > 9 ? secs : '0' + secs);
    return ret;
}
export function avatarLetter(name: string, email: string) {
    const letter = name?.charAt(0).toUpperCase() 
    return letter != '' && letter != ' ' && letter ? letter :  email?.charAt(0).toUpperCase();
}

export function userActiveStatusChipColor(status: string | null | undefined) {
    switch (status) {
        case 'Active':
            return 'success';
        case 'Inactive':
            return 'default';
        default:
            return 'secondary';
    }
}

export const USER_ACTIVE_STATUS = {
    INACTIVE: 'Inactive',
    ACTIVE: 'Active',
    SEMIACTIVE: 'Semi-Active'
};

export function formatWorkoutTime(timeInSeconds: number, compress : boolean = false) {
    const HOURS = compress ? 'h' : "hours"
    const MINUTES = compress ? 'm' : 'minutes';
    const SECONDS = compress ? 's' : 'seconds';
    const hours = ~~(timeInSeconds / 3600);
    const minutes = ~~((timeInSeconds - hours * 3600) / 60);
    const seconds = ~~(timeInSeconds - hours * 3600 - minutes * 60);
    if (hours > 0) {
        return `${hours} ${HOURS} ${minutes} ${MINUTES}`;
    }
    return `${minutes} ${MINUTES} ${seconds} ${SECONDS}`;
}

export function getWorkoutUrl(video: any) {
    let query = new URLSearchParams();
    query.set('id', video.id);
    const workoutTypeId = video.workout_type_id;
    if (workoutTypeId === 4) {
        query.set('duration', video.duration);
        query.set('sets', '1');
        return `/workout/rep?${query.toString()}`;
    } else if (workoutTypeId === 5) {
        query.set('duration', video.duration);
        query.set('sets', '1');
        return `/workout/hold-rep?${query.toString()}`;
    }
    return `/workout/${(video.Tenant?.name || 'author').replaceAll(/\s/g, '')}?${query.toString()}`;
}

import type { IVideo } from '@/types/IVideo';
export function parseVideo(rawVideo: any): IVideo {
    let categories = (rawVideo.categories || []).map(category => Object.assign({url: `/categories/${category.id}`}, category));
    let author = {};
    if (rawVideo.Tenant) {
        author = {
            name: rawVideo.Tenant.name || 'author',
            url: `/${(rawVideo.Tenant.name || '').replaceAll(/\s/g, '')}`,
            profilePic: rawVideo.Tenant.profile_pic_url,
        };
    }

    return {
        videoId: rawVideo.id,
        title: rawVideo.title,
        description: rawVideo.description,
        duration: Number(rawVideo.duration || 0), // in secs
        url: getWorkoutUrl(rawVideo),
        thumbnail: rawVideo.thumbnail,
        isFeatured: rawVideo.is_featured,
        ytEmbedId: rawVideo.youtube_embed_id,
        workoutTypeId: rawVideo.workout_type_id,
        categories,
        author,
    };
};

import type { IProgram } from '@/types/IProgram';
export function parseProgram(rawProgram: any): IProgram {
    let videos = [];
    if (rawProgram.programVideos) {
        videos = rawProgram.programVideos.map(video => {
            return {
                id: video.id,
                title: video.title,
                duration: Number(video.duration),
                thumbnail: video.thumbnail,
                createdAt: video.created_at,
                config: video.config,
            }
        })
    }
    let programRequired = null;
    if (rawProgram.programRequired) {
        programRequired = {
            programId: rawProgram.programRequired.id,
            name: rawProgram.programRequired.name,
        };
    }
    return {
        programId: rawProgram.id,
        name: rawProgram.name,
        description: rawProgram.description,
        thumbnail: rawProgram.thumbnail,
        videoCount: videos.length,
        days: Number(rawProgram.days),
        isActive: Boolean(rawProgram.isActive),
        isDynamicDate: Boolean(rawProgram.isDynamicDate),
        status: rawProgram.status,
        startDate: rawProgram.startDate,
        endDate: rawProgram.endDate,
        type: rawProgram.type,
        corporate: rawProgram.corporate,
        users: rawProgram.users,
        teams: rawProgram.teams,
        videos,
        programRequired
    }
}

import type { IUser } from '@/types/IUser';
export function parseUser(rawUser: any): IUser {
    return {
        id: rawUser.id,
        name: rawUser.name,
        profileImage: rawUser.profileImage,
    }
}
export function generateProgramId(length = 6) {
    let result = '';
    const characters = 'ABCDEFGHILKMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

async function getS3TempCred() {
    let response = await axiosServices.get("/get-s3");
    return response.data.Credentials;
}

export async function getS3Url(
    file: any,
    folderName: string
): Promise<any> {
    try {
        const credentials = await getS3TempCred();

        // Create the S3 client with the credentials
        const s3Client = new S3Client({
            region: 'ap-southeast-1',
            credentials: {
                accessKeyId: credentials.AccessKeyId,
                secretAccessKey: credentials.SecretAccessKey,
                sessionToken: credentials.SessionToken,
            },
        });

        const fileType = file.type;
        const pathName = new Date().toISOString().replace(/[^\w]/g, '') + file.name.replace(/\s/g, '');

        const s3Params : any = {
            Bucket: 'ef-notifications',
            Key: `${folderName}/${pathName}`,
            ContentType: fileType,
            Body: new Blob([file], { type: file.type }),
            ACL: 'public-read',
        };

        const command = new PutObjectCommand(s3Params);

        const data = await s3Client.send(command);

        console.log('Upload successful', data);  // Debugging log
        const s3Url = `https://${s3Params.Bucket}.s3.ap-southeast-1.amazonaws.com/${s3Params.Key}`;
        return s3Url;
    } catch (err) {
        console.error('Error uploading file to S3:', err); 
        throw new Error(`Error uploading file to S3: ${err instanceof Error ? err.message : err}`);
    }
}

export function convertToMinutesAndSeconds(durationInSeconds : number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return { minutes, seconds };
}
