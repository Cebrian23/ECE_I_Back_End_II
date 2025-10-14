import { Collection } from "mongodb";
import { LegendDB, Peticion_Legend } from "../../types/legend/Legend.ts";
import { Album_Short, AlbumDB } from "../../types/music/Album.ts";
import { Song_Short, SongDB } from "../../types/music/Song.ts";
import { Short_Song } from "../music/utils_song.ts";
import { Short_Album } from "../music/utils_album.ts";

export const Transform_Legend = async (legend: LegendDB, SongCol: Collection<SongDB>, AlbCol: Collection<AlbumDB>): Promise<Peticion_Legend> => {
    const song_db: SongDB[] = await SongCol.find({talk_about: legend._id}).toArray();
    const album_db: AlbumDB[] = await AlbCol.find({talk_about: legend._id}).toArray();
    
    const song_in: Song_Short[] = await Promise.all(song_db.map(async (song) => await Short_Song(song, AlbCol)));
    const album_in: Album_Short[] = album_db.map((album) => Short_Album(album));

    return{
        id: legend._id!.toString(),
        name: legend.name,
        talked_about_in_song: song_in,
        talked_about_in_album: album_in,
    }
}