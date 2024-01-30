# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app `localy` in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `docker build carto .`

Builds a docker image named `carto`.

### `docker run -dp 3000:3000 -v "./src:/app/src" carto`

Run the `carto` image with the port 3000 of the container redirected to the port 3000 of the host. \
The `-v` orders a `bind mount` of the local folder to the container (used when developing).



