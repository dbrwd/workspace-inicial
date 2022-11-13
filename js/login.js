
// Redirige al usuario a la página principal del E-commerce tras login con Google Oauth.
function redirigir() {
  localStorage.setItem("userID", "user@oauth.com");
  window.location.href="postLoginIndex.html";

}

// Guarda el email del usuario logeado en LocalStorage.
function guardarEmail() {
  localStorage.setItem("userID", document.getElementById("email-login").value);
  localStorage.setItem("userProfilePhoto", "");
}