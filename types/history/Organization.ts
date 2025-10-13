import { ObjectId, OptionalId } from "mongodb";
import { Date } from "./Date.ts";
import { Person, Person_Short } from "./Person.ts";
import { Song_Short } from "../music/Song.ts";
import { Album_Short } from "../music/Album.ts";
import { Event_Short } from "./Event.ts";

export type OrganizationDB = OptionalId<{
    name: string,
    logo?: string,
    creation?: Date,
    dissolution?: Date,
    distinguished_members?: ObjectId[],
}>

export type Organization = {
    id: string,
    name: string,
    logo?: string,
    creation?: Date,
    dissolution?: Date,
    distinguished_members?: Person[],
}

export type Peticion_Organization = {
    id: string,
    name: string,
    logo?: string,
    creation?: Date,
    dissolution?: Date,
    distinguished_members?: Person_Short[],
    involved_in: Event_Short[],
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}

export type Organization_Short = {
    id: string,
    name: string,
}