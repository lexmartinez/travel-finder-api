# travel-finder-api

:camel: **Travel Finder [REST API]**: Define a range and find near cities/towns to make a quick trip

## Quick start

```bash
# clone repo
$ git clone https://github.com/lexmartinez/travel-finder-api

# change directory to cloned app
$ cd travel-finder-api

# install the dependencies with yarn
$ yarn install

# start the server on development mode
$ yarn dev
```

go to [http://localhost:3000/api](http://localhost:3000/api) in your browser.

## Table of Contents

+ [Quick start](#quick-start)
+ [Development](#development)
+ [Deployment](#deployment)

### Development

After you have installed all dependencies you can now start developing with:

+ `yarn dev`

 It will start a local server using `nodemon` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:3000/api`.

> To run the API in production mode you should run the command `yarn start`

### Usage

```
ENDPOINT: https://travel-finder-api.herokuapp.com/api/cities/search?country=CO

BODY: {
        "lat": "6.25184",
        "lng": "-75.56359",
        "time": 3,
        "apiKey": "Your Distance Matrix API Key"
    }
```