import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined';
import MessageIcon from '@material-ui/icons/MessageOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplyIcon from '@material-ui/icons/ReplyOutlined';
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
			<div className="feed">
				<div className="feedItem">
					<div className="feedHeading">
						<div className="smallPhoto"><PersonIcon style={{fill:"white"}} fontSize="medium"/></div>
						<div className="info">
							<span>{`${user.ime} ${user.prezime}`}</span>
							<div className="date">12 2 2002</div>
						</div>
					</div>
					<div className="feedContent">
						<p> kaslkas klksal aksl aksl sklakl askl kasklask aaskl askl askl skl a klaskl as kl skla kl ak</p>
					</div>
					<div className="stats">
						<div className="images">
							<div className="thumb"><ThumbUpIcon fontSize="small" style={{color:"white"}}/></div>
							<div className="heart"><FavoriteIcon fontSize="small" style={{color:"white"}}/></div>
							<span>99</span>
						</div>
					</div>
					<div className="interactions">
						<div className="interaction">
							<div className="image"><ThumbUpIconOutlined style={{color:"rgb(100,100,100)"}}/></div>
							<div className="interactionActivity">Sviđa mi se</div>
						</div>
						<div className="interaction">
							<div className="image"><MessageIcon style={{color:"rgb(100,100,100)"}}/></div>
							<div className="interactionActivity">Komentar</div>
						</div>
						<div className="interaction">
							<div className="image"><ReplyIcon style={{color:"rgb(100,100,100)"}}/></div>
							<div className="interactionActivity">Podijeli</div>
						</div>
					</div>
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