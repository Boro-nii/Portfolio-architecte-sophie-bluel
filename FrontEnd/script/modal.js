//on recupère les differentes fenetre modale dans le DOM
const modalBG = document.querySelector(".modalBG")
const modalContentGallery = document.getElementById("modalContentGallery")
const modalContentAddPhoto = document.getElementById("modalContentAddPhoto")

//fonction pour afficher la fenetre modale "galerie photo"
export function openModal(){

    modalBG.style.display = "flex"
    modalContentGallery.style.display = "flex"
    modalContentAddPhoto.style.display = "none"
}

//fonction pour afficher la fenetre modale "ajout photo"
export function openAddPhoto(){

    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "flex"

    //reset du formulaire, "effacement du preview" et effacement du message d'erreur
    document.getElementById("modalForm").reset();
    erasePreview()
    const modalFormError = document.getElementById("modalFormError")
    modalFormError.innerHTML = ""
}

//fonction pour cacher toutes les fenetres modales
export function closeModal(){

    modalBG.style.display = "none"
    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "none"
}


//fonction pour afficher l'image chargé dans le formulaire
export function createPreview(){
    //on recupère l'image chargé dans le formulaire
    let img = document.getElementById("photo").files[0];
    //on recupère les elements DOM du formulaire
    let divInputFile = document.getElementById("divInputFile")      //div englobant l'input file du formulaire
    let divInputFileI = document.getElementById("divInputFileI")    //la balise i qui affiche un symbole
    let cloneInputFile = document.getElementById("cloneInputFile")  //le label qui permet d'acceder a l'input file
    let divInputFileP = document.getElementById("divInputFileP")    //le paragraphe "jpg, png: 4mo max"
    //on cache le symbole et le paragraphe du formulaire
    divInputFileI.style.display="none"
    divInputFileP.style.display="none"
    //on vide le label "cloneInputFile"
    cloneInputFile.innerText=""
    //on créer une image a partir de celle chargé dans l'input file 
    let preview = document.createElement("img")
    preview.src = URL.createObjectURL(img)
    preview.alt = img.name
    //on ajoute l'image dans le label et on change le css du label
    cloneInputFile.appendChild(preview)
    cloneInputFile.classList.remove("labelInputFile")
    divInputFile.style.padding = "0 10px"
}

//fonction pour cacher le preview et réafficher le formulaire de base
export function erasePreview(){
    //on recupère les elements DOM du formulaire
    let divInputFile = document.getElementById("divInputFile")      //div englobant l'input file du formulaire
    let divInputFileI = document.getElementById("divInputFileI")    //la balise i qui affiche un symbole
    let cloneInputFile = document.getElementById("cloneInputFile")  //le label qui permet d'acceder a l'input file
    let divInputFileP = document.getElementById("divInputFileP")    //le paragraphe "jpg, png: 4mo max"
    //on vide le label, on y ajoute un texte et on change son css
    cloneInputFile.innerHTML = ""
    cloneInputFile.innerText = "+ Ajouter photo"
    cloneInputFile.classList.add("labelInputFile")
    //on affiche le symbole et le paragraphe
    divInputFileI.style.display="block"
    divInputFileP.style.display="block"
    //on modifie le css
    divInputFile.style.padding = "10px"
}

//fonction qui verifie que le formulaire est bien rempli
export function formIsOk(){
    //on recupère le dom du bouton de validation
    let modalButtonValider = document.getElementById("modalButtonValider");
    //on recupère les valeurs des inputs du formulaire
    let img = document.getElementById("photo").files[0];
    let title = document.getElementById("titre").value;
    //si img & title sont différent de undefined et ""
    if(img && title){
        //on retire l'attribut disabled
        modalButtonValider.removeAttribute("disabled");
    }else{
        //sinon on s'assure qu'il y est
        modalButtonValider.setAttribute("disabled","")
    }
}