import { OptionalId } from "mongodb"
import { Date } from "./Date.ts";
import { Organization_Short } from "./Organization.ts";
import { Event_Short } from "./Event.ts";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type PersonDB = OptionalId<{
    name: string,
    surname?: string,
    nickname?: string[],
    image?: string,
    birth_date?: Date,
    death_date?: Date,
    country_from: string,
    historical_position: string,
}>

export type Person = {
    id: string,
    name: string,
    surname?: string,
    nickname?: string[],
    image?: string,
    birth_date?: Date,
    death_date?: Date,
    country_from: string,
    historical_position: string,
}

export type Peticion_Person = {
    id: string,
    name: string,
    surname?: string,
    nickname?: string[],
    image?: string,
    birth_date?: Date,
    death_date?: Date,
    country_from: string,
    historical_position: string,
    involved_in: Event_Short[]
    member_of: Organization_Short[],
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}

export type Person_Short = {
    id: string,
    name: string,
    surname?: string,
    country_from: string,
}