//on vide le local storage
window.localStorage.removeItem("token")
window.localStorage.removeItem("userId")


//on recupère le bouton submit dans le DOM
const buttonSubmit = document.getElementById("submit")
//on ajoute un listener sur le click du bouton submit
buttonSubmit.addEventListener("click",async (event)=>{
    //on annule le comportement par defaut du bouton 
    event.preventDefault();
    //on recupère les valeurs des champs mail et password
    const mail = document.getElementById("mail").value
    const password = document.getElementById("password").value
    //on créer un charge utile a partir du mail et du password
    let requete = {
                email: mail, 
                password: password
    };
    let chargeUtile = JSON.stringify(requete)
    //on fait une requete pour verifier que le combo mail/mdp soit correct
    let reponse = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    //si la requete renvoi un message d'erreur : 
    //401 not authorized, 404 user not found
    if(reponse.status==404 || reponse.status==401){
        //on recupère l'element du DOM pour afficher une erreur
        let messageErreur = document.getElementById("messageErreur")
        messageErreur.innerText = "Mail ou Mot de passe incorrect"
    }
    //si la requete renvoi un status 200 "connected"
    if(reponse.status==200){
        //on transforme la reponse en "objet json"
        //on extrait le token qu'on place dans le local storage
        //on redirgie l'utilisateur vers index.html
        let data = await reponse.json()
        window.localStorage.setItem("userId",data.userId)
        window.localStorage.setItem("token",data.token)
        window.location.href="index.html"
    }

})

