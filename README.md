## Comicstrip API

A catalog of comic strips.

Written with Hapi, MongoDB, and Mongoose

##### Data Sample

Enter new data and retrieve data using JSON.
```
{
  "_id": // on POST requests, this field is automatically populated by the Database
  "title": "Peanuts",
  "author": "Charles Schultz",
  "characters": ["Charlie Brown", "Lucy van Pelt", "Linus van Pelt", "Schroeder", "Peppermint Patty"]
}
```
`GET /comicstrips` return all comic strips in the database

`GET /comicstrips/:id` returns a single comic strip by id

`POST /comicstrips` create a single comic strip entry

`PATCH /comicstrips/:id` update a single comic strip by id

`DELETE /comicstrips/:id` delete a single comic strip, returns a confirmation of the deletion
