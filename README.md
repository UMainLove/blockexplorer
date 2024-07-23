# Ethereum Block Explorer

The lessons this week covered the Ethereum JSON-RPC API and the `ethers.js` library giving us the ability to query the Ethereum blockchain and make transactions!

Let's put that knowledge to the test by building our very own **Ethereum Block Explorer**!

Blockexplorers give us the ability to view lots of different information about the blockchain including data about:
  * the blockchain network itself
  * blocks in the blockchain
  * transactions in a block
  * accounts
  * and many other things
  
[Etherscan](https://etherscan.io/) is a good example of an Ethereum blockexplorer. Check it out to get familiar with how blockexplorers generally work.

This particular project is very much open-ended. We'll add some challenges here to get your imagination going, but use Etherscan as a guide for features you might consider building in your project.

## Getting Started

Clone this project to pull down some basic starter code.

After that cd into the base directory of the project and run `npm install` to download all the project dependencies.


You can find lots of good docs on the AlchemySDK here:
  * [API Quickstart](https://docs.alchemy.com/reference/alchemy-sdk-quickstart?a=eth-bootcamp)
  * [API Overview](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp)

Alright, without further ado, let's get started!

## 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

## 2. Add your API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.

**⚠️ Note**

> Your Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
>
> But hey, we're just learning this stuff right now, not conquering anything\
> yet! :-) It won't be the end of the world to put the Alchemy API key in our\
> front-end code for this project.

## 3. Start the webserver

`npm start`

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The webpage will automatically reload when you make code changes.

## 4. This Forked Version of Ethereum Block Explorer uses the Alchemy WebSocket Connection

In the .env file:

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_WS_KEY` with your Alchemy Api Key.

```sh
REACT_APP_ALCHEMY_WS_URL="wss://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_WS_KEY"
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.

## 5. This Forked Version of Ethereum Block Explorer uses the Alchemy Webhooks Service

To Enable The Webooks in Alchemy Dashboard go to:

Data Services > Webhooks

Choose GraphQL and click on '+ Create Webhook'

** NOTE **

At this point you should paste a webhook link to 'Test' and then 'Create'

] >>> THIS FORK USES A FREEMIUM THIR-PARTY REVERSE PROXY SERVER CROSS-PLATFORM SERVICE. 

Open [https://www.ngrok.com], Create an Account (or login if you already have one)

You can Find the Guide on how to use the Ngrok service and Alchemy APIs at these resources:
  * [Ngrok APIs](https://ngrok.com/docs/)
  * [Alchemy Webhook APIs](https://docs.alchemy.com/reference/notify-api-quickstart)

] Remember to paste the 'https://random_gateway_number.ngrok-free.app/webhook' inside the 'WEBHOOK URL' in the Alchemy Webhooks Dashboard

## 6. This Forked Version of Ethereum Block Explorer uses an additional server to manage the Webhook CESTPOST/CESTGET connection between Alchemy and Ngrok

Set your server.js on [http://localhost:3001](http://localhost:3001)

Start your Ngrok client running : 'ngrok http http://localhost:3001' in a terminal 

Start your server running: 'node server.js' in the server directory

** NOTE **

If you use the Free version of Ngrok, when you quit the Ngrok Client, the link changes so you must create a new Alchemy Webhook with the new link and restart the server.js in order to keep it work