import { FunctionalComponent } from "preact";
import PlayingField from "./PlayingField";

const Player: FunctionalComponent = () => {
    return (
        <div>
            <h1>Player</h1>
            <PlayingField />
        </div>
    );
}

export default Player;