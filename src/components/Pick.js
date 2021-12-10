import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {showDate,hideDate,setErrors,click,setInput} from '../redux/actions';

export default function Pick({props}){
	const dispatch = useDispatch();
	const dateVisibility = useSelector(state=>state.showDate);
	const items = useSelector(state=>state.items);
	const [chosenValue,setChosenValue] = useState(props[0]);
	const [optionsVisibility, setOptionsVisibility] = useState("hidden");
	if(!dateVisibility && optionsVisibility==="visible"){
		setOptionsVisibility("hidden");
	}
	
	
	
	const handleOnClick = ()=>{
		dispatch(click(props[0].toLowerCase()));
		if(optionsVisibility==="hidden"){
			dispatch(showDate());
			setOptionsVisibility("visible");
		}else{
			dispatch(hideDate());
			setOptionsVisibility("hidden");
		}
	}
	const handleChosenValue=(e)=>{
		setChosenValue(e.target.innerHTML);
		setOptionsVisibility('hidden');
		dispatch(hideDate());
		if(e.target.innerHTML===props[0]){
			dispatch(setErrors({color:"red", item:props[0].toLowerCase()}));
			dispatch(setInput({item:props[0].toLowerCase(), input:""}));
		}else{
			dispatch(setErrors({color:"", item:props[0].toLowerCase()}));
			dispatch(setInput({item:props[0].toLowerCase(), input:e.target.innerHTML}));
		}
	}
	
	return (
		<div className="pickContainer">
			<div style={{borderColor:items[props[0].toLowerCase()].error}} onClick={()=>handleOnClick()} className="chosenValue">{chosenValue}<ExpandMoreIcon/></div>
			<div style={{visibility:optionsVisibility}} className="optionsContainer">
				{props.map((prop,index)=>{
					return (<div className="option" key={index} onClick={(e)=>handleChosenValue(e)}>{prop}</div>)
				})}
			</div>
			
		</div>
			
	);
}