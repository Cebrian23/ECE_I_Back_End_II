import { Collection } from "mongodb";
import { Song_Short, SongDB } from "../../types/music/Song.ts";
import { AlbumDB } from "../../types/music/Album.ts";

export const Short_Song = async (Song: SongDB, AlbCol: Collection<AlbumDB>): Promise<Song_Short> => {
    const album: AlbumDB | null = await AlbCol.findOne({songs: Song._id});

    if(!album){
        return{
            id: Song._id!.toString(),
            name: Song.name,
            cover: "",
        }
    }

    return{
        id: Song._id!.toString(),
        name: Song.name,
        cover: album.cover
    }
}