import { ObjectId, OptionalId } from "mongodb";
import { Song, Song_Short } from "./Song.ts";
import { Topics, Topics_Short } from "./Topics.ts";
import { Band_Short } from "./Band.ts";

export type AlbumDB = OptionalId<{
    name: string,
    year_of_publish: number,
    cover?: string,
    songs?: ObjectId[],
    talk_about?: ObjectId[],
    conceptual_album: boolean,
}>

export type Album = {
    id: string,
    name: string,
    year_of_publish: number,
    cover?: string,
    songs?: Song[],
    talk_about?: Topics,
    conceptual_album: boolean,
}

export type Peticion_Album = {
    id: string,
    name: string,
    cover?: string,
    year_of_publish: number,
    creator: Band_Short,
    songs?: Song_Short[],
    talk_about?: Topics_Short,
    conceptual_album: boolean,
}

export type Album_Short = {
    id: string,
    name: string,
    year_of_publish: number,
    cover?: string,
    creator: Band_Short,
}