import { Collection } from "mongodb";
import { BandDB, Peticion_Band } from "../../types/music/Band.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_album } from "./utils_album.ts";

export const Transform_Band = async (Band: BandDB, AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>): Promise<Peticion_Band> => {
    const albums: AlbumDB[] = await AlbCol.find({_id: {$in: Band.albums}}).toArray();

    return{
        id: Band._id!.toString(),
        name: Band.name,
        logo: Band.logo,
        albums: await Promise.all(albums.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const Short_band = (Band: BandDB) => {
    return{
        id: Band._id!.toString(),
        name: Band.name
    }
}