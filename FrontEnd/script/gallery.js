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

//pour chaque "work" de "workS"
    //on verifie que idFiltre "est defini"
        //si oui : on compare idFiltre et work.categoryId
        //sinon : on rajoute le travail a result

//work => idFiltre ? work.categoryId == idFiltre: true