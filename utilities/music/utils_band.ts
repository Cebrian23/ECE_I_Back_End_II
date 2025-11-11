import { Collection } from "mongodb";
import { BandDB, Peticion_Band } from "../../types/music/Band.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_album } from "./utils_album.ts";

/**
 * Función que transforma una banda almacenada en la base de datos y devuelve todos sus datos
 * @param Band Es la banda que se va a transformar
 * @param AlbCol Es la colección de álbumes
 * @param BandCol Es la colección de bandas
 * @returns Devuelve la banda transformada
 */
export const Transform_Band = async (Band: BandDB, AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>): Promise<Peticion_Band> => {
    const albums: AlbumDB[] = await AlbCol.find({_id: {$in: Band.albums}}).toArray();

    return{
        id: Band._id!.toString(),
        name: Band.name,
        logo: Band.logo,
        albums: await Promise.all(albums.map(async (album) => await Short_album(album, BandCol))),
    }
}

/**
 * Función que transforma una banda almacenada en la base de datos y devuelve una versión reducida de sus datos
 * @param Band Es la banda que se va a transformar
 * @returns Devuelve la versión reducida de la banda
 */
export const Short_band = (Band: BandDB) => {
    return{
        id: Band._id!.toString(),
        name: Band.name
    }
}