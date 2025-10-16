import { Collection } from "mongodb";
import { Monument_Short, MonumentDB, Peticion_Monument } from "../../types/history/Monument.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Monument = async (Monument: MonumentDB, SongCol: Collection<SongDB>,
                                         AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Monument> => {
    const songs_in: SongDB[] = await SongCol.find({talk_about: Monument._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({talk_about: Monument._id}).toArray();

    return{
        id: Monument._id!.toString(),
        name: Monument.name,
        creation: Monument.creation,
        destruction: Monument.destruction,
        still_exists: Monument.still_exists,
        country_in: Monument.country_in,
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const Short_monument = (Monument: MonumentDB): Monument_Short => {
    return{
        id: Monument._id!.toString(),
        name: Monument.name,
    }
}