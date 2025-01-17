# jkim-angular-cognito

This project is a sample implementation of the **Catalyst 3 Authentication and Login Application** built with Angular. It leverages **AWS Cognito** for user authentication and **AWS Amplify** for front-end user authorization and enforcement. The application demonstrates secure user login and authentication workflows, routing logic for unauthenticated users and users with different roles, ensuring that access to various parts of the application is properly controlled based on user authentication status and roles.

## Local Development

### Prerequisites

- Angular + Angular CLI 18.2.10
- Node 18.19.1+
- Docker
- Terraform (see the instructions inside `terraform/README.md` if you have not yet stood up your AWS Cognito resources)

### `.env` Setup

In order to run this application properly, you'll need to have a valid `.env` file configured. To do so:

1. Make a copy of the included `.env-example` file in the root directory and rename it `.env`
2. In your new `.env` file, add your AWS Cognito User Pool values to the appropriate fields

```
USER_POOL_ID=<USER_POOL_ID>
USER_POOL_CLIENT_ID=<USER_POOL_CLIENT_ID>
```

Once your `.env` file is configured, you may launch the application with Docker

### Starting the Development Server with Docker

Inside your terminal, run the following docker-command from the root directory:
`docker-compose up`

- This command will build and start the application in the development environment.
- Navigate to http://localhost:5173/ to view the application. The app will automatically reload if you change any of the source files.
- Run `docker-compose down` when you are finished with the development server to ensure a clean environment.

**Note:** The `scripts/set-env.cjs` script sets up your environment variables from `.env` when starting up the development server. After running `docker-compose up`, verify that the `environments.ts` file has been generated inside `src/environments` and is being loaded into `src/main.ts`.

### Test/Development Users

Test users have been set up for you if you have configured terraform (see `terraform/README.md` & `terraform/users.tf`). Log in with the following credentials per user group:

- Non-admin user:
  - username: test1@test.com
  - password: test123
- Admin user:
  - username: test5@test.com
  - password: test123

### Running Unit Tests

1. Ensure you have installed all dependencies using `npm install`
2. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

To run tests inside the Docker container, run `docker-compose run test` from the terminal.
