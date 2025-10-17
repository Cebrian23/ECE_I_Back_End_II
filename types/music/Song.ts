import { OptionalId, ObjectId } from "mongodb";
import { Topics, Topics_Short } from "./Topics.ts";
import { Album_Short } from "./Album.ts";

export type SongDB = OptionalId<{
    name: string,
    talk_about: ObjectId[],
    official_video?: string,
}>

export type Song = {
    id: string,
    name: string,
    talk_about: Topics,
    official_video?: string,
}

export type Peticion_Song = {
    id: string,
    name: string,
    cover?: string,
    talk_about: Topics_Short,
    official_video?: string,
    album_in: Album_Short,
}

export type Song_Short = {
    id: string,
    name: string,
    cover?: string,
    album_in?: Album_Short,
}