import { Fragment, Component } from 'preact';
import { useContext } from 'preact/hooks';

import { SocketContext, EventsForGame } from '../../components/SocketProvider';

import Player from '../../domain/Player';
import Game from '../../domain/Game';

import { getOrCreatePlayer } from '../../services/player.service';

import HostComponent from './Host';
import PlayerComponent from './Player';

type GameProps = {}
type GameState = {
    player: Player,
    game: Game,
}

export default class GameComponent<GameProps, GameState> extends Component {
    constructor() {
        super();
        this.state = {
            player: Player.get(),
            game: Game.get(),
            socket: useContext(SocketContext),
        }
    }

    componentWillMount() {
        this.listenForGameUpdates();
    }

    listenForGameUpdates() {
        const { socket, game } = this.state;
        const events = new EventsForGame(game.id);

        socket.on(events.PLAYER_JOINED, game.addPlayer);
    }

    isHost = () => {
        const { game, player } = this.state;
        return game.isHost(player.id);
    }

    render() {
        const isHost = this.isHost();
        const PlayerOrHostComponent = isHost ? HostComponent : PlayerComponent;
        const { game } = this.state;

        return (
            <PlayerOrHostComponent game={game} />
        );
    }
}