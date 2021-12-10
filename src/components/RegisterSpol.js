import {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector,useDispatch} from "react-redux";
import {setInput,chooseSpol,showPozelite,showAdvanced,hideAdvanced} from "../redux/actions";
export default function RegisterSpol(){
	const dispatch = useDispatch();
	//const [chosen,setChosen] = useState("none");
	const [odabranaZamjenica,setOdabranaZamjenica] = useState("Odaberite svoju zamjenicu");
	const pozeliteVisibility = useSelector(state=>state.showPozelite);
	const advancedDisplay = useSelector(state=>state.advancedDisplay);
	
	
	const handleOption =(string,e)=>{
		//setChosen(string);
		e.currentTarget.childNodes[1].checked=true;
		if(string==="Prilagođeno"){
			dispatch(showAdvanced());
		}else{
			dispatch(hideAdvanced());
			dispatch(chooseSpol(string));
		}
		
	}
	const handlePozelite =(e)=>{
		setOdabranaZamjenica(e.target.innerHTML);
		dispatch(showPozelite());
		dispatch(setInput({item:"zamjenica",input:e.target.innerHTML}));
	}
	const handleOdaberite =()=>{
		dispatch(showPozelite());
	}
	const handleInput = (e)=>{
		dispatch(setInput({item:"spol",input:e.target.value}));
	}
	
	
	return (
		<>
			<div className="spol">
				<div className="spolOption" onClick={(e)=>handleOption("Žensko",e)}>
					<label htmlFor="zensko">Žensko</label>
					<input defaultChecked="true" type="radio" className="zensko" value="Žensko" name="spol" />
				</div>
				
				<div className="spolOption" onClick={(e)=>handleOption("Muško",e)}>
					<label htmlFor="musko">Muško</label>
					<input type="radio" className="musko" value="Muško" name="spol" />
				</div>
				
				<div className="spolOption" onClick={(e)=>handleOption("Prilagođeno",e)}>
					<label htmlFor="prilagodjeno">Prilagođeno</label>
					<input type="radio" className="prilagodjeno" value="Prilagođeno" name="spol" />
				</div>	
			</div>
			<div id="advanced" style={{display:advancedDisplay}}>
				<div id="odaberite" onClick={()=>handleOdaberite()}>
					<p id="odabranaZamjenica">{odabranaZamjenica}</p>
					<ExpandMoreIcon />
				</div>
				<div id="pozelite" style={{visibility:pozeliteVisibility?"visible":"hidden"}}>
					<p id="ona" onClick={(e)=>handlePozelite(e)}>Ona: "Poželite joj sretan rođendan"</p>
					<p id="on" onClick={(e)=>handlePozelite(e)}>On: "Poželite mu sretan rođendan"</p>
					<p id="neutralno" onClick={(e)=>handlePozelite(e)}>Neutralno: "Poželite sretan rođendan"</p>
				</div>
				<div id="svi">Svi mogu vidjeti vašu zammjenicu.</div>
				<input onInput={(e)=>handleInput(e)} type="text" id="spolCustom" name="spolCustom" placeholder="Spol (nije obavezno)" />
			</div>
		</>
	);
}