import RegisterFirst from "../components/RegisterFirst";
import RegisterSecond from "../components/RegisterSecond";
import RegisterThird from "../components/RegisterThird";
import "../styles/register.css";
import {hideMessage,hideDate,turnRed,showPozelite} from "../redux/actions";
import {useDispatch,useSelector} from "react-redux";
import {useState} from "react";


export default function Register(){
	const pozeliteVisibility = useSelector(state=>state.showPozelite);
	const [items,setItems] = useState(0);
	const dispatch = useDispatch();
	const handleClick = (e)=>{
		setItems(Math.random());
		if(e.target.tagName!=="path" && e.target.tagName!=="svg" && e.target.classList.value!=="registerButton"){
			dispatch(hideMessage());
		}
		if(e.target.tagName!=="path" && e.target.tagName!=="svg" && e.target.classList.value!=="chosenValue" && e.target.classList.value!=="registerButton"){
			dispatch(hideDate());
		}
		if(e.target.classList.value===""){
			dispatch(turnRed());
		}
		if(!e.target.id && pozeliteVisibility){
			dispatch(showPozelite());
		}
		
	};
	
	return (
	<div onClick={(e)=>handleClick(e)}>
		<div className="mainRegister">
			<RegisterFirst/>
			<form>
				<RegisterSecond/>
				<RegisterThird/>
			</form>
		</div>
	</div>
	);
}