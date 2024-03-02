// console.log("token :"+window.localStorage.getItem("token"))
// console.log("userId :"+window.localStorage.getItem("userId"))

// const reponse = await fetch('http://localhost:5678/api/works');
// console.log(works)

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
}

function isLogged(){
    if(window.localStorage.getItem("token")!==null){
        // Changement bouton login
        let navLogin = document.getElementById("navLogin")
        navLogin.innerText="Logout"
        // Affichage de la marge noire en haut
        let headerEdit = document.createElement("div")
        headerEdit.setAttribute("id","headerEdit")
        headerEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Mode édition'
        document.body.appendChild(headerEdit)
        // On fait disparaitre les filtres
        const divFiltres = document.getElementById("filtres")
        divFiltres.innerHTML=""
        // Ajout listener pour afficher modale edition
        const showModalEdit = document.getElementById("showModalEdit")
        showModalEdit.style.display="inline"
        showModalEdit.addEventListener("click",()=>{
            openModal()
        })
        // Ajout listener pour fermer les modales
        const modalClose = document.querySelectorAll(".modalClose")
        modalClose.forEach(button => {
            button.addEventListener("click", closeModal)
        })
        // Ajout listener pour ouvrir l'ajout de photo
        const modalAddPhoto = document.getElementById("modalAddPhoto")
        modalAddPhoto.addEventListener("click",()=>{
            openAddPhoto()
        })

        const modalBack = document.getElementById("modalBack")
        modalBack.addEventListener("click",()=>{
            openModal()
        })

        const modalButtonValider = document.getElementById("modalButtonValider")
        modalButtonValider.addEventListener("click",(event)=>{
            event.preventDefault()
            addWork()
        })


        const photo = document.getElementById("photo")
        // photo.addEventListener("change",()=>{
        //     const divInputFile = document.getElementById("divInputFile")
        //     // const divPreview = document.getElementById("divPreview")

        //     let preview = document.createElement("img")
        //     let img = photo.files[0]
        //     preview.src = window.URL.createObjectURL(img)
            
        //     divInputFile.innerHTML=""
        //     divInputFile.appendChild(preview)
        //     divInputFile.style.padding="0 10px"
            


        // })

        // const cloneInputFile = document.getElementById("cloneInputFile")
        // const photo = document.getElementById("photo")
        // photo.addEventListener("change",(event)=>{
        //     let preview = document.createElement("img")
        //     let img = photo.files[0]
        //     preview.src = window.URL.createObjectURL(img)
            
        //     let divInputFile = document.getElementById("divInputFile")
        //     divInputFile.display = "none"
            
        //     let divPreview = document.getElementById("divPreview")
        //     divPreview.appendChild(preview)

        //     isFull()
        // })

        // const titre = document.getElementById("titre")
        // titre.addEventListener("change",()=>{
        //     isFull()
        // })
    }
}

function openModal(){
    let modalBG = document.querySelector(".modalBG")
    let modalContentGallery = document.getElementById("modalContentGallery")
    let modalContentAddPhoto = document.getElementById("modalContentAddPhoto")
    modalContentAddPhoto.style.display = "none"
    modalBG.style.display = "flex"
    modalContentGallery.style.display = "flex"
    createGalleryEdit()
}

function openAddPhoto(){
    let modalContentGallery = document.getElementById("modalContentGallery")
    let modalContentAddPhoto = document.getElementById("modalContentAddPhoto")
    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "flex"
}

function closeModal(){
    let modalBG = document.querySelector(".modalBG")
    let modalContentGallery = document.getElementById("modalContentGallery")
    let modalContentAddPhoto = document.getElementById("modalContentAddPhoto")
    modalBG.style.display = "none"
    modalContentGallery.style.display = "none"
    modalContentAddPhoto.style.display = "none"
}



function createGalleryEdit(){
    //on recupère dans le DOM la div avec la class "gallery"
    const modalWorks = document.getElementById("modalWorks");
    //on vide la galerie
    modalWorks.innerHTML = "";
    //on parcour les travaux de l'API, pour chaque travail on créer un article avec l'image du travail et un button
    //on place l'id du travail sur le bouton pour pouvoir appeler la fonction deleteWork plus tard
    for(let i=0; i<works.length; i++){
        let article = 
        `<article>
            <img class="modalImg" src="${works[i].imageUrl}" alt="${works[i].title}">
            <button class="modalImgSuppr" id="${works[i].id}"><i class="fa-solid fa-trash-can"></i></button>
        </article>`
        modalWorks.innerHTML += article
    }
    //on recupère tous les boutons de suppression
    let modalImgSuppr = document.querySelectorAll(".modalImgSuppr")
    //pour chaque bouton on ajoute un listener qui appel la fonction deleteWork avec l'id du travail
    modalImgSuppr.forEach(button => button.addEventListener("click", (event)=>{
        deleteWork(button.id)
    }))
}



//deleteWork(button.id)
//envoyé une requete a l'api pour supprimer le travail qui correspond a l'id en parametre
//puis rappeler l'api pour mettre a jour les travaux toujours existant
async function deleteWork(workId){
    let verif = window.confirm("Voulez vous vraiment supprimer cet article ?")
    if(verif){
        let reponse = await fetch(`http://localhost:5678/api/works/${workId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
        console.log(reponse)
        // if(reponse.status===200){
        //     works = await getWorks()
        //     createGallery("tous")
        //     createGalleryEdit()
        //     console.log("l'article a bien été supprimé")
        // }
    }
    
}



async function addWork(){
    // // let img = ""
    // try{
    //     // img = document.getElementById("photo").files[0]   
    //     // if(img.size>4000000){
    //     //     throw new error("fichier trop volumineux ! 4Mo max")   
    //     // }
    // }catch(e){
    //     img = "null"
    //     console.log("erreur : img = null")
    // }

    let img = document.getElementById("photo").files[0]
    let title = document.getElementById("titre").value 
    let category = document.getElementById("categorie").value

    console.log(img)

    let formData = new FormData()
    formData.append("image",img)
    formData.append("title",title)
    formData.append("category",category)

    let reponse = await fetch("http://localhost:5678/api/works/",{
        method: "POST",
        headers: { 
            Authorization: `Bearer ${window.localStorage.getItem("token")}`, 
        },
        body: formData
    })

    console.log(reponse)
}

function isFull(){
    let title = document.getElementById("titre").value 
    let img = document.getElementById("photo").files[0]
    console.log(img)
    if(title!=="" && img!==undefined){
        console.log("gogogo")
    }else{
        console.log("champ incomplet")
    }
}

let works = await getWorks()
isLogged()
createGallery("tous");
createFilter();




