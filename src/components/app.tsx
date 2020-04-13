import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import { createHashHistory } from "history";
import "bulma/css/bulma.min.css";

import Home from "../routes/home";
import Profile from "../routes/profile";
import Game from '../routes/Game';
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

            <div class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <p class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
                    </p>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>

            <Router onChange={handleRoute} history={createHashHistory()}>
                <Route path="/" component={Home} />
                <Route path="/:playerId/game/:gameId" component={Game} />
                <Route path="/:playerId/host" component={Game} />

                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
