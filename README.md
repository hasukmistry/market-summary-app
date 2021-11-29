# Market Summary App

A react app for market summary. It requires running [API Serivce App](https://github.com/hasukmistry/market-summary-api) to work. 

## Table of content
- [Dependencies](#dependencies)
- [Setup](#setup)
- [How it works?](#how-it-works)
- [ENV Configuration](#env-configuration)
- [Useful Commands](#useful-commands)

## Dependencies
Make sure to install docker, docker-compose and make command utilities in your local machine.

## Setup
```
make setup
```

## How it works?
Make sure [API Serivce App](https://github.com/hasukmistry/market-summary-api) is up and running locally (when you want to use api service locally).

Once setup is done, Please wait atleast few seconds while volume is created and synced properly. Then go to `http://0.0.0.0:3001` in browser to start react app. You can see logs using `docker-compose logs`. And service status via `docker ps`.

## ENV Configuration
You can manipulate the following env variables in docker-compose.yml.

`REACT_APP_API_URL` - This env variable points to API backend service. If you want to run the app and backend locally, change this variable to point to the backend api. Take a look here on [API Serivce App](https://github.com/hasukmistry/market-summary-api).

`PORT` - Specify a port on which application should work.
## Useful Commands
- Following command will run the test.
```
docker-compose exec app yarn test
```

- Following command will make production build.
```
docker-compose exec app yarn build
```