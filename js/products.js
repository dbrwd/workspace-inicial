var categoriesArray = [];

// Fetch que se encarga a de obtener los datos de los productos.
fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => {
    if (response.ok) {
        return response.json();}
    })
    .then(json => showProducts(json));

// Función que se encarga de recorrer los datos y mostrarlos en la página.
function showProducts(object){
    let htmlContentToAppend = "";
    

    for(let i = 0; i < object.products.length; i++){ 
        let category = object.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
    }
    document.getElementById("description").innerText = object.catName;
}