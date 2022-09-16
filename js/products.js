let productsObj = {};

// Fetch que se encarga de obtener los datos de los productos.
fetch("https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json")
.then(response => {
if (response.ok) {
    return response.json();}
})
.then(json => showProducts(json))
.then(json => document.getElementById("description").innerText = json.catName);


// Función que se encarga de recorrer los datos y mostrarlos en la página.
function showProducts(object){
    let htmlContentToAppend = "";

    for(let i = 0; i < object.products.length; i++){ 
        let category = object.products[i];     

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" id="`+category.id+`" onclick="storageID(this.id)">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + " - $" + category.cost +`</h4> 
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
    return productsObj = object; 
}


// Función que se encarga de filtrar el contenido según las instrucciones dadas por el usuario.
let maxPriceFilter = document.getElementById("rangeFilterPriceMax");
let minPriceFilter = document.getElementById("rangeFilterPriceMin");

function filtrarContenido() {

    let filteredProducts = [];

    if (maxPriceFilter.value != ""){
        filteredProducts = productsObj.products.filter(product => product.cost < maxPriceFilter.value);
    }
    
    if (minPriceFilter.value != ""){
        filteredProducts = productsObj.products.filter(product => product.cost > minPriceFilter.value);
    }

    
    filteredProducts =  { products : filteredProducts};

    showProducts(filteredProducts);
}


// Evento que lanza la función de filtrado de productos al hacer click en "filtrar".
let btnFilterPrice = document.getElementById("rangeFilterPrice");
btnFilterPrice.addEventListener("click", filtrarContenido);


// Evento que lanza una función de limpieza de filtros cuando se hace click en "limpiar".
let btnClearFilter = document.getElementById("clearPriceFilter");

btnClearFilter.addEventListener("click", e => {
    maxPriceFilter.value = "";
    minPriceFilter.value = "";
    location.reload();
})


// Eventos que detectan cuando se clickea un botón del filtro de orden y ejecutan su correspondiente función.
let btnPriceAsc = document.getElementById("sortByPriceAsc");
let btnPriceDesc = document.getElementById("sortByPriceDesc");
let btnRel = document.getElementById("sortProdByRel");

btnPriceAsc.addEventListener("click", function(a,b){
    let sortProducts =  { products : productsObj.products.sort(priceAsc)};
    showProducts(sortProducts);
});

btnPriceDesc.addEventListener("click", function(a,b){
    let sortProducts =  { products : productsObj.products.sort(priceDesc)};
    showProducts(sortProducts);
})

btnRel.addEventListener("click", function(a,b){
    let sortProducts = { products : productsObj.products.sort(relAsc)};
    showProducts(sortProducts);
})

// Funciones para devolver los productos filtrados por orden de precio ascendente / descendente y relevancia.
function priceAsc(a,b){
    return b.cost - a.cost;
}

function priceDesc(a,b){
    return a.cost - b.cost;
}

function relAsc(a,b){
    return b.soldCount - a.soldCount;
}

///Función que Almacena el ID del producto y redirecciona.
function storageID(id){
    localStorage.setItem("p-id", id);
    location.href="product-info.html";
}