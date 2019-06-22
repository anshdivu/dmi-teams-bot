# Welcome to example-express-backend-api 👋

> This is a Github Repo Template to create Node.js/Express.js based Backend REST APIs

## What's included?

- [x] Basic Express.js App (REST API only; no html rendering) with [express generator](https://expressjs.com/en/starter/generator.html)
- [x] Convert Express.js App to [Typescript](https://www.typescriptlang.org/): `yarn tsc --init`
  - [x] Add Typescript build script: `yarn build`
  - [x] Add Production start script: `yarn start`
  - [x] Add local typescript run script: `yarn start:ts`
  - [x] Add local typescript run script with file watch ([nodemon](https://nodemon.io/)): `yarn start:watch`
- [x] Add [Jest](https://jestjs.io/) Testing framework: `yarn test` and `yarn test:watch`
- [ ] Add Auto code formatting with [Prettier](https://prettier.io/)
- [x] Add [dotenv](https://github.com/motdotla/dotenv) to easily configure app environment variables for local development
- [ ] Add VS Code debug config ([Reference](https://code.visualstudio.com/docs/typescript/typescript-debugging))
- [ ] Add API Authentication with [Passport](http://www.passportjs.org/)
- [ ] Add Backing Database

## Prerequisites

- [node ^10.16.0](/package.json#L6)
  - This is the [Active LTS](https://nodejs.org/en/about/releases/) release. This is the minimum version any current Node.js app should support. Your team/company can choose a higher major version.
  - When you are changing the minimum supported Node.js version, please make sure [`tsconfig.json:compilerOptions.target`](/tsconfig.json#L5) is compatible with your version of Node.js.
    - You can use [node.green](https://node.green/) to check which version of Ecmascript is compatible with your version of Node.js.
    - This will also be a good time to update the version of `typescript` for this app. It can be updated in `package.json:devDependencies`.
    - You can use `yarn upgrade typescript --latest` command to update your typeascript dependency to the latest version.
    - Make sure other dependencies that depend upon `typescript` are updated as well like `ts-node`, `ts-jest`, `jest`, etc.
- [yarn ^1.13.0](/package.json#L7)
  - Specifying a `yarn` minimum version is very arbitrary but it should still be specified. Your team/company can choose a higher minimum supported `yarn` version.

## Install

```sh
yarn install
```

## Usage

```sh
# for prod deployment
yarn build # Probably run this in your build pipeline
yarn start

# OR #

# for local development
yarn start:ts

# OR #

# for local development with file watch (auto-restart)
yarn start:watch
```

## Run tests

```sh
yarn test # (1) requires 90% code coverage to pass

# OR #

yarn test:watch
```

> (1) This command is [setup to](/package.json#L14) run code coverage check as part of the test command. It is meant to be used in CI envrionments to make sure minimum code coverage standard is met. Currently, the minimum code [coverage threshold is set to 90%](/jest.config.js#L43). If you need to change that, please update it in `jest.config.js:coverageThreshold` section.
