import React, { Component } from "react"
import GameApp from "./components/competition-game/GameApp"
import "./App.css"
import "./bootstrap.css"
class App extends Component {
    render() {
        return (
            <div className="App">
                <GameApp />
            </div>
        )
    }
}

export default App
