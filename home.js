
function valider() {
	nom = inputa.value;
	prenom = inputb.value;
	email = inputc.value;
	mdp = inputd.value;
	
	if (nom != "" && prenom != "" && email != "" && mdp != "") {
		message.value = nom + " " + prenom + " " + email + " " + mdp;
	}
	else {
		message.value = "Missing element"
	}
}

function init() {
	inputa           = document.getElementById("inputa");
	inputb           = document.getElementById("inputb");
	inputc           = document.getElementById("inputc");
	inputd           = document.getElementById("inputd");
	boutona          = document.getElementById("boutona");
	boutona.onclick  = valider;
}

window.onload = init;
