import io from 'socket.io-client';

const socket = new io(`${process.env.BACKEND_HOST}`);

export default socket;