import * as modal from "./modal.js";
import * as work from "./work.js";
import * as gallery from "./gallery.js"

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

//focntion qui ajoute les listener sur les boutons filtres
function createFilter(){
    //on récupère tous les boutons de la div "filtres"
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
    });
}


//GESTION DES BOUTONS :

//on créer la galerie a partir du tableau works
modal.createGalleryEdit(works);
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
    //reset du formulaire, "effacement du preview" et effacement du message d'erreur
    document.getElementById("modalForm").reset();
    modal.erasePreview()
    const modalFormError = document.getElementById("modalFormError")
    modalFormError.innerHTML = ""
})
//ajout du listener pour retourner sur la modale "galerie photo" depuis "ajout photo"
const modalBack = document.getElementById("modalBack");
modalBack.addEventListener("click",()=>{
    modal.openModal();
})

//ajout du listener pour ajouter une photo dans l'API
const modalButtonValider = document.getElementById("modalButtonValider");
modalButtonValider.addEventListener("click", async (event)=>{
    //on inhibe le comportement par defaut du bouton de validation
    event.preventDefault();
    //on créer une nouvelle photo dans l'API a partir du formulaire
    //work.addwork() renvoi la reponse de la requete (id, imageUrl, title...)
    let newWork = await work.addWork();
    //ajout du visuel de la nouvelle photo
    gallery.addGalleryElement(newWork.id, newWork.imageUrl, newWork.title);
    //ajout listener de suppression dans la galerie d'édition
    addListenerModalImgSuppr()
    //on reset le formulaire, efface la preview et on met a jour les galeries
    document.getElementById("modalForm").reset();
    modal.erasePreview()
    //appel de formIsOk() pour disabled le bouton de validation
    modal.formIsOk()

})

function addListenerModalImgSuppr(){
//recupération des boutons de supression de la galerie d'editon et ajour d'un listener pour supprimer les photos
let modalImgSuppr = document.querySelectorAll(".modalImgSuppr");
modalImgSuppr.forEach(button => button.addEventListener("click", async ()=>{
    //suppression d'une photo a partir de son id (l'id de la photo est placé sur le bouton lors de la creation de la galerie)
    let id = button.id
    await work.deleteWork(id);
    //mis a jour de l'affichage
    gallery.deleteGalleryElement(id);
}))
}

//listener pour vider le localStorage lors du clic sur "log out" 
const navLogout = document.getElementById("navLogout");
navLogout.addEventListener("click",(event)=>{
    event.preventDefault;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
})
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

//INITIALISATION
//création de la galerie a partir de la variable "works"
gallery.renderGallery(works);
//cration des filtres
createFilter();
//est ce que l'utilisateur est connecté, si oui modification des elements "connecté"
isLogged();
//creation des listener de la modalEdition
addListenerModalImgSuppr();