// Fetch que obtiene la información del producto seleccionado
fetch("https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("p-id") + ".json")
.then(response => {
if (response.ok) {
    return response.json();}
})
.then(json => showProductData(json))

// Fetch que consigue los comentarios del producto
fetch("https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("p-id") + ".json")
.then(response => {
if (response.ok) {
    return response.json();}
})
.then(json => showProductComments(json))


// Función que se encarga de mostrar en pantalla la información del producto obtenida.
function showProductData(data){
    let imgs = "";

    document.getElementById("nombreProducto").innerText = data.name;
    document.getElementById("costoProducto").innerText = data.currency + " " + data.cost;
    document.getElementById("descripcionProducto").innerText = data.description;
    document.getElementById("categoriaProducto").innerText = data.category;
    document.getElementById("ventasProducto").innerText = data.soldCount;

    for(let i = 0; i < data.images.length; i++){

        if (i === 0) {
            imgs += `
            <div class="carousel-item active">
                <img src="${data.images[i]}" class="d-block w-100" alt="product-img">
            </div>`;
        }

        imgs += `
        <div class="carousel-item">
            <img src="${data.images[i]}" class="d-block w-100" alt="product-img">
        </div>`;

    };

    document.getElementById("carousel-inner").innerHTML += imgs;

    relatedProducts(data.relatedProducts, localStorage.getItem("p-id"));
    
}

// Función que se encarga de mostrar los comentarios en pantalla
function showProductComments(comments){
    if(comments.length === 0){

        document.getElementById("listaComentarios").innerHTML = `<p class="text-muted"> Oops! No hay comentarios para mostrar...</p>`;

    }else{

        let ratingStars = "";

        for (let i = 0; i < comments.length; i++) {
            
            if(comments[i].score > 0) {

                ratingStars = `<i class="fa fa-star checked"></i>`.repeat(comments[i].score);
                ratingStars += `<i class="far fa-star"></i>`.repeat(5 - comments[i].score);

            }

            document.getElementById("listaComentarios").innerHTML += `
            <div class="list-group-item">
                <p><strong>${comments[i].user}</strong> - <span class="text-muted"">${comments[i].dateTime}</span> - ${ratingStars}</p>
                <p class="m-1">${comments[i].description}</p>
            </div>`;

        };

    };
};


// Evento y Función para comentar los productos.
let btnComment = document.getElementById("btnComment");

btnComment.addEventListener("click", enviarComentario);

function enviarComentario() {

    //Fecha y Hora.
    let today = new Date();
    var now = today.toLocaleString();

    // Comentario y puntuación.
    let puntuacion = document.getElementById("puntuacion").value;
    let comentario = document.getElementById("opinion").value;
    let estrellas = "";

    if(puntuacion > 0) {
        
        estrellas = `<i class="fa fa-star checked"></i>`.repeat(puntuacion);
        estrellas += `<i class="far fa-star"></i>`.repeat(5 - puntuacion);

    }

    document.getElementById("listaComentarios").innerHTML += `
    <div class="list-group-item">
        <p><strong>${localStorage.getItem("userID")}</strong> - <span class="text-muted"">${now}</span> - ${estrellas}</p>
        <p class="m-1">${comentario}</p>
    </div>`;

}

// Función que se encarga de mostrar los productos relacionados en la página.
function relatedProducts(list,id){

    let relatedProducts = "";

    for(let i = 0; i < list.length; i++){

        relatedProducts += `
        <div class="card m-1" style="width: 18rem;" id="${list[i].id}" onclick="storageID(this.id)">
              <img class="card-img-top" src="${list[i].image}" alt="Card image cap">
              <div class="card-body text-center">
                <p class="card-text">${list[i].name}</p>
              </div>
            </div>`;

    };

    document.getElementById("relatedProducts").innerHTML += relatedProducts;

}


