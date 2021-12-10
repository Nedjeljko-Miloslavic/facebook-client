const initialState = {
	user:{user:{ime:"ime", prezime:"prezime"}},
	showPeople:[],
	currentPage:"login",
	show:false,
	showDate:false,
	showPozelite:false,
	advancedDisplay:"none",
	emailError:false,
	emailExists:false,
	currentView:"search",
	items:{
		ime:{
			error:"",
			clicked:false,
			input:""
		},
		prezime:{
			error:"",
			clicked:false,
			input:""
		},
		adresa:{
			error:"",
			clicked:false,
			input:""
		},
		lozinka:{
			error:"",
			clicked:false,
			input:""
		},
		dan:{
			error:"",
			clicked:false,
			input:""
		},
		mjesec:{
			error:"",
			clicked:false,
			input:""
		},
		godina:{
			error:"",
			clicked:false,
			input:""
		},
		spol:{
			error:"",
			clicked:false,
			input:"Žensko"
		},
		zamjenica:{
			error:"red",
			clicked:false,
			input:""
		},
		
	},
	
};

export const reducer = (state=initialState, action)=>{
	const items = state.items;
	switch(action.type){
		case "SHOWMESSAGE":
			return {...state, show:true};
		case "HIDEMESSAGE":
			return {...state, show:false};
		case "HIDEDATE":
			return {...state, showDate:false};
		case "SHOWDATE":
			return {...state, showDate:true};
			
			
		case "SETERRORS":
			items[action.payload.item].error = action.payload.color;
			return {...state, items};
		case "CLICK":
			items[action.payload].clicked = true;
			return {...state, items};
		case "TURNRED":
			for(let item in items){
				if(items[item].input==="" && items[item].clicked){
					items[item].error = "red";
				}else{
					items[item].error = "";
				}
			}
			return {...state, items};
		case "SETINPUT":
			items[action.payload.item].input = action.payload.input;
			return {...state, items};
		case "SHOWPOZELITE":
			return {...state, showPozelite:!state.showPozelite};
		case "SHOWADVANCED":
			return {...state, advancedDisplay:"block"};
		case "HIDEADVANCED":
			return {...state, advancedDisplay:"none"};
		case "CHOOSESPOL":
			items.spol.input = action.payload;
			return {...state, items};
		case "REGISTER":
			let emailError = false;
			for(let item in items){
				if(items[item].input===""){
					items[item].error = "red";
					items[item].clicked = true;
				}
			}
			if(!items.adresa.input.match(/^\S+@\S+\.\S+$/) && items.adresa.input!==""){
				items.adresa.error = "red";
				items.adresa.clicked = true;
				emailError = true;
			}else{
				emailError = false;
			}
			return {...state, items, emailError:emailError};
		case "ADRESAEXISTS":
			if(action.payload){
				return {...state, emailExists:true};
			}else{
				return {...state, emailExists:false};
			}
			
		case "LOADUSER":
			return {...state, user:action.payload}
			
		case "SHOWPEOPLE":
			return {...state, showPeople:action.payload}
		case "PEOPLELOCAL":
			return {...state, showPeople:action.payload}
		case "SETCURRENTPAGE":
			return {...state, currentPage:action.payload};
		case "SETCURRENTVIEW":
			return {...state, currentView:action.payload};
		default:
			return state;
	}
}