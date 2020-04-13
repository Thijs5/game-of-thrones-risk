import io from 'socket.io-client';
import { createContext, FunctionalComponent } from 'preact';

const endpoint = 'http://localhost:3000';
io(endpoint);

export const SocketContext = createContext(null);

const SocketProvider: FunctionalComponent = ({ children }) => {
  const socket = io(endpoint);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;


export class EventsForGame {
  constructor(private gameId: string) { }

  HOST_GAME = 'HOST_GAME';
  GAME_CREATED = `GAME_${this.gameId}_CREATED`;
  PLAYER_JOINED = `GAME_${gameId}_PLAYER_JOINED`;
}