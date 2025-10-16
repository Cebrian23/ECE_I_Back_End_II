import { Collection } from "mongodb";
import { Legend, LegendDB, Peticion_Legend } from "../../types/legend/Legend.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_song } from "../music/utils_song.ts";
import { Short_album } from "../music/utils_album.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Legend = async (Legend: LegendDB, SongCol: Collection<SongDB>,
                                       AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Legend> => {
    const song_db: SongDB[] = await SongCol.find({talk_about: Legend._id}).toArray();
    const album_db: AlbumDB[] = await AlbCol.find({talk_about: Legend._id}).toArray();

    return{
        id: Legend._id!.toString(),
        name: Legend.name,
        talked_about_in_song: await Promise.all(song_db.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_db.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const LegendDBToLegend = (Legend: LegendDB): Legend => {
    return{
        id: Legend._id!.toString(),
        name: Legend.name,
    }
}