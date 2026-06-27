import {Session} from './sessions';

export interface EventCreation {
    title : string,
    description : string,
    startDate : Date,
    endDate : Date,
    location : string
};

export interface Event  {
    id: string,
    title : string,
    description : string,
    startDate : Date,
    endDate : Date,
    location : string
    sessions ?: Session[]
}