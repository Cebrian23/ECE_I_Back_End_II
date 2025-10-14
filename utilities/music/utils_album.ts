import { Album_Short, AlbumDB } from "../../types/music/Album.ts";

export const Short_Album = (Album: AlbumDB): Album_Short => {
    return{
        id: Album._id!.toString(),
        name: Album.name,
        cover: Album.cover,
        year_of_publish: Album.year_of_publish,
    }
}