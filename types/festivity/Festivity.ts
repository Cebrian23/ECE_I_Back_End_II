import { OptionalId } from "mongodb";
import { Festivity_date } from "./Festivity_date.ts";
import { Album_Short } from "../music/Album.ts";
import { Song_Short } from "../music/Song.ts";

export type FestivityDB = OptionalId<{
    name: string,
    date: Festivity_date,
}>

export type Festivity = {
    id: string,
    name: string,
    date: Festivity_date,
}

export type Peticion_Festivity = {
    id: string,
    name: string,
    date: Festivity_date,
    talked_about_in_song: Song_Short[],
    talked_about_in_album: Album_Short[],
}