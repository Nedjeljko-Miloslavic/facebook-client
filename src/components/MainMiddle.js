import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";

export default function MainMiddle(){
	const user = useSelector(state=>state.user.user);
	return (
		<div className="mainMiddle">
			<div className="post">
				<div className="text">
					<div className="image"><PersonIcon style={{fill:"white"}} fontSize="large"/></div>
					<input type="text" placeholder={`O čemu razmišljate ${user.ime}?`} />
				</div>
				<div className="line"></div>
				<div className="photo">
					<PhotoLibraryTwoToneIcon color="secondary" fontSize="large"/>
					<span> Fotografija</span>
				</div>
			</div>
			<div className="addFriends">
				<h3>Nema drugih objava</h3>
				<p>Add more friends to see more posts in your News Feed.</p>
				<Button variant="contained" color="primary" onClick={()=>window.location.href="/friends"}>Find friends</Button>
			</div>
		</div>
	);
}