//creation de la galerie à partir d'un tableau "works" 
export function renderGallery(works){
    //on recupère la galerie dans le DOM
    let gallery = document.querySelector(".gallery");
    //on vide la galerie
    gallery.innerHTML = "";

    //pour chaque element du tableau :
    works.forEach(work => {
        //on créer les elements DOM
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
    });
}

//fonction filtre
//prend un tableau et un id en parametre

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

//fonction pour ajouter un element dans la gallerie

export function addGalleryElement(id, url, title){

    //AJOUT DE L'IMAGE DANS LA GALERIE
    //on créer les elements DOM
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    //on parametre l'img
    img.src = url;
    img.alt = title;
    figure.setAttribute("data-id", id);
    figcaption.innerText = title;
    //on assemble les elements DOM et on injecte la figure dans la galerie
    figure.appendChild(img);
    figure.appendChild(figcaption);

    let gallery = document.querySelector(".gallery");
    gallery.appendChild(figure);

    //AJOUT DE L'IMAGE DANS LA GALERIE D'EDITION
    let modalWorks = document.getElementById("modalWorks")
    let article = 
    `<article data-id="${id}">
        <img class="modalImg" src="${url}" alt="${title}">
        <button class="modalImgSuppr" id="${id}"><i class="fa-solid fa-trash-can"></i></button>
    </article>`;
    modalWorks.innerHTML += article
    // //return l'element DOM avec l'id de la photo créer (bouton de suppression)
    // return document.getElementById(id)
}



//pour chaque "work" de "workS"
    //on verifie que idFiltre "est defini"
        //si oui : on compare idFiltre et work.categoryId
        //sinon : on rajoute le travail a result

//work => idFiltre ? work.categoryId == idFiltre: true