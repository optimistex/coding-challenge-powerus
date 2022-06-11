## Description

Coding challenge

Manual check:

- Run the Application
- Visit: http://localhost:3000/
- Update the page multiple times and see (yes it is raw JSON):
  - There are only unique flights
  - Each request take no more 900ms

Adding new sources:

- If it needs to add similar HTTP resources, then just update `CoreModuleOptions.httpSourceUrls` in `AppModule`
- If the new resources are not HTTP or they get some different raw data, then update implementation of `FlightSourceBuilderService.getSourceList` by implementing new sources (eg. `HttpFlightSource`)
  and/or mapping data to expected data structure

Implementation:

- The main implementation is in `FlightAggregatorModule` which might be moved to a library and used anywhere.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
