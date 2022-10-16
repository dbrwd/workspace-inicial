// Fetch que recibe los datos del producto en el carrito.
fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
.then(response => {
if (response.ok) {
    return response.json();}
})
.then(json => productData(json.articles[0]))

let unitCost;
let currency;

// Función que muestra la información del producto del carrito en la página.
function productData(data){

    let pData = 
    `<td><img class="navbar-toggler-icon" src="${data.image}" alt="car image"></img></td>
    <td>${data.name}</td>
    <td>${data.currency} ${data.unitCost}</td>
    <td><input type="number" name="cantidad" max="99" min="1" value="1" id="cantidad" onchange="totalCost(this.value)"></td>
    <td class="fw-bolder" id="totalCost">${data.currency} ${data.unitCost}</td>`;

   document.querySelector("#cartData").innerHTML = pData;

   return unitCost = data.unitCost, currency = data.currency;

}

// Función que calcula el subtotal del carrito y lo actualiza según la cantidad de elementos seleccionados.
function totalCost(value){
    document.querySelector("#totalCost").innerText = currency + " " + unitCost * value;
}
