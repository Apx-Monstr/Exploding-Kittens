import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { drawCard, setDeck, setGameID, startGame } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Info = () =>{
    return (
        <div className="bg-blue-400">
            Hello I am Info Card
        </div>
    )
}
// const deck = ["A","B","C","D","E"]
const Game = () =>{
    // const [gameState, updateGameState] = useState("not-started")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [gameID, setGameID] = useState("")
    const username = useSelector((state)=>state.username)
    const gameState = useSelector((state)=>state.gameStatus)
    const currdeck = useSelector((state)=>state.currentDeck)
    const deck = useSelector((state)=>state.deck)
    const diffuseCards = useSelector((state)=>state.diffuseCards);
    const gameID = useSelector((state)=>state.gameID)
    // const gameDeck = useSelector((state)=>state.gameState)
    // const [deck, setDeck] = useState("")
    const routetoLogin = () => navigate("/login");
    const routetoLeaderboard = () => navigate("/leaderboard")
    useEffect(()=>{
        if (gameState === "won") {
            const datatoSend = {
                gameId: gameID,
                username: username,
                result: "win"
            }
            axios.post('http://localhost:8975/savegameresult', datatoSend)
            .then(response =>{
                console.log(response)
            })
        }
    }, [gameState])
    const handleClick = () =>{
        if (gameState==='not-started'){ // username !== null
            getDecks()
        }else if (gameState === "ongoing"){
            dispatch(drawCard());
            setTimeout(()=>{},300)
            if (gameState === "won") {
                const datatoSend = {
                    gameId: gameID,
                    username: username,
                    result: "win"
                }
                axios.post('http://localhost:8975/savegameresult', datatoSend)
                .then(response =>{
                    console.log(response)
                })
            }
        }else if(gameState === "won" || gameState === "lost"){
            getDecks()
        }
    }

    const getDecks = async ()=>{
        try {
            axios.get("http://localhost:8975/startgame")
            .then(response=>{
                console.log(response.data)
                const {gameId, deck} = response.data
                dispatch(setDeck(deck))
                dispatch(setGameID(gameId))
                dispatch(startGame())
            })
            // const { gameId, deck } = response.data;
            // console.log(response)
            // Dispatch actions to update the store with the fetched game data
            // dispatch(setGameID(gameId));
            // dispatch(setDeck(deck));
          } catch (error) {
            console.error('Error fetching game data:', error);
          }
    }

    return (
        <div className="bg-green-400 h-screen w-screen flex items-center justify-center">
            <div className="max-w-screen-sm w-full flex flex-col gap-8">
                <div className="bg-white px-8 py-8 rounded flex justify-between items-center">
                    {username === null && (
                        <button className="px-4 py-2 bg-blue-400 rounded" onClick={routetoLogin}>
                            Login to continue
                        </button >
                    )}
                    <div className="">
                        {username}
                    </div>
                    <button className="px-4 py-2 bg-blue-500 rounded" onClick={routetoLeaderboard}>
                        Leaderboard
                    </button>
                </div>
                {username !== null && (
                    <div className="p-14 rounded bg-white flex flex-col gap-12">
                        <div className="text-4xl font-bold relative">
                            Exploding Kitten 💣😼
                            <div className="absolute w-4 h-full right-0 top-0 text-xs flex items-center">
                                <button className="bg-gray-400 flex-1 h-4 text-center rounded text-white">
                                    i
                                </button>
                            </div>
                        </div>
                        {gameState === "lost" && (
                            <div className="text-7xl text-center bg-red-500 text-white py-12">
                                You Lost 🥹
                            </div>
                        )}
                        {gameState === "won" && (
                            <div className="text-7xl text-center bg-green-500 text-white py-12">
                                You Won 🥳
                            </div>
                        )}
                        {gameState === "ongoing" && (
                            <div className="flex flex-col gap-8">
                                <div className="flex gap-4 justify-around px-12">
                                    {
                                        currdeck.map((card, index)=>(
                                            <div key={index} className="h-16 w-16 rounded bg-blue-500">
                                                
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex gap-1 bg-gray-400">
                                    <div className="flex-1 bg-white text-center p-4">
                                        Diffuse Cards: {diffuseCards}
                                    </div>
                                    <div className="flex-1 bg-white text-center p-4">
                                        Remainig Cards: {currdeck.length}
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className="bg-blue-500 p-4 rounded" onClick={handleClick}>
                            {gameState === "not-started" && (
                                <div>Start Game</div>
                            )}
                            {gameState === "ongoing" && (
                                <div>Draw Card</div>
                            )}
                            {(gameState === "won" || gameState === "lost") && (
                                <div>Start New Game</div>
                            )}
                            {/* Start Game Theree button states Start Game, Draw Card, Start a New Game */}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Game;