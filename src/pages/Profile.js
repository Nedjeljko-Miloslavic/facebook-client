import PersonIcon from '@material-ui/icons/Person';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {useState,useEffect} from "react";
import {loadUser,setCurrentPage} from "../redux/actions";
import {useDispatch,useSelector} from "react-redux";
import MainHeader from "../components/MainHeader";
import Messages from "../components/Messages";

export default function Profile(){
	const [file,setFile] = useState(null);
	const [src,setSrc] = useState("");
	const [visibility,setVisibility] = useState("hidden");
	const [profileImageSrc,setProfileImageSrc] = useState("");
	const user = useSelector(state=>state.user).user;
	const dispatch = useDispatch();
	
	useEffect(()=>{
		fetch("http://localhost:5000/test",{credentials: "include"})
		.then(result=>result.json())
		.then(user=>{
			if(!user.authenticated){
				window.location.href = "/";
			}else{
				dispatch(loadUser(user));
				dispatch(setCurrentPage("profile"));
			}
		});
	},[]);
	
	const handleChange = (e)=>{
		setFile(e.target.files[0]); 
	}
	const submit = ()=>{
		const image = new FormData();
		image.append("image",file);
		fetch("http://localhost:5000/profilePicture",{
			method:"POST",
			credentials:"include",
			body:image
		})
		.then((result)=>{
			fetch("http://localhost:5000/test",{credentials: "include"})
			.then(result=>result.json())
			.then(user=>{
				dispatch(loadUser(user));
			});
		})
		.catch(err=>console.log(err));
		
		
	}
	
	useEffect(()=>{
		if(file){
			const reader = new FileReader();
			reader.addEventListener("load",(e)=>{
				setSrc(e.target.result);
				setVisibility("visible");
			});
			reader.readAsDataURL(file);
		}
	},[file]);
	useEffect(()=>{
		if(user.profilePicture){
			let src = "http://localhost:5000/"+ user.profilePicture.slice(7);
			setProfileImageSrc(src);
		}
		
	},[user]);
	return (
		<div id="profile">
			<div className="main">
				<MainHeader/>
				<Messages/>
			</div>
			<label htmlFor="profilePicture" className="square">
				<div className="personImage">
					<div className="personImageImage"><PersonIcon style={{fill:"white",width:"180px",height:"180px"}}/></div>
					<div className="camera">
						<CameraAltIcon/>
					</div>
					<img src={src} alt="img"  style={{visibility:visibility}}/>
					<div id="ime">{user.ime}</div>
					<div id="prezime">{user.prezime}</div>
				</div>
				<div className="dodajte">
					<CameraAltIcon/>
					<span>Dodajte profilnu fotografiju</span>
				</div>
			</label>
			<input type="file" id="profilePicture" onChange={(e)=>handleChange(e)}/>
			<div className="submit" onClick={()=>submit()} style={{visibility:visibility}}>Spremi sliku</div>
			<div className="boxCover"></div>
			{user.profilePicture!=="none" && <div className="savedProfileImage">
				 <img src={profileImageSrc} alt="profileImage"/>
			</div>}
			
		</div>
	);
}