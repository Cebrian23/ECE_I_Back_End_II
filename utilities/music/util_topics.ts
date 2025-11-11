import { Collection } from "mongodb";
import { AlbumDB } from "../../types/music/Album.ts";
import { SongDB } from "../../types/music/Song.ts";
import { FestivityDB } from "../../types/festivity/Festivity.ts";
import { EventDB } from "../../types/history/Event.ts";
import { HeraldryDB } from "../../types/history/Heraldry.ts";
import { MonumentDB } from "../../types/history/Monument.ts";
import { OrganizationDB } from "../../types/history/Organization.ts";
import { PersonDB } from "../../types/history/Person.ts";
import { LegendDB } from "../../types/legend/Legend.ts";
import { MithDB } from "../../types/legend/Mith.ts";
import { BookDB } from "../../types/literature/Book.ts";
import { Topics_Short } from "../../types/music/Topics.ts";
import { Short_event } from "../history/utils_event.ts";
import { Short_heraldry } from "../history/utils_heraldry.ts";
import { Short_monument } from "../history/utils_monument.ts";
import { Short_organization } from "../history/utils_organization.ts";
import { Short_person } from "../history/utils_person.ts";
import { FestivityDBToFestivity } from "../festivity/utils_festivity.ts";
import { LegendDBToLegend } from "../legend/utils_legend.ts";
import { MithDBToMith } from "../legend/utils_mith.ts";
import { Short_book } from "../literature/utils_book.ts";
import { WriterDB } from "../../types/literature/Writer.ts";

/**
 * Función para extraer los temas de los que hablan las canciones y los álbumes
 * @param Topic Es la canción o álbum del que hay que extraer los temas de los que hablan
 * @param FesCol Es la colección de festividades
 * @param EveCol Es la colección de eventos
 * @param HerCol Es la colección de heráldicas
 * @param MonCol Es la colección de monumentos
 * @param OrgCol Es la colección de organizaciones
 * @param PeoCol Es la colección de personas
 * @param LegCol Es la colección de leyendas
 * @param MithCol Es la colección de mitos
 * @param BookCol Es la colección de libros
 * @param WriCol Es la colección de escritores
 * @returns Devuelve los temas que abordan las canciones y los álbumes
 */
export const Topics = async (Topic: SongDB | AlbumDB, FesCol: Collection<FestivityDB>,
                             EveCol: Collection<EventDB>, HerCol: Collection<HeraldryDB>,
                             MonCol: Collection<MonumentDB>, OrgCol: Collection<OrganizationDB>,
                             PeoCol: Collection<PersonDB>, LegCol: Collection<LegendDB>,
                             MithCol: Collection<MithDB>, BookCol: Collection<BookDB>,
                             WriCol: Collection<WriterDB>,
): Promise<Topics_Short> => {
    const festivities = await FesCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const events = await EveCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const heraldries = await HerCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const monuments = await MonCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const organizations = await OrgCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const people = await PeoCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const legends = await LegCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const miths = await MithCol.find({_id: {$in: Topic.talk_about}}).toArray();
    const books = await BookCol.find({_id: {$in: Topic.talk_about}}).toArray();

    return{
        festivities: festivities.map((festivity) => FestivityDBToFestivity(festivity)),
        events: events.map((event) => Short_event(event)),
        heraldries: heraldries.map((heraldry) => Short_heraldry(heraldry)),
        monuments: monuments.map((monument) => Short_monument(monument)),
        organizations: organizations.map((organization) => Short_organization(organization)),
        people: people.map((person) => Short_person(person)),
        legends: legends.map((legend) => LegendDBToLegend(legend)),
        miths: miths.map((mith) => MithDBToMith(mith)),
        books: await Promise.all(books.map(async (book) => await Short_book(book, WriCol)))
    }
}