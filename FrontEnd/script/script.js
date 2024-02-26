const reponse = await fetch('http://localhost:5678/api/works');
let works = await reponse.json();

//fonction asynchrone pour récupérer tous les travaux
async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

//Créer la gallerie a partir de l'API 
function createGallery(){  
    //on recupère dans le DOM la div avec la class "gallery"
    const gallery = document.querySelector(".gallery");
    //on vide la galerie
    gallery.innerHTML = "";
    //on parcour les travaux de l'API, pour chaque travail :
    for(let i=0; i<works.length; i++){
        //on créer les elements DOM
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
        //on leur applique les bons attributs
        img.setAttribute("src", works[i].imageUrl);
        img.setAttribute("alt", works[i].title);
        figcaption.innerText = works[i].title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
    

}

createGallery();