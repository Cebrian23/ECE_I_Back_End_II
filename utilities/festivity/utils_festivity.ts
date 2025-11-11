import { Collection } from "mongodb";
import { FestivityDB, Peticion_Festivity } from "../../types/festivity/Festivity.ts";
import { SongDB } from "../../types/music/Song.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_song } from "../music/utils_song.ts";
import { Short_album } from "../music/utils_album.ts";
import { BandDB } from "../../types/music/Band.ts";

/**
 * Función que transforma una festividad almacenada en la base de datos y devuelve todos sus datos
 * @param Festivity Es la festividad que se va a transformar
 * @param SongCol Es la colección de canciones
 * @param AlbCol Es la colección de álbumes
 * @param BandCol Es la colección de bandas
 * @returns Devuelve la festividad transformada
 */
export const Transform_Festivity = async (Festivity: FestivityDB, SongCol: Collection<SongDB>,
                                          AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Festivity> => {
    const songs_in: SongDB[] = await SongCol.find({talk_about: Festivity._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({talk_about: Festivity._id}).toArray();

    return{
        id: Festivity._id!.toString(),
        name: Festivity.name,
        date: Festivity.date,
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol, BandCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

/**
 * Función que transforma una festividad almacenada en la base de datos y devuelve una versión reducida de sus datos
 * @param Festivity Es la festividad que se va a transformar
 * @returns Devuelve la versión reducida de la festividad
 */
export const FestivityDBToFestivity = (Festivity: FestivityDB) => {
    return{
        id: Festivity._id!.toString(),
        name: Festivity.name,
        date: Festivity.date,
    }
}