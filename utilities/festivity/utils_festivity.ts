import { Collection } from "mongodb";
import { FestivityDB, Peticion_Festivity } from "../../types/festivity/Festivity.ts";
import { SongDB } from "../../types/music/Song.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_song } from "../music/utils_song.ts";
import { Short_album } from "../music/utils_album.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Festivity = async (Festivity: FestivityDB, SongCol: Collection<SongDB>,
                                          AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Festivity> => {
    const songs_in: SongDB[] = await SongCol.find({_id: Festivity._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({_id: Festivity._id}).toArray();

    return{
        id: Festivity._id!.toString(),
        name: Festivity.name,
        date: Festivity.date,
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const FestivityDBToFestivity = (Festivity: FestivityDB) => {
    return{
        id: Festivity._id!.toString(),
        name: Festivity.name,
        date: Festivity.date,
    }
}