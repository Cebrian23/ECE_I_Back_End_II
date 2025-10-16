import { AlbumsCollection, BandsCollection, BooksCollection,
         EventsCollection, FestivitiesCollection, HeraldriesCollection, LegendsCollection,
         MithsCollection, MonumentsCollection, OrganizationsCollection,
         PeopleCollection, SongsCollection, WritersCollection } from "./db/conection.ts";
import { LegendDB, Peticion_Legend } from "./types/legend/Legend.ts";
import { Transform_Legend } from "./utilities/legend/utils_legend.ts";
import { Peticion_Mith } from "./types/legend/Mith.ts";
import { Transform_Mith } from "./utilities/legend/utils_mith.ts";
import { BookDB, Peticion_Book } from "./types/literature/Book.ts";
import { Transform_Book } from "./utilities/literature/utils_book.ts";
import { PersonDB, Peticion_Person } from "./types/history/Person.ts";
import { Transform_Person } from "./utilities/history/utils_person.ts";
import { OrganizationDB, Peticion_Organization } from "./types/history/Organization.ts";
import { Transform_Organization } from "./utilities/history/utils_organization.ts";
import { HeraldryDB, Peticion_Heraldry } from "./types/history/Heraldry.ts";
import { Transform_Heraldry } from "./utilities/history/utils_heraldry.ts";
import { EventDB, Peticion_Event } from "./types/history/Event.ts";
import { Transform_Event } from "./utilities/history/utils_event.ts";
import { ObjectId } from "mongodb";
import { Transform_Band } from "./utilities/music/utils_band.ts";
import { Transform_Album } from "./utilities/music/utils_album.ts";
import { Transform_Song } from "./utilities/music/utils_song.ts";
import { MonumentDB, Peticion_Monument } from "./types/history/Monument.ts";
import { Transform_Monument } from "./utilities/history/utils_monument.ts";
import { Transform_Festivity } from "./utilities/festivity/utils_festivity.ts";
import { FestivityDB } from "./types/festivity/Festivity.ts";

const handler = async (req: Request): Promise<Response> => {
	const method = req.method;
	const url = new URL(req.url);
	const path = url.pathname;
  const searchParams = url.searchParams;

	if(method === "GET"){
    if(path === "/band/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const band_db = await BandsCollection.findOne({_id: new ObjectId(id)});

      const band = await Transform_Band(band_db!, AlbumsCollection, BandsCollection);

      return new Response(
        JSON.stringify(band),
        {
          status: 200,
        }
      );
    }
    else if(path === "/album/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const album_db = await AlbumsCollection.findOne({_id: new ObjectId(id)});

      const album = await Transform_Album(album_db!, BandsCollection, AlbumsCollection,
                                          SongsCollection, FestivitiesCollection,
                                          EventsCollection, HeraldriesCollection,
                                          MonumentsCollection, OrganizationsCollection,
                                          PeopleCollection, LegendsCollection,
                                          MithsCollection, BooksCollection, WritersCollection);

      return new Response(
        JSON.stringify(album),
        {
          status: 200,
        }
      );
    }
    else if(path === "/song/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const song_db = await SongsCollection.findOne({_id: new ObjectId(id)});

      const song = await Transform_Song(song_db!, AlbumsCollection,
                                        BandsCollection, FestivitiesCollection,
                                        EventsCollection, HeraldriesCollection,
                                        MonumentsCollection, OrganizationsCollection,
                                        PeopleCollection, LegendsCollection,
                                        MithsCollection, BooksCollection, WritersCollection
      );

      return new Response(
        JSON.stringify(song),
        {
          status: 200,
        }
      );
    }
    else if(path === "/events"){
      const events_db: EventDB[] = await EventsCollection.find().toArray();

      const events: Peticion_Event[] = await Promise.all(events_db.map(async (event) => await Transform_Event(event, SongsCollection,
                                                                                                              AlbumsCollection, EventsCollection,
                                                                                                              PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(events),
        {
          status: 200,
        }
      );
    }
    else if(path === "/event/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const event_db = await EventsCollection.findOne({_id: new ObjectId(id)});

      const event = Transform_Event(event_db!, SongsCollection, AlbumsCollection, OrganizationsCollection, PeopleCollection, BandsCollection);

      return new Response(
        JSON.stringify(event),
        {
          status: 200,
        }
      );
    }
    else if(path === "/events/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const events_db = await EventsCollection.find({name: name}).toArray();

      const events = await Promise.all(events_db.map(async (event) => await Transform_Event(event, SongsCollection, AlbumsCollection,
                                                                                            OrganizationsCollection, PeopleCollection,
                                                                                            BandsCollection)));

      return new Response(
        JSON.stringify(events),
        {
          status: 200,
        }
      );
    }
    else if(path === "/events/start_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de inicio");
      }

      const events_db: EventDB[] = await EventsCollection.find().toArray();
      const eve_selection: EventDB[] = [];

      events_db.forEach((event) => {
        const date = event.start_date?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year))){
              eve_selection.push(event);
            }
            else if(date.ac_dc === "d.C"){
              eve_selection.push(event);
            }
          }
          else if(ac_dc === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year))){
              eve_selection.push(event);
            }
          }
        }
      });

      const events: Peticion_Event[] = await Promise.all(eve_selection.map(async (event) => await Transform_Event(event, SongsCollection,
                                                                                                                  AlbumsCollection, EventsCollection,
                                                                                                                  PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(events),
        {
          status: 200,
        }
      );
    }
    else if(path === "/events/end_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de fin");
      }

      const events_db: EventDB[] = await EventsCollection.find().toArray();
      const eve_selection: EventDB[] = [];

      events_db.forEach((event) => {
        const date = event.end_date?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year))){
              eve_selection.push(event);
            }
          }
          else if(ac_dc === "d.C"){
            if(date.ac_dc === "a.C"){
              eve_selection.push(event);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year))){
              eve_selection.push(event);
            }
          }
        }
      });

      const events: Peticion_Event[] = await Promise.all(eve_selection.map(async (event) => await Transform_Event(event, SongsCollection,
                                                                                                                  AlbumsCollection, EventsCollection,
                                                                                                                  PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(events),
        {
          status: 200,
        }
      );
    }
    else if(path === "/events/double_date"){
      const year_a = searchParams.get("year");
      const ac_dc_a= searchParams.get("ac_dc");
      const year_b = searchParams.get("year");
      const ac_dc_b= searchParams.get("ac_dc");

      if(!year_a || !ac_dc_a || !year_b || !ac_dc_b){
        throw new Error("No se ha encontrado el año de inicio y fin");
      }

      const events_db: EventDB[] = await EventsCollection.find().toArray();
      const eve_selection_1: EventDB[] = [];
      const eve_selection_2: EventDB[] = [];
      const eve_sel_final: EventDB[] = [];

      events_db.forEach((event) => {
        const date = event.start_date?.normal_date;
        if(date !== undefined){
          if(ac_dc_a === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year_a))){
              eve_selection_1.push(event);
            }
            else if(date.ac_dc === "d.C"){
              eve_selection_1.push(event);
            }
          }
          else if(ac_dc_a === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year_a))){
              eve_selection_1.push(event);
            }
          }
        }
      });

      events_db.forEach((event) => {
        const date = event.end_date?.normal_date;
        if(date !== undefined){
          if(ac_dc_b === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year_b))){
              eve_selection_2.push(event);
            }
          }
          else if(ac_dc_b === "d.C"){
            if(date.ac_dc === "a.C"){
              eve_selection_2.push(event);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year_b))){
              eve_selection_2.push(event);
            }
          }
        }
      });

      eve_selection_1.forEach((event_1) => {
        eve_selection_2.forEach((event_2)  => {
          if(event_1._id === event_2._id){
            eve_sel_final.push(event_1);
          }
        });
      });

      const events: Peticion_Event[] = await Promise.all(eve_sel_final.map(async (event) => await Transform_Event(event, SongsCollection,
                                                                                                                  AlbumsCollection, EventsCollection,
                                                                                                                  PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(events),
        {
          status: 200,
        }
      );
    }
    else if(path === "/heraldries"){
      const heraldries_db: HeraldryDB[] = await HeraldriesCollection.find().toArray();

      const heraldries: Peticion_Heraldry[] = await Promise.all(heraldries_db.map(async (heraldry) => await Transform_Heraldry(heraldry, SongsCollection,
                                                                                                                               AlbumsCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(heraldries),
        {
          status: 200,
        }
      );
    }
    else if(path === "/heraldry/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const heraldry_db = await HeraldriesCollection.findOne({_id: new ObjectId(id)});

      const heraldry = await Transform_Heraldry(heraldry_db!, SongsCollection, AlbumsCollection, BandsCollection);

      return new Response(
        JSON.stringify(heraldry),
        {
          status: 200,
        }
      );
    }
    else if(path === "/heraldries/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const heraldries_db = await HeraldriesCollection.find({name: name}).toArray();

      const heraldries = await Promise.all(heraldries_db.map(async (heraldry) => await Transform_Heraldry(heraldry, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(heraldries),
        {
          status: 200,
        }
      );
    }
    else if(path === "/monuments"){
      const monuments_db: MonumentDB[] = await MonumentsCollection.find().toArray();

      const monuments: Peticion_Monument[] = await Promise.all(monuments_db.map(async (monument) => await Transform_Monument(monument, SongsCollection,
                                                                                                                             AlbumsCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(monuments),
        {
          status: 200,
        }
      );
    }
    else if(path === "/monument/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const monument_db = await MonumentsCollection.findOne({_id: new ObjectId(id)});

      const monument = await Transform_Monument(monument_db!, SongsCollection, AlbumsCollection, BandsCollection);

      return new Response(
        JSON.stringify(monument),
        {
          status: 200,
        }
      );
    }
    else if(path === "/monuments/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const monuments_db = await MonumentsCollection.find({name: name}).toArray();

      const monuments = await Promise.all(monuments_db.map(async (monument) => await Transform_Monument(monument, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(monuments),
        {
          status: 200,
        }
      );
    }
    else if(path === "/monuments/country_in"){
      const country_in = searchParams.get("country_in")?.replace("%20", " ");

      if(!country_in){
        throw new Error("No se ha encontrado el país de localización");
      }

      const monuments_db = await MonumentsCollection.find({country_in: country_in}).toArray();

      const monuments = await Promise.all(monuments_db.map(async (monument) => await Transform_Monument(monument, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(monuments),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organizations"){
      const organizations_db: OrganizationDB[] = await OrganizationsCollection.find().toArray();

      const organizations: Peticion_Organization[] = await Promise.all(organizations_db.map(async (org) => await Transform_Organization(org, SongsCollection,
                                                                                                                                        AlbumsCollection, EventsCollection,
                                                                                                                                        PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(organizations),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organization/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const organization_db = await OrganizationsCollection.findOne({_id: new ObjectId(id)});

      const organization = await Transform_Organization(organization_db!, SongsCollection, AlbumsCollection,
                                                        EventsCollection, PeopleCollection, BandsCollection);
      
      return new Response(
        JSON.stringify(organization),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organizations/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const organizations_db = await OrganizationsCollection.find({name: name}).toArray();

      const organizations = await Promise.all(organizations_db.map(async (organization) => await Transform_Organization(organization, SongsCollection, AlbumsCollection,
                                                                                                                      EventsCollection, PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(organizations),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organizations/creation_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de creación");
      }

      const organizations_db: OrganizationDB[] = await OrganizationsCollection.find().toArray();
      const org_selection: OrganizationDB[] = [];

      organizations_db.forEach((organization) => {
        const date = organization.creation?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year))){
              org_selection.push(organization);
            }
            else if(date.ac_dc === "d.C"){
              org_selection.push(organization);
            }
          }
          else if(ac_dc === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year))){
              org_selection.push(organization);
            }
          }
        }
      });

      const organizations: Peticion_Organization[] = await Promise.all(org_selection.map(async (org) => await Transform_Organization(org, SongsCollection,
                                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                                     PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(organizations),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organizations/dissolution_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de disolución");
      }

      const organizations_db: OrganizationDB[] = await OrganizationsCollection.find().toArray();
      const org_selection: OrganizationDB[] = [];

      organizations_db.forEach((organization) => {
        const date = organization.dissolution?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year))){
              org_selection.push(organization);
            }
          }
          else if(ac_dc === "d.C"){
            if(date.ac_dc === "a.C"){
              org_selection.push(organization);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year))){
              org_selection.push(organization);
            }
          }
        }
      });

      const organizations: Peticion_Organization[] = await Promise.all(org_selection.map(async (org) => await Transform_Organization(org, SongsCollection,
                                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                                     PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(organizations),
        {
          status: 200,
        }
      );
    }
    else if(path === "/organizations/double_date"){
      const year_a = searchParams.get("year");
      const ac_dc_a= searchParams.get("ac_dc");
      const year_b = searchParams.get("year");
      const ac_dc_b= searchParams.get("ac_dc");

      if(!year_a || !ac_dc_a || !year_b || !ac_dc_b){
        throw new Error("No se ha encontrado el año de creación y disolución");
      }

      const organizations_db: OrganizationDB[] = await OrganizationsCollection.find().toArray();
      const org_selection_1: OrganizationDB[] = [];
      const org_selection_2: OrganizationDB[] = [];
      const org_sel_final: OrganizationDB[] = [];

      organizations_db.forEach((organization) => {
        const date = organization.creation?.normal_date;
        if(date !== undefined){
          if(ac_dc_a === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year_a))){
              org_selection_1.push(organization);
            }
            else if(date.ac_dc === "d.C"){
              org_selection_1.push(organization);
            }
          }
          else if(ac_dc_a === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year_a))){
              org_selection_1.push(organization);
            }
          }
        }
      });

      organizations_db.forEach((organization) => {
        const date = organization.dissolution?.normal_date;
        if(date !== undefined){
          if(ac_dc_b === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year_b))){
              org_selection_2.push(organization);
            }
          }
          else if(ac_dc_b === "d.C"){
            if(date.ac_dc === "a.C"){
              org_selection_2.push(organization);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year_b))){
              org_selection_2.push(organization);
            }
          }
        }
      });

      const organizations: Peticion_Organization[] = await Promise.all(org_sel_final.map(async (org) => await Transform_Organization(org, SongsCollection,
                                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                                     PeopleCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(organizations),
        {
          status: 200,
        }
      );
    }
    else if(path === "/people"){
      const people_db: PersonDB[] = await PeopleCollection.find().toArray();

      const people: Peticion_Person[] = await Promise.all(people_db.map(async (person) => await Transform_Person(person, SongsCollection,
                                                                                                                 AlbumsCollection, EventsCollection,
                                                                                                                 OrganizationsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(people),
        {
          status: 200,
        }
      );
    }
    else if(path === "/person/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const person_db = await PeopleCollection.findOne({_id: new ObjectId(id)});

      const person = await Transform_Person(person_db!, SongsCollection, AlbumsCollection,
                                            EventsCollection, OrganizationsCollection, BandsCollection);
      
      return new Response(
        JSON.stringify(person),
        {
          status: 200,
        }
      );
    }
    else if(path === "/people/complete_name"){
      const name = searchParams.get("name")?.replace("%20", " ");
      const surname = searchParams.get("surname")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      let people_db: PersonDB[] = [];
      
      if(name && surname){
        people_db = await PeopleCollection.find({name: name, surname: surname}).toArray();
      }
      else if(name && !surname){
        people_db = await PeopleCollection.find({name: name}).toArray();
      }

      const people = await Promise.all(people_db.map(async (person) => await Transform_Person(person, SongsCollection, AlbumsCollection,
                                                                                              EventsCollection, OrganizationsCollection,
                                                                                              BandsCollection)));
      
      return new Response(
        JSON.stringify(people),
        {
          status: 200,
        }
      );
    }
    else if(path === "/people/birth_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de nacimiento");
      }

      const people_db: PersonDB[] = await PeopleCollection.find().toArray();
      const peo_selection: PersonDB[] = [];

      people_db.forEach((person) => {
        const date = person.birth_date?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year))){
              peo_selection.push(person);
            }
            else if(date.ac_dc === "d.C"){
              peo_selection.push(person);
            }
          }
          else if(ac_dc === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year))){
              peo_selection.push(person);
            }
          }
        }
      });

      const people: Peticion_Person[] = await Promise.all(peo_selection.map(async (person) => await Transform_Person(person, SongsCollection,
                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                     OrganizationsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(people),
        {
          status: 200,
        }
      );
    }
    else if(path === "/people/death_date"){
      const year = searchParams.get("year");
      const ac_dc = searchParams.get("ac_dc");

      if(!year || !ac_dc){
        throw new Error("No se ha encontrado el año de fallecimiento");
      }

      const people_db: PersonDB[] = await PeopleCollection.find().toArray();
      const peo_selection: PersonDB[] = [];

      people_db.forEach((person) => {
        const date = person.death_date?.normal_date;
        if(date !== undefined){
          if(ac_dc === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year))){
              peo_selection.push(person);
            }
          }
          else if(ac_dc === "d.C"){
            if(date.ac_dc === "a.C"){
              peo_selection.push(person);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year))){
              peo_selection.push(person);
            }
          }
        }
      });

      const people: Peticion_Person[] = await Promise.all(peo_selection.map(async (person) => await Transform_Person(person, SongsCollection,
                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                     OrganizationsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(people),
        {
          status: 200,
        }
      );
    }
    else if(path === "/people/double_date"){
      const year_a = searchParams.get("year");
      const ac_dc_a= searchParams.get("ac_dc");
      const year_b = searchParams.get("year");
      const ac_dc_b= searchParams.get("ac_dc");

      if(!year_a || !ac_dc_a || !year_b || !ac_dc_b){
        throw new Error("No se ha encontrado el año de nacimiento y fallecimiento");
      }

      const people_db: PersonDB[] = await PeopleCollection.find().toArray();
      const peo_selection_1: PersonDB[] = [];
      const peo_selection_2: PersonDB[] = [];
      const peo_sel_final: PersonDB[] = [];

      people_db.forEach((person) => {
        const date = person.birth_date?.normal_date;
        if(date !== undefined){
          if(ac_dc_a === "a.C"){
            if((date.ac_dc === "a.C") && (date.year <= Number(year_a))){
              peo_selection_1.push(person);
            }
            else if(date.ac_dc === "d.C"){
              peo_selection_1.push(person);
            }
          }
          else if(ac_dc_a === "d.C"){
            if((date.ac_dc === "d.C") && (date.year >= Number(year_a))){
              peo_selection_1.push(person);
            }
          }
        }
      });

      people_db.forEach((person) => {
        const date = person.death_date?.normal_date;
        if(date !== undefined){
          if(ac_dc_b === "a.C"){
            if((date.ac_dc === "a.C") && (date.year >= Number(year_b))){
              peo_selection_2.push(person);
            }
          }
          else if(ac_dc_b === "d.C"){
            if(date.ac_dc === "a.C"){
              peo_selection_2.push(person);
            }
            else if((date.ac_dc === "d.C") && (date.year <= Number(year_b))){
              peo_selection_2.push(person);
            }
          }
        }
      });

      const people: Peticion_Person[] = await Promise.all(peo_sel_final.map(async (person) => await Transform_Person(person, SongsCollection,
                                                                                                                     AlbumsCollection, EventsCollection,
                                                                                                                     OrganizationsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(people),
        {
          status: 200,
        }
      );
    }
    else if(path === "/writer/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }
    }
		else if(path === "/books"){
      const books_db: BookDB[] = await BooksCollection.find().toArray();

      const books: Peticion_Book[] = await Promise.all(books_db.map(async (book) => await Transform_Book(book, WritersCollection, SongsCollection,
                                                                                                         AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(books),
        {
          status: 200,
        }
      );
    }
		else if(path === "/book/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const book_db = await BooksCollection.findOne({_id: new ObjectId(id)});

      const book = await Transform_Book(book_db!, WritersCollection,
                                        SongsCollection, AlbumsCollection,
                                        BandsCollection);

      return new Response(
        JSON.stringify(book),
        {
          status: 200,
        }
      );
    }
    else if(path === "/books/title"){
      const title = searchParams.get("title")?.replace("%20", " ");

      if(!title){
        throw new Error("No se ha encontrado el título");
      }

      const books_db = await BooksCollection.find({title: title}).toArray();

      const books = await Promise.all(books_db.map(async (book) => await Transform_Book(book, WritersCollection,
                                                                                        SongsCollection, AlbumsCollection,
                                                                                        BandsCollection)));

      return new Response(
        JSON.stringify(books),
        {
          status: 200,
        }
      );
    }
    else if(path === "/books/min_date"){
      const year = searchParams.get("year");

      if(!year){
        throw new Error("No se ha encontrado el año de publicación minimo");
      }

      const books_db: BookDB[] = await BooksCollection.find().toArray();
      const book_selection: BookDB[] = [];

      books_db.forEach((book) => {
        if(book.year_of_publish! >= Number(year)){
          book_selection.push(book);
        }
      });

      const books: Peticion_Book[] = await Promise.all(book_selection.map(async (book) => await Transform_Book(book, WritersCollection, SongsCollection,
                                                                                                               AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(books),
        {
          status: 200,
        }
      );
    }
    else if(path === "/books/max_date"){
      const year = searchParams.get("year");

      if(!year){
        throw new Error("No se ha encontrado el año de publicación máximo");
      }

      const books_db: BookDB[] = await BooksCollection.find().toArray();
      const book_selection: BookDB[] = [];

      books_db.forEach((book) => {
        if(book.year_of_publish! <= Number(year)){
          book_selection.push(book);
        }
      });

      const books: Peticion_Book[] = await Promise.all(book_selection.map(async (book) => await Transform_Book(book, WritersCollection, SongsCollection,
                                                                                                               AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(books),
        {
          status: 200,
        }
      );
    }
    else if(path === "/books/double_date"){
      const year_a = searchParams.get("year");
      const year_b = searchParams.get("year");

      if(!year_a || !year_b){
        throw new Error("No se ha encontrado el año de inicio y fin");
      }

      const books_db: BookDB[] = await BooksCollection.find().toArray();
      const book_selection: BookDB[] = [];

      books_db.forEach((book) => {
        if((book.year_of_publish! >= Number(year_a)) && (book.year_of_publish !<= Number(year_b))){
          book_selection.push(book);
        }
      });

      const books: Peticion_Book[] = await Promise.all(book_selection.map(async (book) => await Transform_Book(book, WritersCollection, SongsCollection,
                                                                                                               AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(books),
        {
          status: 200,
        }
      );
    }
    else if(path === "/legends"){
      const legends_db: LegendDB[] = await LegendsCollection.find().toArray();

      const legends: Peticion_Legend[] = await Promise.all(legends_db.map(async (legend) => await Transform_Legend(legend, SongsCollection,
                                                                                                                   AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(legends),
        {
          status: 200,
        }
      );
    }
    else if(path === "/legend/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const legend_db = await LegendsCollection.findOne({_id: new ObjectId(id)});

      const legend = await Transform_Legend(legend_db!, SongsCollection,
                                            AlbumsCollection, BandsCollection);

      return new Response(
        JSON.stringify(legend),
        {
          status: 200,
        }
      );
    }
    else if(path === "/legends/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const legends_db = await LegendsCollection.find({name: name}).toArray();

      const legends = await Promise.all(legends_db.map(async (legend) => await Transform_Legend(legend, SongsCollection,
                                                                                                AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(legends),
        {
          status: 200,
        }
      );
    }
    else if(path === "/miths"){
      const miths_db: LegendDB[] = await MithsCollection.find().toArray();

      const miths: Peticion_Mith[] = await Promise.all(miths_db.map(async (mith) => await Transform_Mith(mith, SongsCollection,
                                                                                                        AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(miths),
        {
          status: 200,
        }
      );
    }
    else if(path === "/mith/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const mith_db = await MithsCollection.findOne({_id: new ObjectId(id)});

      const mith = await Transform_Mith(mith_db!, SongsCollection,
                                        AlbumsCollection, BandsCollection);
      
      return new Response(
        JSON.stringify(mith),
        {
          status: 200,
        }
      );
    }
    else if(path === "/miths/name"){
      const name = searchParams.get("name")?.replace("%20", " ");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const miths_db = await MithsCollection.find({name: name}).toArray();

      const miths = await Promise.all(miths_db.map(async (mith) => await Transform_Mith(mith, SongsCollection,
                                                                                        AlbumsCollection, BandsCollection)));
      
      return new Response(
        JSON.stringify(miths),
        {
          status: 200,
        }
      );
    }
    else if(path === "/festivities"){
      const festivities_db = await FestivitiesCollection.find().toArray();

      const festivities = await Promise.all(festivities_db.map(async (festivity) => await Transform_Festivity(festivity, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(festivities),
        {
          status: 200,
        }
      );
    }
    else if(path === "/festivity/id"){
      const id = searchParams.get("id");

      if(!id){
        throw new Error("No se ha encontrado el id");
      }

      const festivity_db = await FestivitiesCollection.findOne({_id: new ObjectId(id)});

      const festivity = await Transform_Festivity(festivity_db!, SongsCollection, AlbumsCollection, BandsCollection);

      return new Response(
        JSON.stringify(festivity),
        {
          status: 200,
        }
      );
    }
    else if(path === "/festivities/name"){
      const name = searchParams.get("name");

      if(!name){
        throw new Error("No se ha encontrado el nombre");
      }

      const festivities_db = await FestivitiesCollection.find({name: name}).toArray();

      const festivities = await Promise.all(festivities_db.map(async (festivity) => await Transform_Festivity(festivity, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(festivities),
        {
          status: 200,
        }
      );
    }
    else if(path === "/festivities/date"){
      const month = searchParams.get("month");
      const day = searchParams.get("day");

      if(!month || !day){
        throw new Error("Falta la fecha completa de la festividad");
      }

      const festivities_db = await FestivitiesCollection.find().toArray();
      const fest_selection: FestivityDB[] = [];

      festivities_db.forEach((fest) => {
        if((fest.date.month === month) && (fest.date.day === Number(day))){
          fest_selection.push(fest);
        }
      });

      const festivities = await Promise.all(fest_selection.map(async (festivity) => await Transform_Festivity(festivity, SongsCollection, AlbumsCollection, BandsCollection)));

      return new Response(
        JSON.stringify(festivities),
        {
          status: 200,
        }
      );
    }
	}

	return new Response(
		"Path not found",
		{
			status: 404,
		}
	);
};

Deno.serve({ port: 4000 }, handler);