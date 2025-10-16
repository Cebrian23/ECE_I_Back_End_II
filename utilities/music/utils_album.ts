import { Collection } from "mongodb";
import { Album_Short, AlbumDB, Peticion_Album } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_song } from "./utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";
import { Short_band } from "./utils_band.ts";

export const Transform_Album = async (Album: AlbumDB, BandCol: Collection<BandDB>,
                                      AlbCol: Collection<AlbumDB>, SongCol: Collection<SongDB>
): Promise<Peticion_Album> => {
    const creator: BandDB | null = await BandCol.findOne({albums: Album._id});
    const songs: SongDB[] = await SongCol.find({_id: {$in: Album.songs}}).toArray();

    if(!creator){
        throw new Error(`No se ha encontrado banda creadora para el album "${Album.name}"`);
    }

    return{
        id: Album._id!.toString(),
        name: Album.name,
        year_of_publish: Album.year_of_publish,
        cover: Album.cover,
        songs: await Promise.all(songs.map(async (song) => await Short_song(song, AlbCol))),
        talk_about: {},
        conceptual_album: Album.conceptual_album,
        creator: Short_band(creator),
    }
}

export const Short_album = async (Album: AlbumDB, BandCol: Collection<BandDB>): Promise<Album_Short> => {
    const creator: BandDB | null = await BandCol.findOne({albums: Album._id});

    if(!creator){
        throw new Error(`No se ha encontrado banda creadora para el album "${Album.name}"`);
    }

    return{
        id: Album._id!.toString(),
        name: Album.name,
        cover: Album.cover,
        year_of_publish: Album.year_of_publish,
        creator: Short_band(creator),
    }
}