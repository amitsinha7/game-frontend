import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import Login from "./Login.jsx"
import Error from "./Error.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Logout from "./Logout.jsx"
import Challenge from "./Challenge.jsx"
import TopPlayer from "./TopPlayer.jsx"

class GameApp extends Component {
    render() {
        return (
            <div className="GameApp">
                <Router>
                    <>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" component={Login} />
                            <AuthenticatedRoute path="/logout" component={Logout} />
                            <AuthenticatedRoute path="/challenge" component={Challenge} />
                            <AuthenticatedRoute path="/topplayer" component={TopPlayer} />
                            <Route component={Error} />
                        </Switch>
                        <Footer />
                    </>
                </Router>
            </div>
        )
    }
}

export default GameApp
