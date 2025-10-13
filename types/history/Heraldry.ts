import { OptionalId } from "mongodb";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type HeraldryDB = OptionalId<{
    name: string,
    image?: string,
}>

export type Heraldry = {
    id: string,
    name: string,
    image?: string,
}

export type Peticion_Heraldry = {
    id: string,
    name: string,
    image?: string,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}