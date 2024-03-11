export function renderGallery(works){
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    works.forEach(work => {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
        
        img.setAttribute("src", work.imageUrl);
        img.setAttribute("alt", work.title);
        figcaption.innerText = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);    
    });
}

//pour chaque "work" de "workS"
    //on verifie que idFiltre "est defini"
        //si oui : on compare idFiltre et work.categoryId
        //sinon : on rajoute le travail a result
export function filterWorks(idFiltre, works){
    let result = works.filter(
        work => idFiltre ? work.categoryId == idFiltre: true
    )
    renderGallery(result)
}

