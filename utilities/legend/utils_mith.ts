import { Collection } from "mongodb";
import { Mith, MithDB, Peticion_Mith } from "../../types/legend/Mith.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Mith = async (Mith: MithDB, SongCol: Collection<SongDB>,
                                     AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Mith> => {
    const song_db: SongDB[] = await SongCol.find({talk_about: Mith._id}).toArray();
    const album_db: AlbumDB[] = await AlbCol.find({talk_about: Mith._id}).toArray();

    return{
        id: Mith._id!.toString(),
        name: Mith.name,
        talked_about_in_song: await Promise.all(song_db.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_db.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const MithDBToMith = (Mith: MithDB): Mith => {
    return{
        id: Mith._id!.toString(),
        name: Mith.name,
    }
}