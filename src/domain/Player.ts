import createUuid from '../components/uuid';

export interface IPlayer {
    id: string;
    username: string;
}

export default class Player implements IPlayer {
    private _id: string;
    get id(): string { return this._id; }
    set id(value: string) {
        this._id = value;
        this.save();
    }

    private _username: string;
    get username(): string { return this._username; }
    set username(value: string) {
        this._username = value;
        this.save();
    }

    constructor(args?: Partial<IPlayer>) {
        if (args) {
            if (args.id) { this._id = args.id; }
            if (args.username) { this._username = args.username }
        }
    }

    private save() {
        PlayerService.save(this.toJson());
    }

    toJson(): IPlayer {
        return {
            id: this._id,
            username: this._username,
        };
    }

    static create() {
        const player = new Player({
            id: createUuid(),
            username: ''
        });
        player.save();
        return player;
    }
    static get() {
        return PlayerService.get();
    }
}

export class PlayerService {
    private static key = 'PLAYER';

    static save(player: IPlayer) {
        localStorage.setItem(PlayerService.key, JSON.stringify(player));
    }

    static get(): Player {
        const item = localStorage.getItem(PlayerService.key);
        if (!item) { throw new Error('No player found'); }
        return new Player(JSON.parse(item));
    }
}