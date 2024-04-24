import React from 'react'
import Game from '../components/Game'
import { Provider } from 'react-redux'
// import store from '../store/store'
import store from '../store/store'
const Home =()=> {
  return (
    <>
      {/* <Provider store={store}> */}
        <Game />
      {/* </Provider> */}
    </>
  )
}

export default Home