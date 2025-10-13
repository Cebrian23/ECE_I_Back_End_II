import { OptionalId } from "mongodb";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type MithDB = OptionalId<{
    name: string,
}>

export type Mith = {
    id: string,
    name: string,
}

export type Peticion_Mith = {
    id: string,
    name: string,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}