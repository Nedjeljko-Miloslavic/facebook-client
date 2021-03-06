import PersonIcon from '@material-ui/icons/Person';
import {useSelector,useDispatch} from "react-redux";
import {useEffect,useState} from "react";
import {setMessagePartner} from "../redux/actions";

export default function MessagePartnersHeader(props){
	const user = useSelector(state=>state.user).user;
	const [messagePartners,setMessagePartners] = useState([]);
	const dispatch = useDispatch();
	
	useEffect(()=>{
		if(user.messages){
			const messagePartnerIds = user.messages.map(message=>{
				if(message.to){return message.to;}else{return message.from;}
			});
			const ids = messagePartnerIds.filter((value,index,array)=>array.indexOf(value)===index);

			ids.forEach(async id=>{
				await fetch("http://localhost:5000/user/"+id)
				.then(result=>result.json())
				.then(data=>{
					if(!messagePartners.map(partner=>partner._id).includes(data._id)){
						setMessagePartners(partners=>[...partners,data]);
					}
				});
			});
		}
	
	},[user]);
	
	const handleOnclick = (e)=>{
		dispatch(setMessagePartner({id:e._id,ime:e.ime,prezime:e.prezime,profilePicture:e.profilePicture}));
	}
	
	return (
		<div className="messagePartnersHeader" style={{visibility:props.visibility}}>
			<div className="title">Poruke</div>
			{messagePartners.map((partner,index)=>{
				return (
					<div key={index} value={partner} onClick={()=>handleOnclick(partner)} className="messagePartnersItem">
						<div className="image">{partner.profilePicture==="none" && <PersonIcon fontSize="small" style={{fill:"white"}} />}{partner.profilePicture!=="none" && <img src={"http://localhost:5000/"+partner.profilePicture.slice(7)} alt="profilePicture" />}</div>
						<div className="name">{partner.ime}</div>
						<div className="name">{partner.prezime}</div>
					</div>
				);
			})}
		</div>
	);
}