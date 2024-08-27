import { Checkin } from './checkin';

export type Class = {
    id: string;
    name: string;
    start: string;
    end: string;
    checkins: Checkin[]
}