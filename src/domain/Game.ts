import createUuid from '../components/uuid';

export interface IGame {
    id: string;
    hostId: string;
    playerIds: string[];
}

export default class Game implements IGame {
    private _id: string;
    get id(): string { return this._id; }
    set id(value: string) {
        this._id = value;
        this.save();
    }

    private _hostId: string;
    get hostId(): string { return this._hostId; }
    set hostId(value: string) {
        this._hostId = value;
        this.save();
    }

    private _playerIds: string[] = [];
    get playerIds(): string[] {
        return this._playerIds.concat(this.hostId);
    }
    addPlayer(playerId: string) {
        if (!playerId) {
            console.error('Player ID must be a valid uuid.');
        }
        this._playerIds.push(playerId);
        this.save();
    }

    constructor(args?: Partial<IGame>) {
        console.log(args?.playerIds);
        if (args) {
            if (args.id) { this._id = args.id; }
            if (args.hostId) { this._hostId = args.hostId; }
            if (args.playerIds) { this._playerIds = args.playerIds; }
        }
    }

    private save() {
        GameService.save(this.toJson());
    }

    toJson(): IGame {
        return {
            id: this.id,
            hostId: this.hostId,
            playerIds: this._playerIds,
        };
    }

    isHost(playerId: string): boolean {
        return this.hostId == playerId;
    }

    static create(hostId: string) {
        const game = new Game({
            id: createUuid(),
            hostId,
            playerIds: [],
        });
        game.save();
        return game;
    }

    static get(): Game {
        return GameService.get();
    }
}

export class GameService {
    private static key = 'GAME';

    static save(game: IGame) {
        if (game.playerIds.length == 1) {
            debugger;
        }
        localStorage.setItem(GameService.key, JSON.stringify(game));
    }

    static get(): Game {
        const item = localStorage.getItem(GameService.key);
        if (!item) { throw new Error('No game found'); }
        return new Game(JSON.parse(item));
    }
}