import { Collection } from "mongodb";
import { MithDB, Peticion_Mith } from "../../types/legend/Mith.ts";
import { AlbumDB, Album_Short } from "../../types/music/Album.ts";
import { SongDB, Song_Short } from "../../types/music/Song.ts";
import { Short_Album } from "../music/utils_album.ts";
import { Short_Song } from "../music/utils_song.ts";

export const Transform_Mith = async (mith: MithDB, SongCol: Collection<SongDB>, AlbCol: Collection<AlbumDB>): Promise<Peticion_Mith> => {
    const song_db: SongDB[] = await SongCol.find({talk_about: mith._id}).toArray();
    const album_db: AlbumDB[] = await AlbCol.find({talk_about: mith._id}).toArray();
    
    const song_in: Song_Short[] = await Promise.all(song_db.map(async (song) => await Short_Song(song, AlbCol)));
    const album_in: Album_Short[] = album_db.map((album) => Short_Album(album));

    return{
        id: mith._id!.toString(),
        name: mith.name,
        talked_about_in_song: song_in,
        talked_about_in_album: album_in,
    }
}