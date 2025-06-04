import io from 'socket.io-client';
import { BASE_URL } from './constant';

export const createSocketConnection = () => {
  if(location.hostname === "localhost"){
    console.log("******BASE URL IS*****",BASE_URL);
    return io(BASE_URL);
  } else {
    console.log("PATH IS  api/socket.io");
    return io("/", { path: "api/socket.io" });
  }
};