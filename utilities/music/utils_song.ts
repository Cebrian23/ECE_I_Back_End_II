import { Collection } from "mongodb";
import { Peticion_Song, Song_Short, SongDB } from "../../types/music/Song.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_album } from "./utils_album.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Song = async (Song: SongDB, AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>): Promise<Peticion_Song> => {
    const album: AlbumDB | null = await AlbCol.findOne({songs: Song._id});

    if(!album){
        throw new Error(`No se ha encontrado album para la canción "${Song.name}"`);
    }

    return{
        id: Song._id!.toString(),
        name: Song.name,
        talk_about: {},
        official_video: Song.official_video,
        album_in: await Short_album(album, BandCol),
    }
}

export const Short_song = async (Song: SongDB, AlbCol: Collection<AlbumDB>): Promise<Song_Short> => {
    const album: AlbumDB | null = await AlbCol.findOne({songs: Song._id});

    if(!album){
        return{
            id: Song._id!.toString(),
            name: Song.name,
            cover: "",
        }
    }
    else{
        return{
            id: Song._id!.toString(),
            name: Song.name,
            cover: album.cover
        }
    }
}