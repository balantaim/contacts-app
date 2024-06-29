
Your project will be evaluated from various angles: code structure, design, API signature, testing, documentation. Importance should be given to the structure of the project and design of the packages. The correctness of algorithms comes second in relation to API design. Your code needs to be easy to follow and easy to maintain for other developers. You should focus on writing your best code. It doesn't matter if the service is incomplete.



## Importance points for us



- use of clean code, which is self documenting

- use of packages to achieve separation of concerns

- use of domain driven design

- tests for business logic

- validation of the input data

- use of git with appropriate commit messages

- documentation: README and inline code comments



## Task Description



Your goal is to design and implement a simple full stack application that manages contacts. A contact should contain at least:

- First Name

- Last Name

- Phone number/s

- Email address/es

If you decide to add more (such as street address, birthday, notes,  etc.) go for it.



The solution must include a backend service and a frontend UI.

Communication between the backend and the frontend should be REST or GraphQL.



If you are going with REST services, implement these endpoints:

* endpoint to load a list of contacts. Query param ?filter="text" for full text search. This parameter is optional.

* endpoint to get a single contact

* endpoint to create a new contact

* endpoint to modify an existing contact

* endpoint to delete a contact



If you are going with GraphQL, implement GraphQL query/ies to get contacts and GraphQL mutation to edit/delete a contact/s.

Consider to implement a simple login rest service or GraphQL query to obtain a kind of security session/cookie (the user/password can be hardcoded - no need to bother with user management)

In case the application is used with invalid session/cookie a proper status message must be returned and displayed (e.g 401 Unauthorized)

Security session should be passed in the request headers.



Frontend must be a simple web based single page application that can provide login form for the user, display user's contacts, provide functionality to create, edit and delete a contact (basically expose backend services).



Commit your work in a git repository (github or gitlab). Provide a README file on how to build, run and test your application. Provide additional information if needed.



Tech stack:

Backend:

- Language: Java 17

- Build tools: gradle

- DB server PosrgreSQL (Options: MySql, MSSQL, Oracle, H2)

- ORM framework - Ebean (Option to use Hibernate or not use ORM at all)

- REST/GraphQL frameworks: Jersey/Quarkus/Micronaut

- Add project lombok to your code (https://projectlombok.org/) and use it.

- Add start/stop script.

- DB credentials must be provided via config file (.properties, .yaml, .json) or environment variables.

- add unit tests

- add documentation - OpenAPI

Frontend:

- Language: Typescript

- Build tools: npm/yarn

- UI Framework - Angular or React

- Design: simple CSS

- Configuration of the FE (server url, version or other configuration properties if any) to be defined in a separate file.

- Unit tests for the application.



Bonus: Add docker support - docker-compose file that can start database, backend, frontend and expose a port to access the application.
