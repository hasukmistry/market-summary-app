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
Make sure [API Serivce App](https://github.com/hasukmistry/market-summary-api) is up and running locally.

Once setup is done successfully go to `http://0.0.0.0:3001` in browser to start react app.

## Useful Commands
- Following command will run the test.
```
docker-compose exec app yarn test
```

- Following command will make production build.
```
docker-compose exec app yarn build
```