# confcon

##Things you can do with REST API

Upon the initial deploy, the app should create some initial default database data:
- default config settings
- a default admin account with username and password

*NOTE: the organizer role can do everything that an attendee role can do*

- organizer creates new account (with admin or attendee role)
- organizer deletes account (admin or attendee)
- organizer edits site config

- organizer creates a topic
- organizer deletes a topic
- organizer edits a topic

- organizer creates an event
- organizer deletes an event
- organizer edits an event

- attendee view posts feed
- attendee view all users
- attendee view user detail
- attendee view all events
- attendee view event detail

- attendee creates post
- attendee deletes post
- attendee edits post

- attendee views their agenda
- attendee adds an event to their agenda
- attendee removes an event from their agenda

- attendee creates new user account
- attendee signs in as authenticated user
- attendee edits their password
- attendee edits their username
- attendee view their profile
- attendee edits profile


####VIEW POSTS
URL: /api/postlist
Method: GET
Description: returns posts in reverse chronological order, includes all posts unless input has an optional filter parameter
Authorized roles: attendee, organizer
Inputs
- topic_id (optional)
- event_id (optional)
- user_id (optional)
- date_range (optional)
Outputs
- id
- body  *the full text of the post*
- creation_date  *timestamp of creation date*
- user  *name of poster*
- topics  *all associated topics*
- event  *name of associated event*
- link  *HTTP link associated with post*
- edited  *indicates that the post has been edited by its creator*

####VIEW USERS
URL: /api/userlist
Method: GET
Description: returns a list of attendees
Authorized roles: attendee, organizer  
Inputs
Outputs
- id
- username
- organization

####VIEW USER DETAIL
URL: /api/user
Method: GET
Description: returns details for an specified user
Authorized roles: organizer (all details), attendee (an censored list based on profile settings)
Inputs
- id
Outputs
- id
- username
- organization
- email
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile_twitter_username

####VIEW EVENTS
URL: /api/eventlist
Method: GET
Description: returns a list event title and date, inclues all events unless input has the optional filter parameter
Authorized roles: attendee, organizer
Inputs
- topic_id (optional)  *filters to return only records posessing this ID in its topic field*
Outputs
- id
- title  
- date  

####VIEW EVENT DETAIL
URL: /api/event
Method: GET
Description: returns all detailed information for a given event
Authorized roles: attendee, organizer
Inputs
- id  *id of event record*
Outputs
- title
- date
- speakers
- topics
- max_attendance
- current_attendance
- location
