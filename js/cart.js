// Fetch que recibe los datos del producto en el carrito.
fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
.then(response => {
    if (response.ok) {
        return response.json();
    }
})
.then(json => productData(json.articles[0]))

let unitCost;
let currency;
let shippment = 5;

// Función que muestra la información del producto del carrito en la página.
function productData(data){

    let pData = 
    `<td><img class="navbar-toggler-icon" src="${data.image}" alt="car image"></img></td>
    <td>${data.name}</td>
    <td>${data.currency} ${data.unitCost}</td>
    <td><input type="number" name="cantidad" max="99" min="1" value="1" id="cantidad" onchange="totalCost(this.value)"></td>
    <td class="fw-bolder" id="totalCost">${data.currency} ${data.unitCost}</td>`;

   document.querySelector("#cartData").innerHTML = pData;
   unitCost = data.unitCost;
   currency = data.currency;

   return totalCost();

}

// Función que calcula los costos totales del carrito y lo actualiza según la cantidad de elementos seleccionados.
function totalCost(value = 1){

    document.querySelector("#totalCost").innerText = `${currency} ${unitCost * value}`;
    document.querySelector("#finalSubtotal").innerText = `${currency} ${unitCost * value}`;
    document.querySelector("#finalShippingCost").innerText = `${currency} ${(shippment * (unitCost * value)) / 100}`;
    document.querySelector("#finalCost").innerText = `${currency} ${(unitCost * value) + ((shippment * (unitCost * value)) / 100)}`;
}

// Función que actualiza el valor del porcentaje de envío y llama la actualización de los costos finales del carrito.
function shippmentCalc(percentage){
    shippment = percentage;
    totalCost(document.querySelector("#cantidad").value);
}

// Función que habilita/deshabilita los campos de un formulario no seleccionado en el modal.
function enableForm(element) {

    if(element.getAttribute("id") === "creditCard"){
      document.querySelector("#cardMethod").disabled = false;
      document.querySelector("#bankMethod").disabled = true;
    }else{
        document.querySelector("#bankMethod").disabled = false;
        document.querySelector("#cardMethod").disabled = true;
    }
}

// Alerta de éxito al realizar la compra del carrito tras la comprobación del formulario.
function showAlertSuccess() {
    document.querySelector("#alert-success").classList.add("show");
    document.querySelector("#invalid-credit").setAttribute("hidden", "");
}

// Alerta de error al rellenar los datos necesario del método de pago(modal).
function showAlertError() {
    document.querySelector("#invalid-credit").removeAttribute("hidden")
}