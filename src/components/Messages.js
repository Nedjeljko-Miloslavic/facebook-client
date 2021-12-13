import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector,useDispatch} from "react-redux";
import {useEffect,useState,useRef} from "react";
import {closeMessage} from "../redux/actions";
export default function Messages(){
	const message = useSelector(state=>state.message);
	const user = useSelector(state=>state.user).user;
	const dispatch = useDispatch();
	const [text,setText] = useState("");
	const textAreaRef = useRef();
	const handleKeyPress = (e)=>{
		if(e.key==="Enter" && text.length){
			console.log(user);
			textAreaRef.current.value = "";
			fetch("http://localhost:5000/messagesend",{
				credentials:"include",
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify({id:message.id,message:text})
			})
			.then(result=>{
				setText("");
			})
		}else{
			setText(textAreaRef.current.value);
		}
	}
	useEffect(()=>{
		textAreaRef.current.value= "";
	},[message]);
	return (
		<div className="message" style={{visibility:message.visibility}}>
			<div className="messageHeader">
				<div className="profileElements">
					<div className="messageImage">
						<PersonIcon/>
					</div>
					<p>{message.ime}</p>
					<p>{message.prezime}</p>
				</div>
				<div className="messageClose" onClick={()=>dispatch(closeMessage())}>
					<CloseIcon color="primary"/>
				</div>
			</div>
			<div className="messagesBody">
				{user.messages.map((message,index)=>{
					if(message.direction==="exiting"){
						return (<div key={index} className="exiting">{message.body}</div>);
					}else{
						return (<div key={index} className="incoming">{message.body}</div>);
					}
				})}
			
			</div>
			<textarea ref={textAreaRef} placeholder="pošalji poruku" onKeyUp={(e)=>handleKeyPress(e)}></textarea>
		</div>
	);
}