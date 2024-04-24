import { configureStore, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    username:sessionStorage.getItem("username"),
    deck:[],
    currentDeck : [],
    gameID: null,
    diffuseCards: 0,
    gameStatus: "not-started" // other states are- "ongoing", "won", "lost",
}

const gameSlice = createSlice(
    {
        initialState,
        name:"Exploding Kitten",
        reducers:{
            setUsername(state, action){
                state.username = action.payload
            },
            setDeck(state, action) {
                console.log(action.payload)
                state.deck = action.payload
                state.currentDeck = action.payload;
            },
            setGameID(state, action) {
                state.gameID = action.payload;
            },
            startGame(state) {
                state.gameStatus = 'ongoing';
            },
            updateCurrentDeck(state, action){
                state.currentDeck = action.payload
            },
            drawCard(state){
                const drawn = state.currentDeck.pop();
                console.log("Card Draw Called and drawn ", drawn)
                if (drawn === "bomb"){
                    if (state.diffuseCards === 0){
                        state.gameStatus = "lost"
                    }else{
                        state.diffuseCards --
                    }
                }
                else if (drawn === "defuse"){
                    state.diffuseCards +=1
                }
                else if (drawn === "shuffle"){
                    // state.currentDeck = state.deck
                    const shuffledDeck = [...state.currentDeck];
                    for (let i = shuffledDeck.length - 1; i > 0; i--) {
                        const randomIndex = Math.floor(Math.random() * (i + 1));
                        [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
                    }
                    state.currentDeck = shuffledDeck
                    state.diffuseCards = 0
                }
                if (state.currentDeck.length === 0){
                    console.log("Validating Win ")
                    state.diffuseCards = 0
                    state.gameStatus = "won"
                }
            },
        }
    }
    
)

const store = configureStore({
    reducer: gameSlice.reducer,
});

const {setUsername, setDeck, setGameID, startGame, drawCard } = gameSlice.actions;

export { setUsername, setDeck, setGameID, startGame, drawCard };
export default store;