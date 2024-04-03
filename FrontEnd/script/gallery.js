import * as workJs from "./work.js";

//galerie principale
const gallery = document.querySelector(".gallery");
//galerie d'édition
const modalWorks = document.getElementById("modalWorks");

//creation des galeries à partir d'un tableau de travaux
export function renderGallery(works){
    //on vide la galerie principale et la galerie d'édition
    gallery.innerHTML = "";
    modalWorks.innerHTML = "";

    //pour chaque element du tableau :
    works.forEach(work => {
        //ajout d'un element dans la galerie "principale"
        addGalleryElement(work);
        //ajout d'un element dans la galerie "d'édition"
        createGalleryEditElement(work)
    });    
}

//Créer les elements DOM, les initie puis les injecte dans la galerie PRINCIPALE
export function addGalleryElement(work){
    //on créer les elements
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    //on parametre l'img
    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);
    figure.setAttribute("data-id", work.id);
    figcaption.innerText = work.title;
    //on assemble les elements DOM et on injecte la figure dans la galerie
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);    
}

//Créer les elements DOM, les initie puis les injecte dans la galerie d'EDITION
export function createGalleryEditElement(work){
    //on créer les elements
    let article = document.createElement("article")
    let image = document.createElement("img")
    let button = document.createElement("button")
    let icon = document.createElement("i")  
    //on parametre les elements
    article.setAttribute("data-id", work.id)
    image.classList.add("modalImg")
    image.src = work.imageUrl
    image.alt = work.title
    button.classList.add("modalImgSuppr")
    icon.classList.add("fa-solid")
    icon.classList.add("fa-trash-can")
    //on ajoute un listener sur le bouton pour supprimer l'element
    button.addEventListener("click", async ()=>{
        //suppression d'une photo a partir de son id
        await workJs.deleteWork(work.id);
        //mis a jour de l'affichage
        deleteGalleryElement(work.id);
    })
    //on assemble les elements DOM et on l'injecte dans modalWork
    button.appendChild(icon)
    article.appendChild(image)
    article.appendChild(button)
    modalWorks.appendChild(article)
}

//fonction filtre
//prend un tableau de travaux et un id en parametre
export function filterWorks(idFiltre, works){
    //si un id est fourni, on filtre le tableau pour ne conserver que les elements qui ont le meme id
    if(idFiltre){
        let result = works.filter(
            work => work.categoryId == idFiltre
        )
        renderGallery(result)
    }
    //sinon on render le tableau initial
    else{
        renderGallery(works)
    }  
}

//fonction pour supprimer un element de la galerie a partir d'un id
export function deleteGalleryElement(id){
    let target = document.querySelectorAll(`*[data-id="${id}"]`);
    //.filter(el => typeof el == "object" )
    target.forEach(el => el.remove());
}