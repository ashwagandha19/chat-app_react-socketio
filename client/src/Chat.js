import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPaperPlane, faCommentDots } from '@fortawesome/free-solid-svg-icons'

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        //* we wait for the message to be sent

        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live chat   <FontAwesomeIcon className="icon" icon={faCommentDots} /></p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id={username === messageContent.author ? "you" : "other"}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="author">{messageContent.author}</p>
                                    <p id="time">{messageContent.time}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                 </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <button className="mic"><FontAwesomeIcon className="icon" icon={faMicrophone} /></button>
                <input type="text" value={currentMessage} placeholder="Write a message" onChange={(event) => {setCurrentMessage(event.target.value)}}
                onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
                />
                <button className="send" onClick={sendMessage}><FontAwesomeIcon className="icon" icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}

export default Chat
