import SearchIcon from '@material-ui/icons/Search';
import Friends from '@material-ui/icons/SupervisorAccount';
import Message from '@material-ui/icons/Forum';
import PublicIcon from '@material-ui/icons/Public';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector,useDispatch} from "react-redux";
import {useState} from "react";
import {showPeople,setCurrentView} from "../redux/actions";
import MessagePartnersHeader from "./MessagePartnersHeader";

function MainHeader(){
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState("");
	const [logoutClicked,setLogoutClicked] = useState(false);
	const [MessageHeaderVisibility,setMessageHeaderVisibility] = useState("hidden");
	const user = useSelector(state=>state.user.user);
	const currentPage = useSelector(state=>state.currentPage);
	const people = useSelector(state=>state.showPeople);
	
	const handleSearch = ()=>{	
		fetch("http://localhost:5000/users")
		.then(data=>data.json())
		.then(users=>{
			users = users.filter(person=>{
				let searchValueText = searchValue.toLowerCase();
				let item = person.ime+person.prezime;
				item = item.toLowerCase();
				return item.includes(searchValueText) && person._id!==user._id;
			});
			dispatch(showPeople(users));
			dispatch(setCurrentView("search"));
			if(currentPage!=="friends"){
				localStorage.setItem("users", JSON.stringify(users));
				window.location.href = "/friends"; 
			}
		});
		
	}
	
	const handleKeyPress = (e)=>{
		if(e.code==="Enter"){
			handleSearch();
		}
	}
	const logout = ()=>{
		fetch("http://localhost:5000/logout",{credentials:"include"})
		.then(result=>{
			window.location.href="/";
			console.log(3);
		});
		
	}
	return (
		<div className="header">
			<MessagePartnersHeader visibility={MessageHeaderVisibility} />
			<div className="search">
				<div className="f" onClick={()=>window.location.href="/main"}><img src="images/facebookIcon.svg" alt="facebook"/></div>
				<input type="text" onKeyPress={(e)=>{handleKeyPress(e)}} onInput={(e)=>setSearchValue(e.target.value)} placeholder='Pretraži ljude mjesta i događaje'/>
				<div className="searchIcon" onClick={()=>handleSearch()}><SearchIcon color="action"/></div>
			</div>
			<div className="profile">
				<div className='profileImage' onClick={()=>window.location.href="/profile"}><div>{user.profilePicture==="none" && <PersonIcon color="disabled" fontSize="large"/>}{user.profilePicture!=="none" && <img src={"http://localhost:5000/"+user.profilePicture.slice(7)} alt="img"/>}</div></div>
				<div className='profileName' onClick={()=>window.location.href="/profile"}>{user.ime}</div>
				<div className='profileHome' onClick={()=>window.location.href="/main"}>Home</div>
			</div>
			<div className='icons'>
				<div className="icon" onClick={()=>window.location.href = "/friends"}><Friends style={{fill: "white", height:"30px"}} fontSize="large"/></div>
				<div className="icon" onClick={()=>setMessageHeaderVisibility(x=>x==="visible"?"hidden":"visible")}><Message style={{fill: "white", height:"30px"}} fontSize="large"/></div>
				<div className="icon"><PublicIcon style={{fill: "white", height:"30px"}} fontSize="large"/></div>
			</div>
			{!logoutClicked && <div className='logout' onClick={()=>setLogoutClicked(!logoutClicked)}><ArrowDropDownIcon/></div>}
			{logoutClicked && <div className='logout' onClick={()=>setLogoutClicked(!logoutClicked)}><ArrowDropDownIcon style={{fill:"white"}}/></div>}
			{logoutClicked && <div className="logoutContainer">
				<div className="logoutInner" onClick={()=>logout()}>
					<div className="logoutImage"><ExitToAppIcon/></div>
					<p>Odjava</p>
				</div>
			</div>}
		</div>
	);
}

export default MainHeader;