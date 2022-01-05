import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined';
import MessageIcon from '@material-ui/icons/MessageOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplyIcon from '@material-ui/icons/ReplyOutlined';
import {Button} from "@material-ui/core";
import {useSelector,useDispatch} from "react-redux";
import {useState,useEffect} from "react";
import SubmitImage from "./SubmitImage";
import {postImage,loadUser} from "../redux/actions";

export default function MainMiddle(){
	const milisecs = Date.now();
	const date = new Date(milisecs);
	const user = useSelector(state=>state.user.user);
	const [allPosts,setAllPosts] = useState([]);
	const [state,setState] = useState(1);
	const dispatch = useDispatch();
	
	const handleKeyPress = (e)=>{
		if(e.key==="Enter"){
			fetch("http://localhost:5000/textPost",{
				credentials:"include",
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify({
					text:e.target.value
				})
			})
			.then((result)=>setState(Math.random()))
			.catch(err=>console.log(err));
		}
	}
	useEffect(()=>{
		setInterval(()=>{
			setState(Math.random());
			fetch("http://localhost:5000/test",{credentials: "include"})
			.then(result=>result.json())
			.then(user=>{
				dispatch(loadUser(user));
			});
		},10000);
	},[]);
	
	useEffect(()=>{
		
		fetch("http://localhost:5000/users")
		.then(result=>result.json())
		.then(data=>{
			if(user.friends){
				let friendPosts = data.filter(item=>user.friends.includes(item._id));
				friendPosts.push(user);
				friendPosts = friendPosts.map(friend=>{
					let photoList = [];
					if(friend.photos){
						friend.photos.forEach(photo=>photoList.push({...photo,ime:friend.ime,prezime:friend.prezime,profilePicture:friend.profilePicture}));
					}
					return photoList;
				});
				let allPosts = [];
				friendPosts.forEach(postArray=>postArray.forEach(post=>allPosts.push(post)));
				allPosts.sort((a,b)=>a.timestamp-b.timestamp);
				allPosts = allPosts.reverse();
				allPosts = allPosts.map(post=>{
					let timeDifference = (Date.now()-post.timestamp)/1000;
					if(timeDifference<60){
						post.timestamp = Math.round(timeDifference) + " s";
					}else if(timeDifference<3600){
						post.timestamp = Math.round(timeDifference/60) + " min";
					}else if(timeDifference<86400){
						post.timestamp = Math.round(timeDifference/3600) + " h";
					}else{
						let date = new Date(post.timestamp);
						date = date.toLocaleString();
						post.timestamp = date;
					}
					
					return post;
				});
				setAllPosts(allPosts);
			}
		});
	},[user,state]);
	
	return (
		<div className="mainMiddle">
			<div className="post">
				<div className="text">
					<div className="image">{user.profilePicture==="none" && <PersonIcon style={{fill:"white"}} fontSize="large"/>}{user.profilePicture!=="none" && <img src={"http://localhost:5000/"+user.profilePicture.slice(7)} alt="profileImg" />}</div>
					<input type="text" onKeyPress={(e)=>handleKeyPress(e)} placeholder={`O čemu razmišljate ${user.ime}?`} />
				</div>
				<div className="line"></div>
				<div className="photo" onClick={()=>dispatch(postImage("block"))}>
					<PhotoLibraryTwoToneIcon color="secondary" fontSize="large"/>
					<span> Fotografija</span>
				</div>
			</div>
			
			<div className="feed">
				{allPosts.map((post,index)=>{	
					return (
					<div className="feedItem" key={index}>
						<div className="feedHeading">
							<div className="smallPhoto">{post.profilePicture==="none" && <PersonIcon style={{fill:"white"}} fontSize="medium"/>}{post.profilePicture!=="none" && <img src={"http://localhost:5000/"+post.profilePicture.slice(7)}/>}</div>
							<div className="info">
								<span>{`${post.ime} ${post.prezime}`}</span>
								<div className="date">{post.timestamp.toString()}</div>
							</div>
						</div>
						<div className="feedContent">
							<p>{post.text}</p>	
							{post.path && 
								<img src={"http://localhost:5000/"+post.path.slice(7)} alt="img"/>
							}
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
					)
				})}
			</div>
			<div className="addFriends">
				<h3>Nema drugih objava</h3>
				<p>Add more friends to see more posts in your News Feed.</p>
				<Button variant="contained" color="primary" onClick={()=>window.location.href="/friends"}>Find friends</Button>
			</div>
			
			
			<SubmitImage/>
		</div>
	);
}