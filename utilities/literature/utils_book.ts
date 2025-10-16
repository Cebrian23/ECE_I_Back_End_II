import { Collection } from "mongodb";
import { Book_Short, BookDB, Peticion_Book } from "../../types/literature/Book.ts";
import { WriterDB } from "../../types/literature/Writer.ts";
import { Short_writer } from "./utils_writer.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Book = async (Book: BookDB, WriCol: Collection<WriterDB>, SongCol: Collection<SongDB>,
                                     AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>): Promise<Peticion_Book> => {
    const writer: WriterDB | null = await WriCol.findOne({books: Book._id});

    if(!writer){
        throw new Error(`No se ha encontrado escritor para el libro "${Book.title}"`);
    }

    const songs_in: SongDB[] = await SongCol.find({talk_about: Book._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({talk_about: Book._id}).toArray();

    return{
        id: Book._id!.toString(),
        title: Book.title,
        cover: Book.cover,
        year_of_publish: Book.year_of_publish,
        description: Book.description,
        writer: Short_writer(writer),
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const Short_book = async (Book: BookDB, WriCol: Collection<WriterDB>): Promise<Book_Short> => {
    const writer: WriterDB | null = await WriCol.findOne({books: Book._id});

    if(!writer){
        throw new Error(`No se ha encontrado escritor para el libro "${Book.title}"`);
    }

    return{
        id: Book._id!.toString(),
        title: Book.title,
        cover: Book.cover,
        year_of_publish: Book.year_of_publish,
        writer: Short_writer(writer),
    }
}