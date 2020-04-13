import { FunctionalComponent } from "preact";
import PlayingField from "./PlayingField";
import { HostOrPlayerProps, HostOrPlayerState } from "./hostOrPlayer";

const Host: FunctionalComponent<HostOrPlayerProps, HostOrPlayerState> = () => {
    return (
        <div>
            <h1>Host</h1>
            <PlayingField />
        </div>
    );
}

export default Host;