import { Collection } from "mongodb";
import { Heraldry_Short, HeraldryDB, Peticion_Heraldry } from "../../types/history/Heraldry.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Heraldry = async (Heraldry: HeraldryDB, SongCol: Collection<SongDB>,
                                         AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Heraldry> => {
    const songs_in: SongDB[] = await SongCol.find({_id: Heraldry._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({_id: Heraldry._id}).toArray();

    return{
        id: Heraldry._id!.toString(),
        name: Heraldry.name,
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const Short_heraldry = (Heraldry: HeraldryDB): Heraldry_Short => {
    return{
        id: Heraldry._id!.toString(),
        name: Heraldry.name,
    }
}