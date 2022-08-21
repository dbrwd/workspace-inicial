
// Evento que llama la función de validación de campos cuando detecta que se presiona el botón "Ingresar".
document.getElementById("login-Btn").addEventListener("click", function() {
    validarIngreso();
});
 

// Función que verifica los campos para redirigir al inicio, o mostrar un error en pantalla en caso que estén vacíos.
function validarIngreso() {
    if (document.getElementById("email-login").value != "" && document.getElementById("passwd-login").value != "") {
        redirigir();
    }
    else {
        document.querySelector("#error-empty").innerText = "Rellene los campos vacíos";
        document.querySelector("#error-empty").style.color ="rgb(255,0,0)";
    }
}

// Función que redirige al usuario a la página principal del E-commerce.
function redirigir() {
    window.location.href="postLoginIndex.html";
}