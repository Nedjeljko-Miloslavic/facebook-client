import HelpIcon from '@material-ui/icons/Help';
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {showMessage, hideMessage} from "../redux/actions";

const useStyles = makeStyles({
	icon:{
		"&:hover":{
			cursor:"pointer"
		},
		position:"relative",
		top:"6px",
		left:"5px",
		transform:"scale(0.7)"
	}
});

export default function Info({props}){
	const show = useSelector(state=>state.show);
	const dispatch = useDispatch();
	
	const classes = useStyles();
	const [message1,setMessage1] = useState("hidden");
	const [message2,setMessage2] = useState("hidden");
	let hovering = false;
	
	const handleMouseOver = ()=>{
		hovering = true;
		setTimeout(()=>{
			if(hovering){
				setMessage1("visible");
			}	
		},500);
				
	}
	const handleMouseOut = ()=>{
		hovering = false;
		setMessage1("hidden");
	}
	const handleOnClick = (e)=>{
		if(message2==="hidden"){
			setMessage2("visible");
			dispatch(showMessage());
		}else{
			setMessage2("hidden");
			dispatch(hideMessage());
		}
	}
	if(!show && message2==="visible"){
		setMessage2("hidden");
	}
	return (
		<div className="Info">
			<span>{props.info}</span>
			<HelpIcon className={classes.icon} color="action" onMouseEnter={()=>handleMouseOver()} onMouseLeave={()=>handleMouseOut()} onClick={(e)=>handleOnClick(e)} />
			{<div style={{visibility:message1}} className="message1">{props.message1}</div>}
			{<div style={{visibility:message2}} className="message2"><span className="bolded">{props.message2.first}</span><span>{props.message2.second}</span></div>}
		</div>
	);
}