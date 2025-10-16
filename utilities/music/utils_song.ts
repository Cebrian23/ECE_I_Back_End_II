import { Collection } from "mongodb";
import { Peticion_Song, Song_Short, SongDB } from "../../types/music/Song.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { Short_album } from "./utils_album.ts";
import { BandDB } from "../../types/music/Band.ts";
import { Topics } from "./util_topics.ts";
import { FestivityDB } from "../../types/festivity/Festivity.ts";
import { EventDB } from "../../types/history/Event.ts";
import { HeraldryDB } from "../../types/history/Heraldry.ts";
import { MonumentDB } from "../../types/history/Monument.ts";
import { OrganizationDB } from "../../types/history/Organization.ts";
import { PersonDB } from "../../types/history/Person.ts";
import { LegendDB } from "../../types/legend/Legend.ts";
import { MithDB } from "../../types/legend/Mith.ts";
import { WriterDB } from "../../types/literature/Writer.ts";
import { BookDB } from "../../types/literature/Book.ts";

export const Transform_Song = async (Song: SongDB, AlbCol: Collection<AlbumDB>, BandCol: Collection<BandDB>,
                                     FesCol: Collection<FestivityDB>, EveCol: Collection<EventDB>,
                                     HerCol: Collection<HeraldryDB>, MonCol: Collection<MonumentDB>,
                                     OrgCol: Collection<OrganizationDB>, PeoCol: Collection<PersonDB>,
                                     LegCol: Collection<LegendDB>, MithCol: Collection<MithDB>,
                                     BookCol: Collection<BookDB>, WriCol: Collection<WriterDB>,
): Promise<Peticion_Song> => {
    const album: AlbumDB | null = await AlbCol.findOne({songs: Song._id});

    if(!album){
        throw new Error(`No se ha encontrado album para la canción "${Song.name}"`);
    }

    return{
        id: Song._id!.toString(),
        name: Song.name,
        talk_about: await Topics(Song, FesCol, EveCol, HerCol, MonCol, OrgCol, PeoCol, LegCol, MithCol, BookCol, WriCol),
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