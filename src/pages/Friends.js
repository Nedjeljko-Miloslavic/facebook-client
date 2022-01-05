import MainHeader from "../components/MainHeader";
import Messages from "../components/Messages";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {loadUser, setCurrentPage, peopleLocal, setCurrentView} from "../redux/actions";
import {useState} from "react";

export default function Friends(){
	const user = useSelector(state=>state.user.user);
	const people = useSelector(state=>state.showPeople);
	const [state,setState] = useState("");
	const currentView = useSelector(state=>state.currentView);
	const dispatch = useDispatch();
	useEffect(()=>{
		fetch("http://localhost:5000/test",{credentials: "include"})
		.then(result=>result.json())
		.then(user=>{
			if(!user){
				window.location.href = "/";
			}
			if(!user.authenticated){
				window.location.href = "/";
			}else{
				dispatch(loadUser(user));
				dispatch(setCurrentPage("friends"));
			}
		});
	},[state]);
	useEffect(()=>{
		let users = JSON.parse(localStorage.getItem("users"));
		setTimeout(()=>{
			dispatch(peopleLocal(users));
			localStorage.setItem("users",JSON.stringify([]));
		},1000);		
	},[]);
	useEffect(()=>{
		setCurrentView("search");		
	},[people]);
	
	
	
	
	const handleZahtjevi = ()=>{
		fetch("http://localhost:5000/users")
		.then(result=>result.json())
		.then(accounts=>{
			let friendRequestAccounts = accounts.filter(account=>user.friendRequestsRecieved.includes(account._id));
			dispatch(peopleLocal(friendRequestAccounts));
			dispatch(setCurrentView("zahtjevi"));
		});
	}
	const handlePocetna = ()=>{
		dispatch(setCurrentView("search"));
		window.location.href = "/friends";
	}
	const handleSviPrijatelji = ()=>{
		dispatch(setCurrentView("prijatelji"));
		let friends = [];
		fetch("http://localhost:5000/users")
		.then(data=>data.json())
		.then(result=>{
			let friends = result.filter(person=>user.friends.includes(person._id));
			dispatch(peopleLocal(friends));
		});
		
	}
	
	//add remove & accept--------------------------
	const addFriend = (friend)=>{
		fetch("http://localhost:5000/addFriend", {
			credentials:"include",
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({friend})
		})
		.then(()=>setState(Math.random()));
	}
	const removeRequest = (friend)=>{
		fetch("http://localhost:5000/removeRequest", {
			credentials:"include",
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({friend})
		})
		.then(()=>setState(Math.random()));
	}
	const acceptFriend = (friend)=>{
		fetch("http://localhost:5000/acceptFriend",{
			credentials:"include",
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({
				friend
			})
		})
		.then(()=>setState(Math.random()));
	}
	const unfriend = (friend)=>{
		fetch("http://localhost:5000/unfriend",{
			credentials:"include",
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({
				friend
			})
		})
		.then(()=>setState(Math.random()));
	}

	
	
	return (
		<div className="main">
			<Messages/>
			<MainHeader/>
			<div className="friends">
				<div className="friendItem" onClick={()=>handlePocetna()}>
					<SupervisedUserCircleRoundedIcon fontSize="large" color="primary"/>
					<p>Početna</p>
				</div>
				<div className="friendItem" onClick={()=>handleZahtjevi()}>
					<div className="friendsImage"><PersonAddIcon/></div>
					<p>Zahtjevi za prijateljstvom</p>
					<div className="arrow"><ArrowForwardIosIcon fontSize="small" style={{color:"rgb(100,100,100)", position:"absolute", left:"340px"}}/></div>
				</div>
				<div className="friendItem" onClick={()=>handleSviPrijatelji()}>
					<div className="friendsImage"><GroupIcon/></div>
					<p>Svi prijatelji</p>
					<div className="arrow"><ArrowForwardIosIcon fontSize="small" style={{color:"rgb(100,100,100)", position:"absolute", left:"340px"}}/></div>
				</div>
			</div>
			<div className="friendsSearch">
				{currentView==="search" && <h4>Dodaj prijatelje</h4>}
				{currentView==="prijatelji" && <h4>Svi prijatelji</h4>}
				{currentView==="zahtjevi" && <h4>Zahtjevi za prijateljstvom</h4>}
				{people && people.map((friend,index)=>{
					let visibility = "visible";
					let friendAdded = false;
					let ids = user.friendRequests;
					if(ids.includes(friend._id)){
						visibility = "hidden";
					}
					let friendIds = user.friends;
					if(friendIds.includes(friend._id)){
						friendAdded = true;
					}
					return (
						<div key={index} className="friend">
							<div className="friendImage">{friend.profilePicture==="none" && <PersonIcon fontSize="large" style={{height:"65px", width:"65px", color:"white"}}/>}{friend.profilePicture!=="none" && <img src={"http://localhost:5000/"+friend.profilePicture.slice(7)} alt="profileImg"/>}</div>
							<div className="names">
								<p className="friendName">{friend.ime}</p>
								<p className="friendName">{friend.prezime}</p>
							</div>
							{currentView==="search" && <>
								{!friendAdded && <>
									<div className="addFriend" style={{visibility:visibility}} onClick={()=>addFriend(friend)}>
										<PersonAddIcon/>
										<div className="message">Dodaj prijatelja</div>
									</div>
									<div className="removeFriend" style={{visibility:visibility==="hidden"?"visible":"hidden"}} onClick={()=>removeRequest(friend)}>
										<PersonAddDisabledIcon/>
										<div className="message">Otkaži zahtjev za prijateljstvom</div>
									</div>
								</>}
								{friendAdded &&
								<div className="addFriend unfriend" onClick={()=>unfriend(friend)}>
									<RemoveCircleIcon fontSize="large"/>
									<div className="message">Ukloni prijatelja</div>
								</div>
								}
							</>}
							{currentView==="zahtjevi" && <div className="acceptFriend" onClick={()=>acceptFriend(friend)}>
								<DoneIcon/>
								<div className="message">Prihvati zahtjev za prijateljstvom</div>
							</div>}
							
							{currentView==="prijatelji" && <div className="addFriend unfriend" onClick={()=>unfriend(friend)}>
								<RemoveCircleIcon fontSize="large"/>
								<div className="message">Ukloni prijatelja</div>
							</div>}
							
						</div>
					)
				})}
			</div>
		</div>
	);
}