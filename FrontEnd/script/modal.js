const modalBG = document.querySelector(".modalBG")
const modalContentGallery = document.getElementById("modalContentGallery")
const modalContentAddPhoto = document.getElementById("modalContentAddPhoto")
const modalWorks = document.getElementById("modalWorks")

export function openModal(){

    modalBG.style.display = "flex"
    modalContentGallery.style.display = "flex"
    modalContentAddPhoto.style.display = "none"
}

export function openAddPhoto(){

    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "flex"
}

export function closeModal(){

    modalBG.style.display = "none"
    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "none"
}

export function createGalleryEdit(works){
    //on vide la galerie de la modale
    modalWorks.innerHTML = "";
    //on parcour les travaux de "works", pour chaque travail on créer un article avec l'image du travail et un button
    //on place l'id du travail sur le bouton pour pouvoir appeler la fonction deleteWork plus tard
    works.forEach(function(work){
        let article = 
        `<article>
            <img class="modalImg" src="${work.imageUrl}" alt="${work.title}">
            <button class="modalImgSuppr" id="${work.id}"><i class="fa-solid fa-trash-can"></i></button>
        </article>`
        modalWorks.innerHTML += article
    })
}

export function createPreview(){
    let img = document.getElementById("photo").files[0];

    let divInputFile = document.getElementById("divInputFile")
    let divInputFileI = document.getElementById("divInputFileI")
    let cloneInputFile = document.getElementById("cloneInputFile")
    let divInputFileP = document.getElementById("divInputFileP")

    divInputFileI.style.display="none"
    divInputFileP.style.display="none"

    cloneInputFile.innerText=""

    let preview = document.createElement("img")
    preview.src = URL.createObjectURL(img)
    preview.alt = img.name

    cloneInputFile.appendChild(preview)
    cloneInputFile.classList.remove("labelInputFile")

    divInputFile.style.padding = "0 10px"
}

export function erasePreview(){
    let divInputFile = document.getElementById("divInputFile")

    let divInputFileI = document.getElementById("divInputFileI")
    let cloneInputFile = document.getElementById("cloneInputFile")
    let divInputFileP = document.getElementById("divInputFileP")

    cloneInputFile.innerHTML = ""
    cloneInputFile.innerText = "+ Ajouter photo"
    cloneInputFile.classList.add("labelInputFile")
    
    divInputFileI.style.display="block"
    divInputFileP.style.display="block"

    divInputFile.style.padding = "10px"

}

export function formIsOk(){
    let modalButtonValider = document.getElementById("modalButtonValider");
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