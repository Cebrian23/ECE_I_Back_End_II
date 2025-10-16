import { Collection } from "mongodb";
import { Organization_Short, OrganizationDB, Peticion_Organization } from "../../types/history/Organization.ts";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { Short_album } from "../music/utils_album.ts";
import { Short_song } from "../music/utils_song.ts";
import { EventDB } from "../../types/history/Event.ts";
import { PersonDB } from "../../types/history/Person.ts";
import { Short_person } from "./utils_person.ts";
import { Short_event } from "./utils_event.ts";
import { BandDB } from "../../types/music/Band.ts";

export const Transform_Organization = async (Organization: OrganizationDB, SongCol: Collection<SongDB>,
                                             AlbCol: Collection<AlbumDB>, EveCol: Collection<EventDB>,
                                             PeoCol: Collection<PersonDB>, BandCol: Collection<BandDB>
): Promise<Peticion_Organization> => {
    const songs_in: SongDB[] = await SongCol.find({_id: Organization._id}).toArray();
    const album_in: AlbumDB[] = await AlbCol.find({_id: Organization._id}).toArray();
    const people_in: PersonDB[] = await PeoCol.find({_id: Organization.distinguished_members}).toArray();
    const involved_in: EventDB[] = await EveCol.find({organizations_involved: Organization._id}).toArray();

    return{
        id: Organization._id!.toString(),
        name: Organization.name,
        logo: Organization.logo,
        creation: Organization.creation,
        dissolution: Organization.dissolution,
        distinguished_members: people_in.map((person) => Short_person(person)),
        involved_in: involved_in.map((event) => Short_event(event)),
        talked_about_in_song: await Promise.all(songs_in.map(async (song) => await Short_song(song, AlbCol))),
        talked_about_in_album: await Promise.all(album_in.map(async (album) => await Short_album(album, BandCol))),
    }
}

export const Short_organization = (Organization: OrganizationDB): Organization_Short => {
    return{
        id: Organization._id!.toString(),
        name: Organization.name,
    }
}