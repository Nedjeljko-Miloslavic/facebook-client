import {useSelector} from "react-redux";

export default function(){
	const number = useSelector(state=>state.number);
	const payload = useSelector(state=>state.payload);
	console.log(payload);
	return (
		<div>{number}</div>
	);
}