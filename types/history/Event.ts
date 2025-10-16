import { ObjectId, OptionalId } from "mongodb"
import { Person, Person_Short } from "./Person.ts";
import { Organization, Organization_Short } from "./Organization.ts";
import { Date } from "./Date.ts";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

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
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}

export type Event_Short = {
    id: string,
    name: string,
}