import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector,useDispatch} from "react-redux";
import {useEffect,useState,useRef} from "react";
import {closeMessage} from "../redux/actions";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export default function Messages(){
	const messagePartner = useSelector(state=>state.messagePartner);
	const user = useSelector(state=>state.user).user;
	const messageVisibility = useSelector(state=>state.messageVisibility);
	const dispatch = useDispatch();
	const [text,setText] = useState("");
	const [messages,setMessages] = useState([]);
	const [state,setState] = useState("");
	const textAreaRef = useRef();
	const messageBodyRef = useRef();
	const handleKeyPress = (e)=>{
		if(e.key==="Enter" && text.length){
			textAreaRef.current.value = "";
			fetch("http://localhost:5000/user/"+messagePartner.id)
			.then(data=>data.json())
			.then(result=>{
				console.log(result);
				fetch("http://localhost:5000/messagesend", {
					credentials:"include",
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({id:messagePartner.id,message:text,messages:result.messages})
				})
				.then(result=>{
					console.log(2);
					setState(Math.random());
					setText("");
					socket.emit("message");
				});
			});
		}else{
			setText(textAreaRef.current.value);
		}
	}
	
	useEffect(()=>{
		fetch("http://localhost:5000/test",{credentials:"include"})
		.then((result)=>result.json())
		.then(user=>{
			(setMessages(user.user.messages.reverse()));
		});
		textAreaRef.current.value= "";
	},[messagePartner,state]);
	
	
	socket.off("message").on("message", ()=>{
		setState(Math.random());
	});
	
	
	return (
		<div className="message" style={{visibility:messageVisibility}}>
			<div className="messageHeader">
				<div className="profileElements">
					<div className="messageImage">
						<PersonIcon/>
					</div>
					<p>{messagePartner.ime}</p>
					<p>{messagePartner.prezime}</p>
				</div>
				<div className="messageClose" onClick={()=>dispatch(closeMessage())}>
					<CloseIcon color="primary"/>
				</div>
			</div>
			<div className="messagesBody" ref={messageBodyRef}>
				{messages && messages.map((message,index)=>{
					if(message.direction==="exiting"){
						if(messagePartner.id===message.to){
							return (<div key={index} className="exiting"><span>{message.body}</span></div>);
						}
					}else{
						if(messagePartner.id===message.from){
							return (<div key={index} className="incoming"><span>{message.body}</span></div>);
						}
					}
				})}
			
			</div>
			<textarea ref={textAreaRef} placeholder="pošalji poruku" onKeyUp={(e)=>handleKeyPress(e)}></textarea>
		</div>
	);
}