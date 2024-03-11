import * as modal from "./modal.js";
import * as work from "./work.js";
import * as gallery from "./gallery.js"

let works = await work.getWorks()

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

async function modalRefresh(){
    works = await work.getWorks()

    gallery.renderGallery(works);
    modal.createGalleryEdit(works);

    let modalImgSuppr = document.querySelectorAll(".modalImgSuppr");
    modalImgSuppr.forEach(button => button.addEventListener("click", async ()=>{
        await work.deleteWork(button.id);
        modalRefresh()
    }))
}

//GESTION DES BOUTONS :

modal.createGalleryEdit(works);

const showModalEdit = document.getElementById("showModalEdit");
showModalEdit.addEventListener("click",()=>{
    modal.openModal();
})

const modalClose = document.querySelectorAll(".modalClose");
modalClose.forEach(button => {
    button.addEventListener("click",()=>{
        modal.closeModal();
    })
})

const modalAddPhoto = document.getElementById("modalAddPhoto");
modalAddPhoto.addEventListener("click",()=>{
    modal.openAddPhoto();

    document.getElementById("modalForm").reset();
    modal.erasePreview()
    const modalFormError = document.getElementById("modalFormError")
    modalFormError.innerHTML = ""
})

const modalBack = document.getElementById("modalBack");
modalBack.addEventListener("click",()=>{
    modal.openModal();
})

const modalButtonValider = document.getElementById("modalButtonValider");
modalButtonValider.addEventListener("click", async (event)=>{
    event.preventDefault();
    await work.addWork();


    document.getElementById("modalForm").reset();
    modal.erasePreview()
    await modalRefresh()
    modal.formIsOk()
})

const modalImgSuppr = document.querySelectorAll(".modalImgSuppr");
modalImgSuppr.forEach(button => button.addEventListener("click", async (event)=>{
    event.preventDefault();
    await work.deleteWork(button.id);
    await modalRefresh()
}))

const navLogout = document.getElementById("navLogout");
navLogout.addEventListener("click",(event)=>{
    event.preventDefault;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
})

const titre = document.getElementById("titre");
titre.addEventListener("input",()=>{
    modal.formIsOk();
})

const photo = document.getElementById("photo");
photo.addEventListener("change",()=>{
    modal.formIsOk();
    modal.createPreview();
})

const modalStopPropa = document.querySelectorAll(".js-modalStopPropa");
modalStopPropa.forEach( div =>
    div.addEventListener("click",(event)=>{
        event.stopPropagation();
    })
)

const modalBG = document.getElementById("modal");
modalBG.addEventListener("click",(event)=>{
    modal.closeModal();
})



//INITIALISATION
gallery.renderGallery(works);
createFilter();
isLogged()
