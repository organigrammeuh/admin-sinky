import {Session} from './sessions';

export interface SpeakerCreation {
    fullName : string,
    profilePicture: string,
    bio : string,
    socialLinks ?: string[]
};


export interface Speaker {
    id : string,
    fullName : string,
    profilePicture: string,
    bio : string,
    socialLinks ?: string[]
    sessions?: Session[]
}