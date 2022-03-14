# Car Management Portal

## Requirements
* Design and write the code that implements the ZKP Protocol (see src/utils/zkp.ts) ✔️
* Expose a RESTful API to manage users, provers and verifers ✔️
* Write unit test to prove the work ✔️
* Functional test of the ZKP Protocol ✔️
* Wrapping the code within a service✔️
* Use Typescript instead of RUST as language for the quick implementation ✔️
* Containerize the solution by writing a valid Dockerfile ✔️
* Provide a dockercopmose file which references your Docker image and the official MongoDB docker image. ✔️
* Use Swagger for API documentation ✔️

## Deliverables
* The public repo URL which has the source code of the project, and a set of instructions if there is any project specific configurations needed to run the project.
---

# Available Commands for the Server
Before running the server, just configure mongodb database in respective `.env.[developement|production|test].local` file.
* Run the Server in production mode : `npm run start`
* Run the Server in development mode : `npm run dev`
* Run all unit-tests : `npm test`
* Check for linting errors : `npm run lint`
* Fix for linting : `npm run lint:fix`

### 🐳 Docker :: Container Platform

[Docker](https://docs.docker.com/) is a platform for developers and sysadmins to build, run, and share applications with containers.

[Docker](https://docs.docker.com/get-docker/) Install.

- starts the containers in the background and leaves them running : `docker-compose up -d`
- Stops containers and removes containers, networks, volumes, and images : `docker-compose down`

### 📗 Swagger :: API Document

[Swagger](https://swagger.io/) is Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

Easily used by Swagger to design and document APIs at scale.

Start your app in development mode at `http://localhost:3000/api-docs`

## 🗂 Code Structure (default)

```bash
│
├── /src
│   ├── /configs
│   │   ├── index.ts
│   │
│   ├── /controllers
│   │   ├── index.controller.ts
│   │   ├── provers.controller.ts
│   │   ├── users.controller.ts
│   │   └── verifiers.controller.ts
│   │
│   ├── /database
│   │   └── index.ts
│   │
│   ├── /dtos
│   │   ├── provers.dto.ts
│   │   ├── users.dto.ts
│   │   └── verifiers.dto.ts
│   │
│   ├── /exceptions
│   │   └── HttpException.ts
│   │
│   ├── /interfaces
│   │   ├── provers.interface.ts
│   │   ├── users.interface.ts
│   │   ├── verifiers.interface.ts
│   │   └── zkp.interface.ts
│   │
│   ├── /middlewares
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── /models
│   │   ├── provers.model.ts
│   │   ├── usres.model.ts
│   │   └── verifiers.model.ts
│   │
│   ├── /services
│   │   ├── provers.service.ts
│   │   ├── users.service.ts
│   │   └── verifiers.service.ts
│   │
│   ├── /tests
│   │   ├── zkp.test.ts
│   │   └── users.test.ts
│   │
│   ├── /utils
│   │   ├── logger.ts
│   │   ├── util.ts
│   │   ├── vaildateEnv.ts
│   │   └── zkp.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .dockerignore
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── Makefile
├── nginx.conf
├── nodemon.json
├── package.json
├── README.json
└── tsconfig.json
```