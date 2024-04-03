import * as modalJS from "./modal.js";
import * as galleryJS from "./gallery.js";

//requete fetch pour recupérer les travaux de l'API, les transformer en objet json et retourner le tableau
export async function getWorks(){
    let reponse = await fetch("http://localhost:5678/api/works");
    let works = await reponse.json();
    return works;
}

// param workId : l'id d'une photo
// requete fetch pour supprimer une photo à partir de son id 
export async function deleteWork(workId){
    try{
        //requete fetch en delete sur /works/id
        //Authorization: `Bearer ${window.localStorage.getItem("token")}` : on recupère le token dans le local storage pour générer une autorisation
        await fetch(`http://localhost:5678/api/works/${workId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
        console.log("l'image a bien été suppprimée")
    }catch (error){
        console.log(error)
    }
}

//requete fetch pour ajouter une photo
export async function addWork(){
    //on recupère l'element DOM où afficher le message d'erreur et on le vide
    const modalFormError = document.getElementById("modalFormError")
    modalFormError.innerHTML = ""
    
    try{
        //on recupère les valeurs des inputs du formulaire
        let img = document.getElementById("photo").files[0]
        let title = document.getElementById("titre").value 
        let category = document.getElementById("categorie").value

        //on verifie que la taille de l'image soit <4Mo, sinon on throw une erreur
        if(img.size > 4000000){
            throw new Error("L'image est trop volumineuse (4Mo max)")
        }

        //on créer un element "formData" a partir des valeurs des inputs
        let formData = new FormData()
        formData.append("image",img)
        formData.append("title",title)
        formData.append("category",category)

        //on créer une requete fetch en POST avec le token bearer et l'objet formData sur /works
        const reponse = await fetch("http://localhost:5678/api/works/",{
            method: "POST",
            headers: { 
                Authorization: `Bearer ${window.localStorage.getItem("token")}`, 
            },
            body: formData,
        })
        
        //si requete renvoi un status 201, on affiche "Le projet a bien été enregistré" et on change la class css pour afficher le text en vert
        if(reponse.status===201){
            modalFormError.innerText ="Le projet a bien été enregistré"
            modalFormError.classList.remove("modalFormError")
            modalFormError.classList.add("modalFormValid")
            
            //Création d'un objet a retourner pour mettre a jour l'affichage
            let newWork = await reponse.json()

            //ajout du visuel de la nouvelle photo
            galleryJS.addGalleryElement(newWork);
            galleryJS.createGalleryEditElement(newWork);
            //on reset le formulaire, efface la preview
            document.getElementById("modalForm").reset();
            modalJS.erasePreview()
            //appel de formIsOk() pour disabled le bouton de validation
            modalJS.formIsOk()
        }

    }catch (error){
        //si une erreur est "attrapé", on s'assure que la class css affiche bien le message en rouge
        modalFormError.classList.add("modalFormError")
        modalFormError.classList.remove("modalFormValid")
        //on affiche le message d'erreur dans la div modalFormError
        modalFormError.innerText = "Erreur : "+error.message;
    }
}

