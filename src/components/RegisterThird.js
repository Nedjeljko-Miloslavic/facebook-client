
import Info from "../components/Info";
import Pick from "../components/Pick";
import RegisterSpol from "../components/RegisterSpol";
import {useSelector,useDispatch} from "react-redux";
import {register, adresaExists} from "../redux/actions";
export default function RegisterThird(){
	const items = useSelector(state=>state.items);
	const dispatch = useDispatch();
	const propsFirst = {
		info:"Datum rođenja",
		message1:"Klikni za više informacija",
		message2:{
			first:"Navođenjem datuma rođenja ",
			second:"omogućuje prilagođavanje iskustva Facebooka Vašoj dobi. Ako želite promijeniti publiku koja ovo može vidjeti, kliknite na sekciju 'O meni' svog profila."
		} 
	};
	const propsSecond = {
		info:"Spol",
		message1:"Klikni za više informacija",
		message2:{
			first:"",
			second:"Poslije možete promijeniti tko vidi vaš spol na vašem profilu. Odaberite 'Prilagođeno' kako biste odabrali drugi spol ili ako se ne želite izjasniti."
		}
	};
	const pickArray1 = ["Dan"];
	for(let i=1; i<31; i++){
		pickArray1.push(i);
	}
	const pickArray2 = ["Mjesec", "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"];
	const pickArray3 = ["Godina"];
	for(let i=2021; i>1900; i--){
		pickArray3.push(i);
	}
	
	const handleRegister = (e)=>{
		let OK = true;
		e.preventDefault();
		//console.log(items);
		dispatch(register(items));
		const emptyItems = Object.entries(items).filter(item=>item[1].input==="" && item[0]!=="zamjenica");
		if(emptyItems.length || !items.adresa.input.match(/^\S+@\S+\.\S+$/)){
			OK = false;
		}
		
		
		if(OK){
			fetch("http://localhost:5000/usersFind", {
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify({
					"adresa": items.adresa.input,
				})
			})
			.then(result=>result.json())
			.then(data=>{
				console.log(data);
				if(!data.length){
					fetch("http://localhost:5000/user", {
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body:JSON.stringify({
							"ime": items.ime.input,
							"prezime": items.prezime.input,
							"lozinka": items.lozinka.input,
							"adresa": items.adresa.input,
							"dan": items.dan.input,
							"mjesec": items.mjesec.input,
							"godina": items.godina.input,
							"spol": items.spol.input,
							"poruke": [],
							"prijatelji":[],
							"zahtjevi":[],
							"slike":[]
						})
					})
					.then(res=>{
						window.location.href ="http://localhost:3000";
					})
					.catch(err=>console.log(err));
				}else{
					console.log("mail postoji");
					dispatch(adresaExists(true));
				}
			})
			.catch(err=>console.log(err));
		}else{
			dispatch(adresaExists(false));
		}
	}
	return (
		<div className="RegisterThird">
			<Info props={propsFirst} />
			<div className="dateInfo">
				<Pick props={pickArray1} />
				<Pick props={pickArray2} />
				<Pick props={pickArray3} />
			</div>
			<Info props={propsSecond} />
			<RegisterSpol/>
			<div className="pravila">Klikom gumba <span>Registriraj se</span> potvrđujete da prihvaćate naše Uvjete upotrebe. U našim Pravilima o upotrebi podataka saznajte kako prikupljamo, upotrebljavamo i dijelimo vaše podatke, a u Pravilima o upotrebi kolačića saznajte kako se služimo kolačićima i sličnom tehnologijom. Možete primati naše obavijesti putem SMS-a, no tu funkciju uvijek možete isključiti.</div>
			<button className="registerButton" onClick={(e)=>handleRegister(e)}>Registriraj se</button>
		</div>
	);
}