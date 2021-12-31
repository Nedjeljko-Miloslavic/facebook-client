import {useState,useEffect,useRef} from "react"; 
import {useSelector,useDispatch} from "react-redux";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import {postImage,loadUser} from "../redux/actions";

export default function(){
	const dispatch = useDispatch();
	const postImageDisplay = useSelector(state=>state.postImageDisplay);
	const user = useSelector(state=>state.user).user;
	const [file,setFile] = useState(null);
	const [text,setText] = useState("");
	const [src,setSrc] = useState("");
	const [infoVisibility,setInfoVisibility] = useState("visible");
	const [imgVisibility,setImgVisibility] = useState("hidden");
	const textRef = useRef();
	
	const handleChange = (e)=>{
		setFile(e.target.files[0]);
	}
	const handleClick = ()=>{
		dispatch(postImage("none"));
		setSrc("");
		setImgVisibility("hidden");
		setInfoVisibility("visible");
		textRef.current.value = "";
		setText("");
		fetch("http://localhost:5000/test",{credentials: "include"})
		.then(result=>result.json())
		.then(user=>{
			dispatch(loadUser(user));
		});
	}
	const submit =()=>{
		if(file){
			const image = new FormData();
			image.append("image",file);
			image.append("text",text);
			fetch("http://localhost:5000/single",{
				credentials:"include",
				method:"POST",
				body:image
			})
			.then(result=>handleClick())
			.catch(err=>console.log(err));	
		}else{
			if(text){
				console.log(text);
				fetch("http://localhost:5000/textPost",{
					credentials:"include",
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						text:text
					})
				})
				.then(result=>handleClick())
				.catch(err=>console.log(err));
			}
			
		}
		
	}
	useEffect(()=>{
		if(file){
			const reader = new FileReader();
			reader.addEventListener("load", (e)=>{
				setSrc(e.target.result);
			},false);
			reader.readAsDataURL(file);
			setImgVisibility("visible");
			setInfoVisibility("hidden");
		}
		
	},[file]);
	
	
	return (
		<div className="submitImage" style={{display:postImageDisplay}}>
			<div className="form">
				<div className="heading">
					<h2>Kreirajte objavu</h2>
					<div id="x" onClick={()=>handleClick()}><div>X</div></div>
				</div>
				<div className="inputArea">
					<input type="text" ref={textRef} name="text" placeholder={"O čemu razmišljate, "+user.ime+"?"} onChange={(e)=>setText(e.target.value)}/>
					<label htmlFor="image">
						<div className="inputAreaInner">
							<div style={{visibility:infoVisibility}} className="image"><AddPhotoAlternateIcon style={{fill:"rgb(50,50,50)"}}/></div>
							<p style={{visibility:infoVisibility}}>Dodaj fotografije</p>
							<img style={{visibility:imgVisibility}} src={src} alt=""></img>
						</div>
						
					</label>
					<input type="file" id="image" name="image" onChange={(e)=>handleChange(e)}/>
				</div>
				<button onClick={()=>submit()}>Objavi</button>
			</div>
		</div>
	);
}