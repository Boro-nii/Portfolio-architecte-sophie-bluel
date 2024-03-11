export async function getWorks(){
    let reponse = await fetch("http://localhost:5678/api/works");
    let works = await reponse.json();
    return works;
}

export async function deleteWork(workId){
    try{
        const reponse = await fetch(`http://localhost:5678/api/works/${workId}`,
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

export async function addWork(){
    const modalFormError = document.getElementById("modalFormError")
    modalFormError.innerHTML = ""
    
    try{
        let img = document.getElementById("photo").files[0]
        let title = document.getElementById("titre").value 
        let category = document.getElementById("categorie").value

        if(img.size > 4000000){
            throw new Error("L'image est trop volumineuse (4Mo max)")
        }

        let formData = new FormData()
        formData.append("image",img)
        formData.append("title",title)
        formData.append("category",category)

        const reponse = await fetch("http://localhost:5678/api/works/",{
            method: "POST",
            headers: { 
                Authorization: `Bearer ${window.localStorage.getItem("token")}`, 
            },
            body: formData,
        })

        if(reponse.status===201){
            modalFormError.innerText ="Le projet a bien été enregistré"
            modalFormError.classList.remove("modalFormError")
            modalFormError.classList.add("modalFormValid")
        }

    }catch (error){
        modalFormError.classList.add("modalFormError")
        modalFormError.classList.remove("modalFormValid")

        modalFormError.innerText = "Erreur : "+error.message;
    }
}

