# jkim-angular-cognito

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Prerequisites

- Angular 18.2.10
- Node 18.19.1+
- Docker

If you have not yet stood up your AWS Cognito resources, use the instructions inside `terraform/README.md` to configure the Terraform.

## Getting Started and Documentation

1. Create a `.env` file in the root directory with your AWS Cognito User Pool IDs. Use the `.env-example` as a reference.

```
USER_POOL_ID=<USER_POOL_ID>
USER_POOL_CLIENT_ID=<USER_POOL_CLIENT_ID>
```

2. **Build**

```sh
docker-compose build
```

3. **Start the development server**

```sh
docker-compose up
```

- Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

### Notes

- The `scripts/set-env.cjs` script sets up your environment variables from `.env` when starting up the development server. After running `docker-compose up`, verify that the `environments.ts` file has been generated inside `src/environments` and is being loaded into `src/main.ts`.

## Running Unit Tests

1. Ensure you have installed all dependencies using `npm install`
2. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
