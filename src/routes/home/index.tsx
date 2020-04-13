import { FunctionalComponent, h, Fragment } from "preact";
import { route } from "preact-router";

import * as style from "./style.css";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import { useState, useRef } from 'preact/hooks';
import Modal, { ModalProps } from "../../components/Modal";
import Header from "../../components/header";

const EnterUserNameModal: FunctionalComponent = (props: ModalProps) => {
    const [username, setUsername] = useState('');

    const onUsernameChanged = (event: any) => {
        setUsername(event.target.value);
    }
    const onClickJoinGame = () => {
        route(`/game/${username}`);
    }
    return (
        <Modal visible={props.visible} onClose={props.onClose}>
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <Input
                            autoFocus={true}
                            id="username-input"
                            label="Please enter your name so other players know who you are."
                            placeholder="Username"
                            onInput={onUsernameChanged}
                        />
                        <Button
                            variant={ButtonVariant.Primary}
                            onClick={onClickJoinGame}
                        >
                            Join game
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const Home: FunctionalComponent = () => {
    const [modal, setModal] = useState(false);
    console.log('modal', { modal });
    const onGameIdChanged = (e: any) => {
        const { value } = e.target;
        if (value && value.length == 2) {
            setModal(true);
        }
    };
    const onHostGame = () => {
        route('/host/:playerId');
    };
    return (
        <Fragment>
            <Header />
            <div class={style.home}>
                <EnterUserNameModal
                    visible={modal}
                    onClose={() => setModal(false)}
                />

                <Input
                    autoFocus={true}
                    id="game-id-input"
                    label="Connect to a game"
                    iconLeft="gamepad"
                    placeholder="Game ID"
                    onInput={onGameIdChanged}
                />
                
                <p>or</p>

                <Button
                    data-target="modal"
                    variant={ButtonVariant.Primary}
                    onClick={onHostGame}
                >
                    Host your own game
                </Button>
            </div>
        </Fragment>
    );
};

export default Home;
