import { faUser, faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = ({ socket, username, room }) => {
    return (
        <div className="sidebar">
            <h2><FontAwesomeIcon className="icon" icon={faHouseUser} /> <span>{room}</span></h2>
            <h2><FontAwesomeIcon className="icon" icon={faUser} /> <span>{username}</span></h2>
        </div>
    )
}

export default Sidebar
