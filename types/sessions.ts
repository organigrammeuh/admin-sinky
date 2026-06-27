import { Speaker } from "./speaker"

export interface SessionCreation {
    title : string,
    description : string,
    startTime : Date,
    endTime : Date,
    room : string,
    capacity: number
}

export interface Session {
    id : string,
    title : string,
    description : string,
    startTime : Date,
    endTime : Date,
    room : string,
    capacity: number
    speakers ?: Speaker[]
}