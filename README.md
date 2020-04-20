
# Attractions Salon

Team Swee (Group 2)
[Deployed Website](https://attractions-salon.herokuapp.com/)

  

This repository contains both the backend and frontend portions of the project.

  

# Project Features (Backend API)

## Users, Authentication, and Authorization
### Model
Schema defined in `api/model/user.js`
User `role` is used in **authorization**
### Controller
Defined in `api/controllers/userController.js`
- GET `/api/users` Reads the current logged in user, returns 403 if not logged in.
- GET `/api/users/roles/:role` Returns a list of users at the role, omitting sensitive data.
- DELETE `/api/users/:id` Removes the user with given id `:id` (requires authorization)
- PUT `/api/users/:id` Updates the user with given id `:id:` (requires authorization)
- POST `/api/users` Creates a new user, requires *captcha token*
- POST `/api/login/reset` Generates a forget password token for a provided email
- POST `/api/users/password/:token` will update the password of the user tied to the token.
### Authorization
Role-based Authorization Scheme defined in `api/helpers/ability.js`

`userAbilities(user)` will deterministically return the permissions of a given user.

The default module export will return `currentUserAbilities()`, which uses the session to determine the logged in (or guest) session's permissions.

## Appointments
### Model
Schema defined in `api/model/appointment.js`
  ### Controller
  
  Defined in `api/controllers/appointmentController.js`

- GET `/api/appointments/:id` will return the information for a given appointment (requires authorization)
- GET `/api/appointments/users/:email` returns the appointments for a user given by `:email` (requires authorization)
- GET `/api/appointments` returns all appointments (requires authorization)
- GET `/api/appointments/status/:confirmed` Get all appointments given their confirmation status (requires authorization)
- DELETE `/api/appointments/:id` Deletes an appointment with id `:id` (requires authorization)
- PUT `/api/appointments/:id` Updates a given appointment with id `:id`. If confirmed is set to `true`, this route will send confirmation emails. (requires authorization)
- POST `/api/appointments` Creates a new appointment and sends request pending email.
#### Card Routes

- POST `/api/users/card/:id` creates a new card object for user `:id` (requires authorization)
- POST `/api/card` generates a new card (for use with guest customers)
- GET `/api/card/:cardID` returns a card with id `:cardID` (requires authorization)
- GET `/api/users/card/:userID` returns all cards on user `:userID` (requires authorization)
- DELETE `/api/users/card/:userID` removes a card from user `:userID` (requires authorization)
- PUT `/api/users/card/:userID/:cardID` updates the card `:cardID` on user `:userID` (requires authorization)

#### Authentication
- POST `/api/login` creates a new login session for a given user
- DELETE `/api/logout` destroys the current login session

## Services
### Model
Schema defined in `api/model/service.js`
### Controller
Controller defined in `api/controllers/serviceController.js`

- POST `/api/services` creates a new Service (requires authorization)
- GET `/api/services` returns all services
- GET `/api/services/types/:type[/:subtype]` returns all services given type (and optional subtype).
- GET `/api/services/types` returns all used types and their respective subtypes.
- PUT `/api/services/:id` updates a service given the id `:id` (requires authorization)
- DELETE `/api/services/:id` removes a service with id `:id` (requires authorization)

## Reviews
### Model
Schema defined in `api/model/review.js`
### Controller
Controller defined in `api/controller/reviewController.js`

- POST `/api/reviews` creates a new review (requires authorization)
- PUT `/api/reviews/:id` updates the review with id `:id` (requires authorization)
- GET `/api/reviews/:id` returns the review with id `:id`
- GET `/api/reviews` returns all reviews
- DELETE `/api/reviews/:id` deletes the review with id `:id` (requires authorization)

# Backend Structure
The backend uses a modular initialization function in order to load the server based upon the value of `NODE_ENV` (see "Environment Variables"). See `api/config/initializers` for the initialization function per environment state.

## Serving the Frontend
The backend uses Express to serve the frontend in development and production. In `development`, the backend will proxy a connection to the react development server. In `production`, the backend will serve the built version of the app located in `build/client/`


# Development Guide

## Getting Started

This project requires [NodeJS](https://nodejs.org/en/) and uses [Yarn](https://yarnpkg.com/) as a package manager. After cloning,

```

# Move from master to the develop branch

git checkout develop

git pull

  
# Installs required packages

yarn install


# Starts both the backend and the frontend

yarn start

```

  ## Environment Variables
In development, environment variables may be loaded using a `.env` file. See [dotenv](https://www.npmjs.com/package/dotenv) for more information.

 - `NODE_ENV` : The NodeJS environment vairable for determining runtime environment. Use this to differentiate running locally for in production.
 -  `PORT` : When `NODE_ENV` is set to `production`, `PORT` is used for what port the backend will listen on. Defaults to 8080 in other environments.
 -  `STORE_KEY` : When `NODE_ENV` is set to `production`, `STORE_KEY` is used to define the salt for hashing session keys.
 -  `DB_URL` : The url of the MongoDB database to be used when `NODE_ENV` is set to `production`
  - `DB_URL_DEV` : The url of the MongoDB database to be used when `NODE_ENV` is set to `development`
  - `DB_URL_TEST` : The url of the MongoDB database to be used when `NODE_ENV` is set to `test`
  - `LOGGING` : The logging level to be displayed, the following are valid values: `emerg`, `alert`, `crit`, `error`, `warning`, `notice`, `info`, `debug`
  - `SENDGRID_API_KEY` : The api key used to connect to the Sendgrid API (email)
  - `STRIPE_API_KEY` : The api key used to connect to Stripe for billing.
  - `RECAPTCHA_SITE_KEY` : The reCaptcha site key (public key)
  - `RECAPTCHA_SECRET_KEY` : The reCaptcha secret key (private key)

## Git Structure

To keep things clean for the production environment, we will be using [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). In summary, the master branch represents production ready versions, while the develop branch and feature branches represent in development work.

  

## Keeping this Project Clean

One of the hardest parts of this project is going to be the fact that many of us are new to this, but still wanting to make something quality. Therefore, here are some things to have laid out now to keep in mind as you work.

  

### Style

This project environment is equipped with a style checker called [ESLint](https://eslint.org/). The point of a style checker is to have defined rules laid out about the style of code, and having a way to check if you are breaking any of these rules, with the goal of making everything look homogeneous.

  

If you are using VS Code, I recommend installing the [eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

  

Regardless of using the extension or not, at anytime use `yarn front-lint` or `yarn back-lint` to run the style checking on either portion of the project.

  

### Unit Tests

Both the frontend and backend are equipped with [Jest](https://jestjs.io/) for unit tests. Unit tests are very important on the backend, but due to the nature of the frontend I would recommend only unit testing certain complex components.

  

There is only a single testing command, `yarn test`, which will bring up a menu as described in the *Project Commands* section. The reasoning behind a single testing commands is because tests are important enough that is one team is failing their tests for any reason, everyone should be aware of it.

  

## Project Structure

  

#### `/api`

Contains the backend, including all controllers, models, start up files, and tests.

  

#### `/client`

Contains the frontend, including all assets, pages, and tests.

  

#### `/build`

The destination folder of any built versions of the project. When running the backend, the version of the server present in `/build/api` will be run.

  

#### `/scripts`

Scripts generated by create react app. These get called when handling the frontend running, building, and project tests.

  

## Project Commands

  

#### `yarn start`

Starts a local development instance of the project.

  

(Runs `front-run` and `back-run`)

  

#### `yarn build`

Builds a production ready version of the frontend and backend

  

#### `yarn front-run`

Starts the React dev server locally on port 3000

  

#### `yarn front-lint`

Runs style checking on the frontend

  

#### `yarn front-build`

Builds a production ready version of the frontend

  

#### `yarn test`

Enters the [Jest](https://jestjs.io/) test framework. This is a framework provided by Create React App.
  

#### `yarn back-build`

Runs builds a runnable version of the backend

  

#### `yarn back-run`

Runs task `back-build` and runs the built version

  

#### `yarn back-lint`

Runs style check on the backend
