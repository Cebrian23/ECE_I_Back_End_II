import { Collection } from "mongodb";
import { Peticion_Writer, Writer_Short, WriterDB } from "../../types/literature/Writer.ts";
import { BookDB } from "../../types/literature/Book.ts";
import { Short_book } from "./utils_book.ts";

export const Transform_Writer = async (Writer: WriterDB, BookCol: Collection<BookDB>, WriCol: Collection<WriterDB>): Promise<Peticion_Writer> => {
    const books_db: BookDB[] = await BookCol.find({_id: {$in: Writer.books}}).toArray();

    return{
        id: Writer._id!.toString(),
        name: Writer.name,
        surname: Writer.surname,
        image: Writer.image,
        books: await Promise.all(books_db.map(async (book) => await Short_book(book, WriCol))),
    }
}

export const Short_writer = (Writer: WriterDB): Writer_Short => {
    return{
        id: Writer._id!.toString(),
        name: Writer.name,
        surname: Writer.surname,
        image: Writer.image,
    }
}