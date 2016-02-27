Lab week: Todo manager api and web application
===============================================

Task:
-----
Use the week6 of Maker's academy to consolidate the previous weeks and/or dig deeper into Js or Ruby. We wanted to learn more about building and using APIs and Jquery.

Project:
-----
To build an API that would used by a frontend page to create a todo list manager. We also integrated google maps api to show location specific tasks.

Approach:
-----
We built the API using Sinatra and JSON. The frontend is mostly JQuery. We have not spent any time on the styling or layout.  


Requirements completed
-----
* A user can create a new task
* A user can see a list of previously added tasks
* A user can complete a task
* A task is added dynamically to the list, without getting having to use an api call
* When a user clicks a task complete, it shows up under the completed area
* A completed task is sent to the database, where the information is stored
* Changes to the tasks are stored, so when the user returns, the todos are the same(completed/not completed)
* Completed tasks are checked
* A user can show/hide the completed tasks
* A user can create multiple projects
* Only one api serves the projects and todos
* A user can select a specific project
* A user can create tasks under the various projects
* A user only sees the tasks related to the current project
* A user can also delete a task, even if it is not completed
* A user can delete a project
* A user can drag a task between projects
* The projects stores the new tasks
* A user can add a location to the task
* A user can open a map and see the location of where the tasks are

Installation:
-----
```
1. Clone this repo
2. Bundle install
3. Createdb todo_manager_development & todo_manager_test
4. Run automigrate on both databases to initialise
5. Rerun rackup to initiate a server
6. Open up index.html in Safari (will not work in other browsers due to ajax calls to localhost)

```

Screenshots:
-----
Overview
![Overview](/docs/screenshot/task.png)

Second project
![Second_roll](/docs/screenshot/projects.png)

Maps
![Result](/docs/screenshot/map.png)

Team:
-----
* Michael Collins
* Eirik Wiig
