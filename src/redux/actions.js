const hideMessage = ()=>{
	return {
		type:"HIDEMESSAGE"
	};
}
const showMessage = ()=>{
	return {
		type:"SHOWMESSAGE"
	};
}
const hideDate = ()=>{
	return {
		type:"HIDEDATE"
	};
}
const showDate = ()=>{
	return {
		type:"SHOWDATE"
	};
}
const setErrors = (payload)=>{
	return {
		type:"SETERRORS",
		payload:payload
	};
}
const click = (payload)=>{
	return {
		type:"CLICK",
		payload:payload
	};
}
const turnRed = ()=>{
	return {
		type:"TURNRED"
	};
}
const setInput = (payload)=>{
	return {
		type:"SETINPUT",
		payload:payload
	};
}
const showPozelite = ()=>{
	return {
		type:"SHOWPOZELITE"
	};
}
const showAdvanced = ()=>{
	return {
		type:"SHOWADVANCED"
	};
}
const hideAdvanced = ()=>{
	return {
		type:"HIDEADVANCED"
	};
}
const chooseSpol = (payload)=>{
	return {
		type:"CHOOSESPOL",
		payload
	};
}
const register = (payload)=>{
	return {
		type:"REGISTER",
		payload
	};
}
const adresaExists = (payload)=>{
	return {
		type:"ADRESAEXISTS",
		payload
	};
}




export const loadUser = (payload)=>{
	return {
		type:"LOADUSER",
		payload
	};
}

export const showPeople =(payload)=>{
		return {
			type:"SHOWPEOPLE",
			payload
		};
}
export const peopleLocal = (payload)=>{
	return {
		type:"PEOPLELOCAL",
		payload
	};
}

export const setCurrentPage = (payload)=>{
	return {
		type:"SETCURRENTPAGE",
		payload
	};
}

export const setCurrentView = (payload)=>{
	return {
		type:"SETCURRENTVIEW",
		payload
	};
}
export const setMessagePartner = (payload)=>{
	return {
		type:"SETMESSAGEPARTNER",
		payload
	}
}
export const closeMessage = ()=>{
	return {
		type:"CLOSEMESSAGE"
	};
}
export const postImage = (payload)=>{
	return {
		type:"POSTIMAGE",
		payload
	};
}

export {hideMessage};
export {showMessage};
export {hideDate};
export {showDate};
export {setErrors};
export {click};
export {turnRed};
export {setInput};
export {adresaExists,register,showPozelite,showAdvanced,hideAdvanced,chooseSpol};
