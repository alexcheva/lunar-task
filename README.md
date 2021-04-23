# Lunar Task
### Final PERN project for Techtonica.  
**Lunar Task** is a task management app with lunar cycle integration and journaling capabilities.  
I'm building it because I like to track my tasks and divide them between the days of the week. I also like to plan according to the moon phases and the spiritual meaning they carry. Lastly, it would be good to have a journal feature to track how I felt about each day and to reflect on the past weeks/years.  
## Technology. 
- I will use React, Bootstrap, and Beautiful DnD to build the UI
- the backend API will be PEN Postgres/Express/Node
- It will also be integrated with an external moon phase API and an external database for moon phase intentions
## MVP (Minimum Viable Product)
- User registration/Login
- Calendar/Week/Day view with the ability to add tasks
- Moon phase for each day with a blurb about the intentions for the day
## Additional Nice-to-Have Features
- Auth0 for login/registration
- Drag and Drop functionality
- Adding journal entries for the day
## Technical Risks
- React Beatifull DnD might be too complicated to integrate
  - *In that case, I will just have simple edit day functionality*
- Auth0 for login/registration might have issues with authentification
  - *I will add simplified ability to register and login and store it in a separate table in my database*
## User Flow
![picture alt](http://via.placeholder.com/200x150 "Title is optional")
## Wireframes
![picture alt](http://via.placeholder.com/200x150 "Title is optional")
![picture alt](http://via.placeholder.com/200x150 "Title is optional")
![picture alt](http://via.placeholder.com/200x150 "Title is optional")
![picture alt](http://via.placeholder.com/200x150 "Title is optional")
## Data Model
Tasks  | Journal
------------- | -------------
id - primary key | id - primary key
text - varchar | text - varchar
date - datetime | date - datetime
user_id - foreign key  | user_id - foreign key 
