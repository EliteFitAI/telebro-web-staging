
type notificationType = {
    avatar: string;
    title: string;
    subtitle: string;
    color:string;
    time:string;
};

type profileType = {
    title: string;
    href: string;
    badge:boolean;
};

type languageType = {
    avatar: string;
    title: string;
    subtext: string;
    value: string;
};

type appsLinkType = {
    avatar: string;
    title: string;
    subtext: string;
    color:string;
    href: string;
};


type searchType = {
    title: string;
    href: string;
};


export type { notificationType, profileType, languageType, appsLinkType, searchType }