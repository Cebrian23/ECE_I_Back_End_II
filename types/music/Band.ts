import { ObjectId, OptionalId } from "mongodb";
import { Album, Album_Short } from "./Album.ts";

export type BandDB = OptionalId<{
    name: string,
    logo?: string,
    albums: ObjectId[],
}>

export type Band = {
    id: string,
    name: string,
    logo?: string,
    albums: Album[],
}

export type Peticion_Band = {
    id: string,
    name: string,
    logo?: string,
    albums: Album_Short[],
}

export type Band_Short = {
    id: string,
    name: string,
}