# Order book

A web application that displays an order book with the bids and asks for BTC/ETH.

Live version : https://crypto-book-xi.vercel.app

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is written in typescript.

It uses redux as a state managament library and websockets for live price levels updates.

The data fetching and processing runs on a separate worker so that rendering performance is not affected when there is a high volume of traffic.

## Running the project

To run the project you must first compile the worker running `yarn run worker` and after that start the app using `yarn start`.

Then the project should be running on http://localhost:3000