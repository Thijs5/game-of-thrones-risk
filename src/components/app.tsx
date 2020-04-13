import { FunctionalComponent, h, createContext } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import { createHashHistory } from "history";
import "bulma/css/bulma.min.css";
import SocketProvider from "./SocketProvider";

import Home from "../routes/home";
import Profile from "../routes/profile";
import GameComponent from '../routes/game';
import NotFoundPage from '../routes/notfound';
import Header from "./header";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            {/* <Header /> */}

            <SocketProvider>
                <Router onChange={handleRoute} history={createHashHistory()}>
                    <Route path="/" component={Home} />
                    <Route path="/game/:gameId" component={GameComponent} />

                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
            </SocketProvider>
        </div>
    );
};

export default App;
