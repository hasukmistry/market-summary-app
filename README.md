# Market Summary App

A react app for market summary. It requires running [API Serivce App](https://github.com/hasukmistry/market-summary-api) to work. 

## Table of content
- [Dependencies](#dependencies)
- [Setup](#setup)
- [How it works?](#how-it-works)
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

## Useful Commands
- Following command will run the test.
```
docker-compose exec app yarn test
```

- Following command will make production build.
```
docker-compose exec app yarn build
```