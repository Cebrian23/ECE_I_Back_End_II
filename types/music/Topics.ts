import { Festivity, FestivityDB } from "../festivity/Festivity.ts";
import { Event, Event_Short, EventDB } from "../history/Event.ts";
import { Heraldry, HeraldryDB } from "../history/Heraldry.ts";
import { Monument, Monument_Short, MonumentDB } from "../history/Monument.ts";
import { Organization, Organization_Short, OrganizationDB } from "../history/Organization.ts";
import { Person, Person_Short, PersonDB } from "../history/Person.ts";
import { Legend, LegendDB } from "../legend/Legend.ts";
import { Mith, MithDB } from "../legend/Mith.ts";
import { Book, Book_Short, BookDB } from "../literature/Book.ts";

export type TopicsDB = {
    events?: EventDB[],
    organizations?: OrganizationDB[],
    people?: PersonDB[],
    books?: BookDB[],
    heraldries?: HeraldryDB[],
    legends?: LegendDB[],
    miths?: MithDB[],
    monuments?: MonumentDB[],
    festivities?: FestivityDB[],
}

export type Topics = {
    events?: Event[],
    organizations?: Organization[],
    people?: Person[],
    books?: Book[],
    heraldries?: Heraldry[],
    legends?: Legend[],
    miths?: Mith[],
    monuments?: Monument[],
    festivities?: Festivity[],
}

export type Topics_Short = {
    events?: Event_Short[],
    organizations?: Organization_Short[],
    people?: Person_Short[],
    books?: Book_Short[],
    heraldries?: Heraldry[],
    legends?: Legend[],
    miths?: Mith[],
    monuments?: Monument_Short[],
    festivities?: Festivity[],
}