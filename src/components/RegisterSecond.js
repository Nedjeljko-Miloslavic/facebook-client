import {click,setInput} from "../redux/actions";
import {useDispatch,useSelector} from "react-redux";
export default function RegisterSecond({props}){
	const items = useSelector(state=>state.items);
	const emailError = useSelector(state=>state.emailError);
	const emailExists = useSelector(state=>state.emailExists);
	const dispatch = useDispatch();
	const handleOnclick = (item)=>{
		dispatch(click(item));
	}
	
	return (
		<div className="RegisterSecond">
			<input onChange={(e)=>dispatch(setInput({item:"ime",input:e.target.value}))} style={{borderColor:items["ime"].error}} onClick={()=>handleOnclick("ime")} type="text" name="ime" placeholder="Ime" maxlength="10" />
			<input onChange={(e)=>dispatch(setInput({item:"prezime",input:e.target.value}))} style={{borderColor:items["prezime"].error}} onClick={()=>handleOnclick("prezime")} type="text" name="prezime" placeholder="Prezime" maxlength="10" />
			<input onChange={(e)=>dispatch(setInput({item:"adresa",input:e.target.value}))} style={{borderColor:items["adresa"].error}} onClick={()=>handleOnclick("adresa")} type="text" name="adresa" placeholder="Adresa e-pošte" />
			{emailError && <p>Neispravna email adresa...</p>}
			{emailExists && <p>Email adresa već u upotrebi...</p>}
			<input onChange={(e)=>dispatch(setInput({item:"lozinka",input:e.target.value}))} style={{borderColor:items["lozinka"].error}} onClick={()=>handleOnclick("lozinka")} type="text" name="lozinka" placeholder="Nova lozinka" />
		</div>
	);
}