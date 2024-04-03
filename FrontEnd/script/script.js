import * as modal from "./modal.js";
import * as work from "./work.js";
import * as gallery from "./gallery.js";

//on fait une première requete pour recupérer un tableau avec tous les travaux dans une variable
let works = await work.getWorks()

//changement de la page d'accueil quand utilisateur est connecté (localStorage("token")!==null)
function isLogged(){
    if(window.localStorage.getItem("token")!==null){
        // On efface le bouton login et on affiche le bouton logout
        let navLogin = document.getElementById("navLogin")
        let navLogout = document.getElementById("navLogout")
        navLogin.style.display="none"
        navLogout.style.display="block"
        // On affiche la marge noire en haut
        let headerEdit = document.getElementById("headerEdit")
        headerEdit.style.display="inline"
        // On fait disparaitre les filtres
        const divFiltres = document.getElementById("filtres")
        divFiltres.style.display="none"
        // On affiche le bouton "modifier"
        showModalEdit.style.display="inline"
    }
}


//
//GESTION DES FILTRES 
//


//ajout listener sur les boutons filtres
//on récupère tous les boutons "filtresButton"
const filtres = document.querySelectorAll(".filtresButton")
//on parcours tous les boutons
filtres.forEach(button => {
    //on créer un evenement au clic
    button.addEventListener("click", ()=>{
        //on recréer la galerie avec l'id de la catégorie a filtrer (null, 1, 2, 3)
        gallery.filterWorks(button.id, works)
        //on reparcourt tous les boutons pour retirer la classe "inUse"
        filtres.forEach(classe => {
            classe.classList.remove("inUse")
        })
        //on ajoute la classe inUse au filtre "actuel"
        button.classList.add("inUse")
    })
})


//
//GESTION DES FENETRES MODALES
//


//ajout du listener pour ouvrir la modale "Galerie photo" lorsqu'on clic sur "modifier"
const showModalEdit = document.getElementById("showModalEdit");
showModalEdit.addEventListener("click",()=>{
    modal.openModal();
})
//ajout du listener pour fermer les modales lorsqu'on clic sur la croix des modales
const modalClose = document.querySelectorAll(".modalClose");
modalClose.forEach(button => {
    button.addEventListener("click",()=>{
        modal.closeModal();
    })
})
//ajout du listener pour ouvrir la modale "ajout photo" et nettoyer le formulaire
const modalAddPhoto = document.getElementById("modalAddPhoto");
modalAddPhoto.addEventListener("click",()=>{
    //afficher la modale "ajout photo"
    modal.openAddPhoto();
})
//ajout du listener pour retourner sur la modale "galerie photo" depuis "ajout photo"
const modalBack = document.getElementById("modalBack");
modalBack.addEventListener("click",()=>{
    modal.openModal();
})
//arret de la propagation de l'evenement "clic en dehors des fentres modales"
const modalStopPropa = document.querySelectorAll(".js-modalStopPropa");
modalStopPropa.forEach( div =>
    div.addEventListener("click",(event)=>{
        event.stopPropagation();
    })
)
//listener pour cacher les fenetres modales si on click hors de la fenetre
const modalBG = document.getElementById("modal");
modalBG.addEventListener("click",()=>{
    modal.closeModal();
})


//
//BOUTON POUR AJOUTER UN TRAVAIL
//


//ajout du listener pour ajouter une photo dans l'API
const modalButtonValider = document.getElementById("modalButtonValider");
modalButtonValider.addEventListener("click", async (event)=>{
    //on inhibe le comportement par defaut du bouton de validation
    event.preventDefault();
    //on créer une nouvelle photo dans l'API a partir du formulaire
    await work.addWork();
})


//
//GESTION FORMULAIRE formIsOk() + PREVIEW
//


//listener pour s'assurer que le formulaire "add photo" est bien rempli
const titre = document.getElementById("titre");
titre.addEventListener("input",()=>{
    modal.formIsOk();
})
//listener pour s'assurer que le formulaire "add photo" est bien rempli puis creation de la preview
const photo = document.getElementById("photo");
photo.addEventListener("change",()=>{
    modal.formIsOk();
    modal.createPreview();
})


//
//GESTION LOGOUT
//


//listener pour vider le localStorage lors du clic sur "log out" 
const navLogout = document.getElementById("navLogout");
navLogout.addEventListener("click",(event)=>{
    event.preventDefault;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
})


//
//INITIALISATION
//


//création de la galerie et de la galerie d'édition a partir de la variable "works"
gallery.renderGallery(works);
//est ce que l'utilisateur est connecté, si oui modification des elements "connecté"
isLogged();