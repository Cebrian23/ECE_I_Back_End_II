import { Collection } from "mongodb";
import { Person_Short, PersonDB, Peticion_Person } from "../../types/history/Person.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { OrganizationDB } from "../../types/history/Organization.ts";
import { EventDB } from "../../types/history/Event.ts";
import { Short_organization } from "./utils_organization.ts";
import { Short_event } from "./utils_event.ts";
import { BandDB } from "../../types/music/Band.ts";

/**
 * Función que transforma una persona almacenada en la base de datos y devuelve todos sus datos
 * @param Person Es la persona que se va a transformar
 * @param SongCol Es la colección de canciones
 * @param AlbCol Es la colección de álbumes
 * @param BandCol Es la colección de bandas
 * @param OrgCol Es la colección de organizaciones
 * @param EveCol Es la colección de eventos
 * @returns Devuelve la persona transformada
 */
export const Transform_Person = async (Person: PersonDB, SongCol: Collection<SongDB>,
                                       AlbCol: Collection<AlbumDB>, EveCol: Collection<EventDB>,
                                       OrgCol: Collection<OrganizationDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Person> => {
    const songs_in: SongDB[] = await SongCol.find({talk_about: Person._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({talk_about: Person._id}).toArray();
    const member_of: OrganizationDB[] = await OrgCol.find({distinguished_members: Person._id}).toArray();
    const involved_in: EventDB[] = await EveCol.find({people_involved: Person._id}).toArray();

    return{
        id: Person._id!.toString(),
        name: Person.name,
        surname: Person.surname,
        nickname: Person.nickname,
        birth_date: Person.birth_date,
        death_date: Person.death_date,
        image: Person.image,
        country_from: Person.country_from,
        historical_position: Person.historical_position,
        member_of: member_of.map((organization) => Short_organization(organization)),
        involved_in: involved_in.map((event) => Short_event(event)),
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol, BandCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

/**
 * Función que transforma una persona almacenada en la base de datos y devuelve una versión reducida de sus datos
 * @param Person Es la persona que se va a transformar
 * @returns Devuelve la versión reducida de la persona
 */
export const Short_person = (Person: PersonDB): Person_Short => {
    return{
        id: Person._id!.toString(),
        name: Person.name,
        surname: Person.surname,
        country_from: Person.country_from,
    }
}