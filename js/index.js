document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    usuarioEnPantalla();
});

//función que muestra el nombre de usuario en la barra de navegación.
function usuarioEnPantalla() {
    let userId = localStorage.getItem("userID");
    document.getElementById("user-id").innerText = userId;
}