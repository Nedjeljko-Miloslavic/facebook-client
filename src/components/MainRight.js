import PersonIcon from '@material-ui/icons/Person';
import {useSelector,useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {setMessage} from "../redux/actions";

export default function MainRight(){
	const user = useSelector(state=>state.user).user;
	const dispatch = useDispatch();
	const [friends,setFriends] = useState([]);
	const handleOnclick = (friend)=>{
		dispatch(setMessage({id:friend._id,ime:friend.ime,prezime:friend.prezime,visibility:"visible"}));
	}
	useEffect(()=>{
		if(user.friends){
			fetch("http://localhost:5000/users")
			.then(data=>data.json())
			.then(users=>{
				const friends = users.filter(person=>user.friends.includes(person._id));
				setFriends(friends);
			});
		}
	},[user]);
	return (
		<div className="mainRight">
			<h4>Prijatelji</h4>
			<div className="friendList">
				{friends.map((friend,index)=>{
					return (<div key={index} className="friend" onClick={()=>handleOnclick(friend)}>
						<div className="image">
							<PersonIcon/>
						</div>
						<p>{friend.ime}</p><p>{friend.prezime}</p>
					</div>)
				})}
				
			</div>
		</div>
	);
}