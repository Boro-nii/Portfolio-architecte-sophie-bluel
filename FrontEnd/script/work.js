export async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    return works;
}

export async function deleteWork(workId){
    let verif = window.confirm("Voulez vous vraiment supprimer cet article ?")
    if(verif){
        const reponse = await fetch(`http://localhost:5678/api/works/${workId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
        console.log(reponse)
        setTimeout(()=>{
            console.log("fin du timer")
        },5000)
    }
    
}

export async function addWork(){

    let img = document.getElementById("photo").files[0]
    let title = document.getElementById("titre").value 
    let category = document.getElementById("categorie").value

    console.log(img)
    console.log(title)
    console.log(category)

    let formData = new FormData()
    formData.append("image",img)
    formData.append("title",title)
    formData.append("category",category)

    const reponse = await fetch("http://localhost:5678/api/works/",{
        method: "POST",
        headers: { 
            Authorization: `Bearer ${window.localStorage.getItem("token")}`, 
        },
        body: formData
    })   
    console.log(reponse)
}

export function formIsOk(){
    let img = document.getElementById("photo").files[0]
    let title = document.getElementById("titre").value 
    console.log("image :")
    console.log(img)
}