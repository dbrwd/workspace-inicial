// Carga el email y los datos del perfil (Si los hay) de usuario en su respectivo campo al cargar el DOM.
document.addEventListener('DOMContentLoaded', e => {
  userEmail.value = localStorage.getItem('userID')
  userName.value = localStorage.getItem('userName')
  userSName.value = localStorage.getItem('userSecondName')
  userLastname.value = localStorage.getItem('userLastname')
  userSLastname.value = localStorage.getItem('userSecondLastname')
  userTel.value = localStorage.getItem('userTel')
  profileCheck()
})

//VARIABLES/////////////////////////////////////////////////////

let userName = document.querySelector('#first-name');
let userLastname = document.querySelector('#first-lastname');
let userEmail = document.querySelector('#email');
let userSName = document.querySelector('#second-name');
let userSLastname = document.querySelector('#second-lastname');
let userTel = document.querySelector('#contact-tel');
let userPhotoInput = document.querySelector('#profile-photo');
let userIMG = document.querySelector('#profile-img');

///////////////////////////////////////////////////////////////

// Almacena los datos ingresados del perfil.
function almacenarDatosPerfil() {
  localStorage.setItem('userName', userName.value);
  localStorage.setItem('userLastname', userLastname.value);
  localStorage.setItem('userID', userEmail.value);
  localStorage.setItem('userSecondName', userSName.value);
  localStorage.setItem('userSecondLastname', userSLastname.value);
  localStorage.setItem('userTel', userTel.value);
}

// Realiza un checkeo de imágen de perfil en el localstorage para saber si utiliza una predeterminada o no.
function profileCheck() {
  if (localStorage.getItem('userProfilePhoto') == "") {
    userIMG.setAttribute('src', 'img/img_perfil.png')
  }else{
    userIMG.setAttribute('src', localStorage.getItem('userProfilePhoto'))
  }
}

// Detecta cuando se sube una imagen y genera una url de acceso para guardar en localstorage.
userPhotoInput.addEventListener("change", (e)=>{
  let file = document.querySelector('#profile-photo').files[0];
  let reader  = new FileReader();

  reader.onload = function(e)  {
    let imgToUse = e.target.result;
    localStorage.setItem('userProfilePhoto', imgToUse);
  }
  reader.readAsDataURL(file);
})
