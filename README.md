# catalyst-3-angular-platform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Requirements

Angular 18.2.10,
Node 18.19.1+,
AWS CLI

## First-time build
Login with the aws-cli and run the following terraform commmands:
```
cd terraform
terraform init
terraform validate
terraform apply
terraform output
```

Create a `.env` file in the root directory with your cognito user pool ids which you can retrieve by applying the Terraform

```
USER_POOL_ID=<USER_POOL_ID>
USER_POOL_CLIENT_ID=<USER_POOL_CLIENT_ID>
```

## Build

Run `docker-compose build` to build the project.

## Development server

Run `docker-compose up` for a dev server. Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
