import { MongoClient } from "mongodb";
import { EventDB } from "../types/history/Event.ts";
import { HeraldryDB } from "../types/history/Heraldry.ts";
import { OrganizationDB } from "../types/history/Organization.ts";
import { PersonDB } from "../types/history/Person.ts";
import { BookDB } from "../types/literature/Book.ts";
import { WriterDB } from "../types/literature/Writer.ts";
import { AlbumDB } from "../types/music/Album.ts";
import { BandDB } from "../types/music/Band.ts";
import { SongDB } from "../types/music/Song.ts";
import { LegendDB } from "../types/legend/Legend.ts";
import { FestivityDB } from "../types/festivity/Festivity.ts";
import { MithDB } from "../types/legend/Mith.ts";
import { MonumentDB } from "../types/history/Monument.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
    throw new Error("No se ha encontrado la clave MONGO URL");
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Cliente conectado");

const db = client.db("Historical-Music");

export const BandsCollection = db.collection<BandDB>("Bands");
export const AlbumsCollection = db.collection<AlbumDB>("Albums");
export const SongsCollection = db.collection<SongDB>("Songs");
export const WritersCollection = db.collection<WriterDB>("Writers");
export const BooksCollection = db.collection<BookDB>("Books");
export const EventsCollection = db.collection<EventDB>("Events");
export const OrganizationsCollection = db.collection<OrganizationDB>("Organizations");
export const PeopleCollection = db.collection<PersonDB>("People");
export const HeraldriesCollection = db.collection<HeraldryDB>("Heraldries");
export const LegendsCollection = db.collection<LegendDB>("Legends");
export const MithsCollection = db.collection<MithDB>("Miths");
export const FestivitiesCollection = db.collection<FestivityDB>("Festivities");
export const MonumentsCollection = db.collection<MonumentDB>("Monuments");