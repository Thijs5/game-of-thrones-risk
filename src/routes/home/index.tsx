import { FunctionalComponent, h, Fragment, Component } from "preact";
import { route } from "preact-router";

import * as style from "./style.css";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import { useContext } from 'preact/hooks';
import Modal, { ModalProps } from "../../components/Modal";
import Header from "../../components/header";
import { EventsForGame, SocketContext } from "../../components/SocketProvider";
import Game from "../../domain/Game";
import Player from "../../domain/Player";

type EnterUserNameModalProp = ModalProps & {
    onJoinGame: Function,
}

const EnterUserNameModal: FunctionalComponent<EnterUserNameModalProp> = (props: EnterUserNameModalProp) => {
    const player = Player.get();
    const onUsernameChanged = (event: any) => {
        const { value } = event.target;
        player.username = value;
    }
    const onClickJoinGame = () => {
        props.onJoinGame(player);
    }
    return (
        <Modal visible={props.visible} onClose={props.onClose}>
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <form>
                            <Input
                                autoFocus={true}
                                value={player.username}
                                id="username-input"
                                label="Please enter your name so other players know who you are."
                                placeholder="Username"
                                onInput={onUsernameChanged}
                            />
                            <Button
                                variant={ButtonVariant.Primary}
                                onClick={onClickJoinGame}
                                type="submit"
                            >
                                Join game
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

type HomeProps = {}
type HomeState = {
    modalVisible: boolean,
    joinFunction: Function,
    player: Player,
    game?: Game,
}

class Home extends Component<HomeProps, HomeState> {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            joinFunction: () => {},
            player: this.getOrCreatePlayer(),
            game: undefined,
        };

        this.onGameIdChanged = this.onGameIdChanged.bind(this);
        this.onHostGame = this.onHostGame.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.gotoGame = this.gotoGame.bind(this);
    }

    getOrCreatePlayer = () => {
        try {
            return Player.get();
        } catch {
            return Player.create();
        }
    }

    componentWillMount() {
        const { game } = this.state;
        if (game) {
            this.gotoGame();
        }
    }

    gotoGame() {
        const { game } = this.state;
        if (game) {
            route(`game/${game.id}`);
        }
    }

    onGameIdChanged(e: any) {
        const { value: gameId } = e.target;
        if (gameId && gameId.length == 36) {
            this.setState({
                joinFunction: this.gotoGame,
                modalVisible: true,
            });
        }
    }

    onHostGame() {
        const socket: any = useContext(SocketContext);
        const { player: host } = this.state;
        this.setState({
            joinFunction: () => {
                const game = Game.create(host.id);
                const events = new EventsForGame(game.id);
                socket.emit(events.HOST_GAME, game);
                this.setState({ game });
                socket.on(events.GAME_CREATED, this.gotoGame);
            },
            modalVisible: true,
        });
    }

    onCloseModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        const { modalVisible, joinFunction } = this.state;
        return (
            <Fragment>
                <Header />
                <div class={style.home}>
                    <EnterUserNameModal
                        visible={modalVisible}
                        onClose={this.onCloseModal}
                        onJoinGame={joinFunction}
                    />

                    <Input
                        autoFocus={true}
                        value=""
                        id="game-id-input"
                        label="Connect to a game"
                        iconLeft="gamepad"
                        placeholder="Game ID"
                        onInput={this.onGameIdChanged}
                    />
                    
                    <p>or</p>

                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={this.onHostGame}
                    >
                        Host your own game
                    </Button>
                </div>
            </Fragment>
        );
    }
};

export default Home;
