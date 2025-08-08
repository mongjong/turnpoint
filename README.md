# TurnPoint Coding Challenge

This project fulfils a specific coding challenge.

## Requirements
### MySQL
* Ensure MySQL is installed
* Create a database called `challenge`
* Create a user with privileges called `user`
* Update user's password with the password found in `backend/knexfile.ts`
### To Run
1. Download the repository
2. Ensure MySQL is set up 
3. Navigate to `backend`
4. Run `knex migrate:latest` to set up the database
5. Ensure nothing is running on ports 3000 and 3001
6. In the `backend`, run `npm run dev` to start API 
7. In the `frontend`, run `npm start` to launch the frontend

## Assumptions
There were a number of assumptions made throughout this challenge. It was completed with keeping engineering as simple as possible, while also providing the user with their requirements. 
### Design
In future, design could be improved to match the user's styling document. Forms can be moved around, and focus could be placed on usability and UX. For this challenge, a simple and clean form with standard colours was used.
### Funding source
Funding source is left as an array of strings. In the future, it would not be difficult to expand this to its own table with a foreign key constraint on the client table, i.e. client.fundingId = funding.id. However, with funding defined as just an array of strings and no further information required, it has been designed to keep things simple and reduce database query join.
### Languages
It is assumed that there is a set of languages for the user to select from. This will prevent typing errors or other differences, such as capitalised or spelling mistakes. This also can be improved upon in future iterations depending on requirements.

## Other Important Stuff
### Linting
ESLint is installed and used to keep code consistent
### Test Units
Some test units for front and backend functionality is included but can be expanded. Test can be run in the frontend and the backend folders by running `npm test`.
### Further Improvements
I could keep writing and improving this project for days. I had to call it at some point!