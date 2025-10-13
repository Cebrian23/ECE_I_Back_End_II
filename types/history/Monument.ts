import { OptionalId } from "mongodb";
import { Date_monument } from "./Date.ts";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type MonumentDB = OptionalId<{
    name: string,
    creation?: Date_monument,
    destruction?: Date_monument,
    still_exists: boolean,
    country_in?: string,
}>

export type Monument = {
    id: string,
    name: string,
    creation?: Date_monument,
    destruction?: Date_monument,
    still_exists: boolean,
    country_in?: string,
}

export type Peticion_Monument = {
    id: string,
    name: string,
    creation?: Date_monument,
    destruction?: Date_monument,
    still_exists: boolean,
    country_in?: string,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}

export type Monument_Short = {
    id: string,
    name: string,
}