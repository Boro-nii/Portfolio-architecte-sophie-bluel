const modalBG = document.querySelector(".modalBG")
const modalContentGallery = document.getElementById("modalContentGallery")
const modalContentAddPhoto = document.getElementById("modalContentAddPhoto")
const modalWorks = document.getElementById("modalWorks")

export function openModal(){

    modalBG.style.display = "flex"
    modalContentGallery.style.display = "flex"
    modalContentAddPhoto.style.display = "none"

    console.log("modal ouverte !")
}

export function openAddPhoto(){

    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "flex"

    console.log("accès à l'ajout de photo !")
}

export function closeModal(){

    modalBG.style.display = "none"
    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "none"

    console.log("modal fermée !")
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