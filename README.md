# Crossmint Demo

## Prerequisites

- Node > 16

## Setup

1. Environment variables

- Add a .env file at the root directory using .env.example as guide

2. Install dependencies

```
npm install
```

3. Run. Will solve the map

```
npm start
```

## Scripts

There are some handy scripts to

1. Clear: fills the whole current map with space objects

```
npm run clear
```

2. Validate: validates the current map against the goal map and informs of any missing objects to reach the goal

```
npm run validate
```

3. Solve: solves the goal map by validating and inserting any missing objects

```
npm run solve
```

## Tests

```
npm test
```

Currently only map and goal map parsing is tested for the happy path

## Solution

- Both the current and goal map are parsed and normalized into an array of "astral" objects.
  - A consistent domain model accross all interfaces
  - Easier handling than ad-hoc object matrix without losing information (ie: x,y position)
- The api client uses retry and exponential backoff for errors and rate limiting
- The astral service uses a concurrency pool when batch creating/removing objects

## TODO

- Better object validation and fail fast when parsing. Probably use zod schemas for validation and type inference
- e2e tests

"Parkour to the moon!"
