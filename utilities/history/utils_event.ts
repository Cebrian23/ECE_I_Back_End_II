import { Collection } from "mongodb";
import { Event_Short, EventDB, Peticion_Event } from "../../types/history/Event.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { PersonDB } from "../../types/history/Person.ts";
import { OrganizationDB } from "../../types/history/Organization.ts";
import { Short_organization } from "./utils_organization.ts";
import { Short_person } from "./utils_person.ts";
import { BandDB } from "../../types/music/Band.ts";

/**
 * Función que transforma un evento almacenado en la base de datos y devuelve todos sus datos
 * @param Event Es el evento que se va a transformar
 * @param SongCol Es la colección de canciones
 * @param AlbCol Es la colección de álbumes
 * @param BandCol Es la colección de bandas
 * @param OrgCol Es la colección de organizaciones
 * @param PeoCol Es la colección de personas
 * @returns Devuelve el evento transformado
 */
export const Transform_Event = async (Event: EventDB, SongCol: Collection<SongDB>,
                                      AlbCol: Collection<AlbumDB>, OrgCol: Collection<OrganizationDB>,
                                      PeoCol: Collection<PersonDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Event> => {
    const songs_in: SongDB[] = await SongCol.find({talk_about: Event._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({talk_about: Event._id}).toArray();
    const org_inv: OrganizationDB[] = await OrgCol.find({_id: {$in: Event.organizations_involved}}).toArray();
    const peo_inv: PersonDB[] = await PeoCol.find({_id: {$in: Event.people_involved}}).toArray();

    return{
        id: Event._id!.toString(),
        name: Event.name,
        start_date: Event.start_date,
        end_date: Event.end_date,
        people_involved: peo_inv.map((peo) => Short_person(peo)),
        organizations_involved: org_inv.map((org) => Short_organization(org)),
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol, BandCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

/**
 * Función que transforma un evento almacenado en la base de datos y devuelve una versión reducida de sus datos
 * @param Event Es el evento que se va a transformar
 * @returns Devuelve la versión reducida del evento
 */
export const Short_event = (Event: EventDB): Event_Short => {
    return{
        id: Event._id!.toString(),
        name: Event.name,
    }
}