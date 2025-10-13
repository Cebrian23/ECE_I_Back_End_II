import { ObjectId } from "mongodb";
import { AlbumsCollection, BandsCollection, BooksCollection,
         EventsCollection, HeraldriesCollection, LegendsCollection,
         MithsCollection, MonumentsCollection, OrganizationsCollection,
         PeopleCollection, SongsCollection, WritersCollection } from "./db/conection.ts";

const handler = async (req: Request): Promise<Response> => {
	const method = req.method;
	const url = new URL(req.url);
	const path = url.pathname;

	if(method === "GET"){
    if(path.startsWith("/bands")){
      //
    }
    else if(path.startsWith("/band/_id")){
      //
    }
    else if(path.startsWith("/band/name")){
      //
    }
    else if(path.startsWith("/albums")){
      //
    }
    else if(path.startsWith("/album/_id")){
      //
    }
    else if(path.startsWith("/album/name")){
      //
    }
    else if(path.startsWith("/songs")){
      //
    }
    else if(path.startsWith("/song/_id")){
      //
    }
    else if(path.startsWith("/song/name")){
      //
    }
    else if(path.startsWith("/events")){
      //
    }
    else if(path.startsWith("/event/_id")){
      //
    }
    else if(path.startsWith("/event/name")){
      //
    }
    else if(path.startsWith("/events/start_date")){
      //
    }
    else if(path.startsWith("/events/end_date")){
      //
    }
    else if(path.startsWith("/events/double_date")){
      //
    }
    else if(path.startsWith("/heraldries")){
      //
    }
    else if(path.startsWith("/heraldry/id")){
      //
    }
    else if(path.startsWith("/heraldry/name")){
      //
    }
    else if(path.startsWith("/monuments")){
      //
    }
    else if(path.startsWith("/monument/id")){
      //
    }
    else if(path.startsWith("/monument/name")){
      //
    }
    else if(path.startsWith("/organizations")){
      //
    }
    else if(path.startsWith("/organization/id")){
      //
    }
    else if(path.startsWith("/organization/name")){
      //
    }
    else if(path.startsWith("/organization/creation_date")){
      //
    }
    else if(path.startsWith("/organization/dissolution_date")){
      //
    }
    else if(path.startsWith("/organization/double_date")){
      //
    }
    else if(path.startsWith("/people")){
      //
    }
    else if(path.startsWith("/person/id")){
      //
    }
    else if(path.startsWith("/person/complete_name")){
      //
    }
    else if(path.startsWith("/person/birth_date")){
      //
    }
    else if(path.startsWith("/person/death_date")){
      //
    }
    else if(path.startsWith("/person/double_date")){
      //
    }
    else if(path.startsWith("/writers")){
      //
    }
    else if(path.startsWith("/writer/id")){
      //
    }
    else if(path.startsWith("/writer/complete_name")){
      //
    }
		else if(path.startsWith("/books")){
      //
    }
		else if(path.startsWith("/book/_id")){
      //
    }
    else if(path.startsWith("/book/title")){
      //
    }
    else if(path.startsWith("/book/min_date")){
      //
    }
    else if(path.startsWith("/book/max_date")){
      //
    }
    else if(path.startsWith("/book/double_date")){
      //
    }
    else if(path.startsWith("/legends")){
      //
    }
    else if(path.startsWith("/legend/id")){
      //
    }
    else if(path.startsWith("/legend/name")){
      //
    }
    else if(path.startsWith("/miths")){
      //
    }
    else if(path.startsWith("/mith/id")){
      //
    }
    else if(path.startsWith("/mith/name")){
      //
    }
	}

	return new Response(
		"Path not found",
		{
			status: 404
		}
	);
};

Deno.serve({ port: 4000 }, handler);