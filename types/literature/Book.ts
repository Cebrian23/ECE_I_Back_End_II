import { OptionalId } from "mongodb";
import { Writer_Short } from "./Writer.ts";

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
}

export type Book_Short = {
    id: string,
    title: string,
    cover?: string,
    year_of_publish?: number,
}