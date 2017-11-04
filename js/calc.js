// GLOBALS
var operateursList = "+-*/%@x";
var operands = [];


function setText(text) {
  // set text to inputfield
    document.getElementById("inFieldId").value=operands.join(" ");
}

function clearText() {
  //clean input field AND operands list
    document.getElementById("inFieldId").value=""
    operands = [];
}

function errorMessage(message){
  // animate calc and display info message bellow
  document.getElementById('mainId').classList.add("shakeMain");;

  // show message buble
	document.getElementById("infos").style.visibility = 'visible'
  document.getElementById("infos").innerHTML = message;
}

function hideMessage(message){
  document.getElementById('mainId').classList.remove("shakeMain");
  document.getElementById("infos").style.visibility = 'hidden'
}

function equals(){

  hideMessage() // hide message anyway

  if (operands.length == 3){
    getResult()


  } else if ((operands.length == 1) &&  isNumeric(operands[0])) {
    // if isNumeric(operands[0]){
    //   null
     }
  else {
	errorMessage("Impossible de calculer")
  }

}


function isNumeric(value){
  return (isNaN(value) == false)
}


function back(){

	hideMessage()

	value = operands[operands.length-1]
  if (isNumeric(value)) {
	 operands[operands.length-1] = operands[operands.length-1].slice(0, -1)

   if (operands[operands.length-1] == 0){
     operands.splice(-1,1)}

  }  else {
	  operands.splice(-1,1)}

  refresh()

}
function parse(item) {
	hideMessage()

	var value = item.innerText

	if (operands.length === 0 || operands.length == 2){
		if (isNumeric(value)){
			operands.push(value)
		} else {
			errorMessage("Saisir un chiffre")}



	} else if (operands.length == 1){
		if (isNumeric(value)|| (value == '.')){
			var newItem = operands[0] + value;
			operands[0] = newItem
		} else if (operateursList.indexOf(value) > -1){
			operands.push(value);
    }

	} else if (operands.length == 3){

			if (isNumeric(value) || (value == '.')){
				var newItem = operands[2] + value
				operands[2] = newItem}
		else{
			getResult()
			}
	}
}

function getResult(){
	var result = calcul(operands.shift(), operands.shift(), operands.shift())
	// deal 0 division
	if (result == "Zero Division Error"){
		// alert ("To Infinite And Beyond !! (you stupid)")
    		errorMessage("Vers l'infini et au delà !!")
		operands = []
	//} else if (result == '42'){
		//errorMessage('The Answer To Life, Universe, And Everything')
		//setText('The Meaning Of Life')
	//	operands.push(result);
	} else {
		if (result == '42'){
      errorMessage('The Answer To Life, Universe, And Everything')


      // document.getElementById('mainId').style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both;";
      // document.getElementById('mainId').style.WebkitAnimation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both;";

    }

		operands.push(result);
	}
}
function refresh(){
	setText(operands.join(" "))
}

function oppose(){
	hideMessage()
	if ((operands.length == 0) || (operands.length == 2)){
		// alert ("gogol !")
		errorMessage("impossible de calculer l'opposé")
	}else{
		 operands[operands.length-1] = operands[operands.length-1] * -1
		refresh()
	}

}

function calcul(d1, op, d2){

	// d1 = parseInt(d1)
	// d2 = parseInt(d2)
	d1 = parseFloat(d1)
	d2 = parseFloat(d2)
	if (op == '+'){
		r = 0 + d1 + d2
		setText(r)
		return (r)
	}
	if (op == '-'){
		r = 0 + d1 - d2
		setText(r)
		return (r)
	}
	if (op == '*'){
		r = 0 + d1 * d2
		setText(r)
		return (r)
	}
	if (op == '%'){
		r = 0 + d1 % d2
		setText(r)
		return (r)
	}
	if (op == '/'){
		if (d2 == 0){
			return ("Zero Division Error")
		} else {
			r = 0 + d1 / d2
			setText(r)
			return (r)
		}
	}

}
