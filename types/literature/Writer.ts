import { ObjectId, OptionalId } from "mongodb";
import { Book, Book_Short } from "../literature/Book.ts";

export type WriterDB = OptionalId<{
    name: string,
    surname?: string,
    image?: string,
    books: ObjectId[],
}>

export type Writer = {
    id: string,
    name: string,
    surname?: string,
    image?: string,
    books: Book[],
}

export type Peticion_Writer = {
    id: string,
    name: string,
    surname?: string,
    image?: string,
    books: Book_Short[],
}

export type Writer_Short = {
    id: string,
    name: string,
    surname?: string,
    image?: string,
}