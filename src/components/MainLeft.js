import PersonIcon from '@material-ui/icons/Person';
import Friends from '@material-ui/icons/SupervisorAccount';
import FacebookIcon from '@material-ui/icons/Facebook';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagTwoToneIcon from '@material-ui/icons/FlagTwoTone';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import {useSelector} from "react-redux";

export default function MainLeft(){
	const user = useSelector(state=>state.user.user);
	return (
		<div className="mainLeft">
			<div className="itemList">
				<div className="item"><div className="image">{user.profilePicture==="none" &&<PersonIcon style={{fill:"white"}}/>}{user.profilePicture!=="none" && <img src={"http://localhost:5000/"+user.profilePicture.slice(7)} alt="profileImg" />}</div><p>{user.ime}</p><p>{user.prezime}</p></div>
				<div className="item" onClick={()=>window.location.href="/friends"}><Friends color="primary"/><p>Pronađite prijatelje</p></div>
				<div className="item"><FacebookIcon color="primary"/><p>Dobro došli</p></div>
				<div className="item"><SupervisedUserCircleRoundedIcon style={{fill:"brown"}}/><p>Grupe</p></div>
				<div className="item"><StoreRoundedIcon color="secondary"/><p>Marketplace</p></div>
				<div className="item"><VideoCallRoundedIcon /><p>Watch</p></div>
				<div className="item"><RestoreRoundedIcon color="primary"/><p>Uspomene</p></div>
				<div className="item"><BookmarkIcon style={{fill:"brown"}}/><p>Spremljeno</p></div>
				<div className="item"><FlagTwoToneIcon color="primary"/><p>Stranice</p></div>
				<div className="item"><EventNoteTwoToneIcon color="primary"/><p>Događaji</p></div>
				<div className="item"><BusinessCenterTwoToneIcon color="secondary"/><p>Radna mjesta</p></div>
			</div>
		</div>
	);
}