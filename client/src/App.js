import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  //* common thing with these rooms

  const joinRoom = () => {
    if(username!=="" && room!=="") {
      console.log(username);
      console.log(room);
      socket.emit("join_room", room);
      console.log(`User with ID: ${socket.id} joined room ${room}`)
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      
      {
        !showChat ?
          (<div className="joinChatContainer">
            <h3>Join a chat</h3>
            <input type="text" placeholder="Ash" onChange={(event) => {setUsername(event.target.value)}}/>
            <input type="text" placeholder="Room ID" onChange={(event) => {setRoom(event.target.value)}}/>
            <button onClick={joinRoom}>Join a room</button>
          </div>)
        : 
        
      (<>
        <Sidebar username={username} room={room}/>
        <Chat socket={socket} username={username} room={room}/>
      </>)
    }
    </div>
  );
}

export default App;
