const reponse = await fetch('http://localhost:5678/api/works');
let works = await reponse.json();

//fonction asynchrone pour récupérer tous les travaux
async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

//Créer la gallerie a partir de l'API 
function createGallery(idFiltre){  
    //on recupère dans le DOM la div avec la class "gallery"
    const gallery = document.querySelector(".gallery");
    //on vide la galerie
    gallery.innerHTML = "";
    //on parcour les travaux de l'API, pour chaque travail :
    for(let i=0; i<works.length; i++){
        //si idFiltre == "tous" on affiche tous les travaux
        if(idFiltre=="tous"){
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
            //si id != "tous" on affiche que les travaux avec le bon "id"
        }else if(idFiltre==works[i].category.id){
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
}

function createFilter(){
    //on récupère tous les boutons de la div "filtres"
    const filtres = document.querySelectorAll("#filtres button")
    //on parcours tous les boutons
    filtres.forEach(element => {
        console.log(element)
        //on créer un evenement au clic
        element.addEventListener("click", ()=>{
            //on recréer la galerie avec l'id de la catégorie a filtrer (tous, 1, 2, 3)
            createGallery(element.id)
            //on reparcourt tous les boutons pour retirer la classe "inUse"
            filtres.forEach(classe => {
                classe.classList.remove("inUse")
            })
            //on ajoute la classe inUse au filtre "actuel"
            element.classList.toggle("inUse")
        })
    });
    console.log(filtres)
}

createGallery("tous");
createFilter();