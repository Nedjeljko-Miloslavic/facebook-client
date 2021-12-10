import "../styles/login.css";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {setCurrentPage} from "../redux/actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
	root:{
		textTransform:"none",
		fontSize:"20px",
		color:"white",
		fontWeight:600
	},
	button1:{
		width:"100%"
	},
	button2:{
		backgroundColor:"rgba(0,170,0,0.8)",
		display:"block",
		margin:"auto",
		fontSize:"17px",
		"&:hover":{
			backgroundColor:"rgba(0,128,0,0.8)"
		}
	}
});

export default function Main(){
	const dispatch = useDispatch();
	const [errorMessageEmail,setErrorMessageEmail] = useState("");
	const errorMessageLozinka = "";
	const classes = useStyles();
	const [adresaTekst, setAdresaTekst] = useState("");
	const [lozinka, setLozinka] = useState("");
	
	const handleRegister = ()=>{
		window.location.href = "/register";
	}
	dispatch(setCurrentPage("login"));
	const handleOnclick = (e)=>{
		e.preventDefault();
		fetch("http://localhost:5000/usersFind", {
			credentials: "include",
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify({
				"adresa": adresaTekst,
			})
		})
		.then(result=>result.json())
		.then(data=>{
			if(data.length){
				setErrorMessageEmail("");
				fetch("http://localhost:5000/login",{
					credentials: "include",
					method:'POST',
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify({
						username: adresaTekst,
						password:lozinka
					})
				})
				.then(result=>result.json())
				.then(data=>{
					if(!data.user) window.location.href = "/main";
				});
				
			}else{
				setErrorMessageEmail("Unesena adresa e-pošte nije povezana s korisničkim računom.");
			}
		})
		.catch(err=>console.log(err));
	}
	
	
	return (
		<div className="mainLogin">
			<h1>facebook</h1>
			<form action="http://localhost:5000/users" method="post">
				<p>Prijava na Facebook</p>
				<div className="formElements">
					<input required name="email" onInput={(e)=>setAdresaTekst(e.target.value)} type="text" placeholder="Adresa e-pošte" />
					<p className="errorMessageEmail">{errorMessageEmail}</p>
					<input required onChange={e=>setLozinka(e.target.value)} type="password" placeholder="Lozinka" />
					<p className="errorMessageLozinka">{errorMessageLozinka}</p>
					<Button onClick={(e)=>handleOnclick(e)} type="submit" className={`${classes.root} ${classes.button1}`} variant="contained" color="primary">Prijavi se</Button>
					<div className="hrDiv">
						<div/>
						<span>ili</span>
						<div/>
					</div>
					<Button onClick = {()=>handleRegister()} className={`${classes.root} ${classes.button2}`} variant="contained" color="secondary">Kreiraj novi korisnički račun</Button>
				</div>
			</form>
		</div>
	);
}