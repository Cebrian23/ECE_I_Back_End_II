import { OptionalId } from "mongodb";
import { Writer_Short } from "./Writer.ts";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type BookDB = OptionalId<{
    title: string,
    cover?: string,
    year_of_publish?: number,
    description?: string,
}>

export type Book = {
    id: string,
    title: string,
    cover?: string,
    year_of_publish?: number,
    description?: string,
}

export type Peticion_Book = {
    id: string,
    title: string,
    cover?: string,
    year_of_publish?: number,
    description?: string, 
    writer: Writer_Short,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}

export type Book_Short = {
    id: string,
    title: string,
    cover?: string,
    year_of_publish?: number,
    writer: Writer_Short,
}