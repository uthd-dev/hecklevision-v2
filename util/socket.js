import io from 'socket.io-client';

const socket = new io("http://192.168.8.161");

export default socket;