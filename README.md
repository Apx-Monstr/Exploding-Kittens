# README
# Exploding Kittens 😼💣
Single-Player Card Game! This online game features a deck of 4 different types of cards: Cat 😼, Defuse 🙅‍♂️, Shuffle 🔀, and Exploding Kitten 💣.

## How to Play
Click the "Start Game" button to begin.
A deck of 5 cards will be presented, ordered randomly.
Click on the deck to reveal a card.
Each card drawn from the deck will be removed.
The game ends when all 5 cards are drawn and there are no cards left.
## Rules
Cat Card 😼: Simply remove the card from the deck.
Exploding Kitten Card 💣: Game over! You lose.
Defuse Card 🙅‍♂️: Remove the card from the deck. This card can defuse one Exploding Kitten card.
Shuffle Card 🔀: Restart the game with a new deck of 5 cards.

## Live At 
😼💣😸[https://explodingkittensgame.vercel.app/](https://explodingkittensgame.vercel.app/)

## ScreenShots
![Login Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/170aec03-f9fe-4830-bf11-9d9f06ca474a)
![Home Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/3f8bec38-548b-49aa-8436-047dc941a4e5)
![Game Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/8ebae5d2-ada8-41be-8ca1-5999eeb68d1a)
![Game Lost Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/b08a405f-f387-4c23-8248-491c87060b88)
![Game Won Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/45d9b950-f2b9-4819-b182-1a0e0bcf409a)
![Leaderboard Screen](https://github.com/Apx-Monstr/Exploding-Kittens/assets/106424104/b1005a10-bbeb-4449-9cbe-422e4bfecf2b)

## Project Setup
To set up the project, ensure you have the following prerequisites installed on your system:

- [Go](https://golang.org/) (for running the backend server)
- [Node.js](https://nodejs.org/) (for running the frontend)

If you haven't installed these prerequisites yet, you can download and install them from their official websites.

### Clone the Repository

First, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Apx-Monstr/Exploding-Kittens.git
```

### Setup Frontend (React)

To set up the frontend, follow these steps:

1. Navigate to the frontend folder of the cloned repository.
2. Run the following command to install the required dependencies:

```bash
npm install
```

This command will install all the necessary packages and dependencies required for the frontend.

3. After installing the dependencies, start the frontend server by running:

```bash
npm run start
```

This command will start the development server for the frontend, allowing you to view and interact with the application in your web browser.

### Setup Backend

To set up the backend, follow these steps:

1. Navigate to the backend folder of the cloned repository.
2. Install the Go dependencies listed in the go.mod file by running:

```bash
go mod download
```

This step will download and install all the required Go packages and dependencies specified in the go.mod file.

3. Run the backend server by executing the following command:

```bash
go run server.go
```
This command will start the backend server, allowing the frontend to communicate with it and access the necessary data and functionalities.
### API Endpoints
The following API endpoints are available in the backend server:
- POST `/login`
- GET `/startgame`
- POST `/savegameresult`
- GET `/leaderboard`


That's it! You should now have both the frontend and backend set up and running. Feel free to explore the project and make any necessary changes. If you have any questions or issues, please refer to the project documentation and dependencies documentations or reach out to me.
