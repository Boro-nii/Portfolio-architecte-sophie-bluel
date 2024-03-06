import * as modal from "./modal.js";
import * as work from "./work.js";
import * as gallery from "./gallery.js"

// console.log("token :"+window.localStorage.getItem("token"))
// console.log("userId :"+window.localStorage.getItem("userId"))

const works = await work.getWorks()

function isLogged(){
    if(window.localStorage.getItem("token")!==null){
        // Changement bouton "login" en "logout"
        let navLogin = document.getElementById("navLogin")
        navLogin.innerText="Logout"
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
            button.classList.toggle("inUse")
        })
    });
}

//GESTION DES BOUTONS :

modal.createGalleryEdit(works);

const showModalEdit = document.getElementById("showModalEdit")
showModalEdit.addEventListener("click",()=>{
    modal.openModal()
})

const modalClose = document.querySelectorAll(".modalClose")
modalClose.forEach(button => {
    button.addEventListener("click",()=>{
        modal.closeModal()
    })
})

const modalAddPhoto = document.getElementById("modalAddPhoto")
modalAddPhoto.addEventListener("click",()=>{
    modal.openAddPhoto()
})

const modalBack = document.getElementById("modalBack")
modalBack.addEventListener("click",()=>{
    modal.openModal()
})

const modalButtonValider = document.getElementById("modalButtonValider")
modalButtonValider.addEventListener("click",async (event)=>{
    event.preventDefault()
    await work.addWork()
})

const modalImgSuppr = document.querySelectorAll(".modalImgSuppr")
modalImgSuppr.forEach(button => button.addEventListener("click", async (event)=>{
    event.preventDefault()
    await work.deleteWork(button.id)
}))

//INITIALISATION
gallery.renderGallery(works);
createFilter();
isLogged()