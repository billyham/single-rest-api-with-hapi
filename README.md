## Comicstrip API

Written with Hapi, MongoDB, and Mongoose

##### Model Sample
```
{
  "_id": //populated by DB,
  "title": "Peanuts",
  "author": "Charles Schultz",
  "characters": ["Charlie Brown", "Lucy van Pelt", "Linus van Pelt", "Schroeder", "Peppermint Patty"]
}
```
`GET /comicstrips` return all comicstrips in the database

`POST /comicstrips` create single comicstrip instance

`GET /comicstrips/:id` return single comicstrips by id

`PATCH /comicstrips/:id` update/modify single comicstrips by id

`DELETE /comicstrips/:id` delete single comicstrips, returns a confirmation of the deletion
