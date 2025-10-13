import { OptionalId } from "mongodb"
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type LegendDB = OptionalId<{
    name: string,
}>

export type Legend = {
    id: string,
    name: string,
}

export type Peticion_Legend = {
    id: string,
    name: string,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}