import { Collection } from "mongodb";
import { Album_Short, AlbumDB, Peticion_Album } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_song } from "./utils_song.ts";
import { BandDB } from "../../types/music/Band.ts";
import { Short_band } from "./utils_band.ts";
import { Topics } from "./util_topics.ts";
import { FestivityDB } from "../../types/festivity/Festivity.ts";
import { EventDB } from "../../types/history/Event.ts";
import { HeraldryDB } from "../../types/history/Heraldry.ts";
import { MonumentDB } from "../../types/history/Monument.ts";
import { OrganizationDB } from "../../types/history/Organization.ts";
import { PersonDB } from "../../types/history/Person.ts";
import { LegendDB } from "../../types/legend/Legend.ts";
import { MithDB } from "../../types/legend/Mith.ts";
import { BookDB } from "../../types/literature/Book.ts";
import { WriterDB } from "../../types/literature/Writer.ts";

export const Transform_Album = async (Album: AlbumDB, BandCol: Collection<BandDB>,
                                      AlbCol: Collection<AlbumDB>, SongCol: Collection<SongDB>,
                                      FesCol: Collection<FestivityDB>, EveCol: Collection<EventDB>,
                                      HerCol: Collection<HeraldryDB>, MonCol: Collection<MonumentDB>,
                                      OrgCol: Collection<OrganizationDB>, PeoCol: Collection<PersonDB>,
                                      LegCol: Collection<LegendDB>, MithCol: Collection<MithDB>,
                                      BookCol: Collection<BookDB>, WriCol: Collection<WriterDB>,
): Promise<Peticion_Album> => {
    const creator: BandDB | null = await BandCol.findOne({albums: Album._id});
    const songs: SongDB[] = await SongCol.find({_id: {$in: Album.songs}}).toArray();

    if(!creator){
        throw new Error(`No se ha encontrado banda creadora para el album "${Album.name}"`);
    }

    return{
        id: Album._id!.toString(),
        name: Album.name,
        year_of_publish: Album.year_of_publish,
        cover: Album.cover,
        songs: await Promise.all(songs.map(async (song) => await Short_song(song, AlbCol))),
        talk_about: await Topics(Album, FesCol, EveCol, HerCol, MonCol, OrgCol, PeoCol, LegCol, MithCol, BookCol, WriCol),
        conceptual_album: Album.conceptual_album,
        creator: Short_band(creator),
    }
}

export const Short_album = async (Album: AlbumDB, BandCol: Collection<BandDB>): Promise<Album_Short> => {
    const creator: BandDB | null = await BandCol.findOne({albums: Album._id});

    if(!creator){
        throw new Error(`No se ha encontrado banda creadora para el album "${Album.name}"`);
    }

    return{
        id: Album._id!.toString(),
        name: Album.name,
        cover: Album.cover,
        year_of_publish: Album.year_of_publish,
        creator: Short_band(creator),
    }
}