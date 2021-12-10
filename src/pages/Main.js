import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadUser,setCurrentPage} from "../redux/actions";
import "../styles/main.css";
import "../styles/mainHeader.css";
import "../styles/mainLeft.css";
import "../styles/mainMiddle.css";
import "../styles/mainRight.css";
import "../styles/friends.css";
import MainHeader from "../components/MainHeader";
import MainLeft from "../components/MainLeft";
import MainRight from "../components/MainRight";
import MainMiddle from "../components/MainMiddle";

export default function Main(){
	
	const dispatch = useDispatch();
	useEffect(()=>{
		fetch("http://localhost:5000/test",{credentials: "include"})
		.then(result=>result.json())
		.then(user=>{
			
			if(!user.authenticated){
				window.location.href = "/";
			}else{
				dispatch(loadUser(user));
				dispatch(setCurrentPage("main"));
			}
			
		});
	},[]);
	
	
	return (
		<div className="main">
			<div className="top"></div>
			<MainHeader/>
			<div className="mainContainer">
				<MainLeft/>
				<MainMiddle/>
				<MainRight/>
			</div>
			
		</div>
	);
} 