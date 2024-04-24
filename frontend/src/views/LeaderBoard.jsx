import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Rank = ({data, rank}) => {
  return (
    <div className="bg-gray-100 p-4 flex justify-between gap-4 ">
      <div className='w-12 text-center'>{rank}</div>
      <div className="flex-1">{data.username}</div>
      <div className="">{data.points}</div>
    </div>
  )
}

function LeaderBoard() {
    const [leaderboard, setLeaderBoard] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8975/leaderboard")
        .then(response =>{
            let res = response.data.sort((a,b)=>b.points-a.points)
            setLeaderBoard(res);
            // console.log(res)
        })
    }, [])
    return (
        <div className="h-screen w-screen bg-blue-500">
            <div className="max-w-screen-md mx-auto h-screen flex flex-col">
                <div className="text-7xl p-10 px-0 font-bold">
                    Leaderboard 😺
                </div>
                <div className="flex-1 bg-white p-8 rounded-md rounded-b-none overflow-y-auto">
                    <div className="flex gap-1 flex-col max-h-min">
                        <div className="bg-gray-500 p-4 flex justify-between gap-4">
                            <div className='w-12 text-center'>Rank</div>
                            <div className="flex-1">Username</div>
                            <div className="">Points</div>
                        </div>
                        {
                            leaderboard.map((val, index)=>(
                                <Rank key={index} data={val} rank={index+1} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard