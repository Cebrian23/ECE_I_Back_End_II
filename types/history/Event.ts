import { ObjectId, OptionalId } from "mongodb"
import { Person, Person_Short } from "./Person.ts";
import { Organization, Organization_Short } from "./Organization.ts";
import { Date } from "./Date.ts";

export type EventDB = OptionalId<{
    name: string,
    start_date?: Date,
    end_date?: Date,
    people_involved?: ObjectId[],
    organizations_involved?: ObjectId[],
}>

export type Event = {
    id: string,
    name: string,
    start_date?: Date,
    end_date?: Date,
    people_involved?: Person[],
    organizations_involved?: Organization[],
}

export type Peticion_Event = {
    id: string,
    name: string,
    start_date?: Date,
    end_date?: Date,
    people_involved?: Person_Short[],
    organizations_involved?: Organization_Short[],
}

export type Event_Short = {
    id: string,
    name: string,
}