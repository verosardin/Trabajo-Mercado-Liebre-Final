let name = document.getElementById("name");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let file = document.getElementById("file");
let description = document.getElementById("description");

let formulario = document.getElementById("formulario");

let errores = [];

name.addEventListener("blur", function(){
    if(name.value == ""){
        name.classList.add("is-invalid");
        document.querySelector('.name.invalid-feedback').innerHTML = '<li>Este campo debe estar completo.</li>'
        } else {
        document.querySelector('.name.invalid-feedback').innerHTML = ""
        name.classList.remove("is-invalid");
        }
    });

descripcion.addEventListener("blur", function(){
        if (descripcion.value.length < 15){
            descripcion.classList.add("is-invalid");
            document.querySelector('.descripcion.invalid-feedback').innerHTML = '<li> La descripción debe tener al menos 15 caracteres </li>';
        } else {
            document.querySelector('.descripcion.invalid-feedback').innerHTML = ""
            descripcion.classList.remove("is-invalid");
        }
});
precio.addEventListener("blur", function(){
    if (isNaN(precio.value)){
        precio.classList.add("is-invalid");
        document.querySelector('.precio.invalid-feedback').innerHTML = '<li>El precio debe ser un número</li>';
        } else {
        document.querySelector('.precio.invalid-feedback').innerHTML = ""
        precio.classList.remove("is-invalid");
        }
});
tiendas.addEventListener("blur", function(){
    if (tiendas.value == ""){
        tiendas.classList.add("is-invalid");
        document.querySelector('.tiendas.invalid-feedback').innerHTML = '<li>Debe seleccionar una tienda</li>';
        } else {
        tiendas.classList.remove("is-invalid");
        document.querySelector('.tiendas.invalid-feedback').innerHTML = ""
    }
});

formulario.addEventListener("submit", function(e){

        if (isNaN(codigo.value)){
            codigo.classList.add("is-invalid");
            document.querySelector('.codigo.invalid-feedback').innerHTML = '<li>El código debe ser un número</li>';
            errores.push("El código debe ser un número");
        }

        if(nombre.value == ""){
            errores.push("El campo nombre debe estar completo");
            nombre.classList.add("is-invalid");
            document.querySelector('.nombre.invalid-feedback').innerHTML = '<li>Este campo debe estar completo.</li>'
        } else if (nombre.value.length < 5){
            nombre.classList.add("is-invalid");
            document.querySelector('.nombre.invalid-feedback').innerHTML = '<li> El nombre debe tener al menos 5 caracteres </li>';
            errores.push("El nombre de la tienda debe tener al menos 5 caracteres")
        }

        if (tiendas.value == ""){
            tiendas.classList.add("is-invalid");
            errores.push("Debe seleccionar una tienda");
        }

        if (descripcion.value.length < 15){
            descripcion.classList.add("is-invalid");
            document.querySelector('.descripcion.invalid-feedback').innerHTML = '<li> La descripción debe tener al menos 15 caracteres </li>';
            errores.push("La descripción debe tener al menos 15 caracteres");
        }

        if (org.checked == false && sinTacc.checked == false && sinLactosa.checked == false){
            document.getElementById('filtros').classList.add("is-invalid");
            document.querySelector('.filtros.invalid-feedback').innerHTML = '<li>Debe seleccionar uno o más filtros</li>';
            errores.push("Debe seleccionar uno o más filtros");
        }

        if (isNaN(precio.value)){
            precio.classList.add("is-invalid");
            document.querySelector('.precio.invalid-feedback').innerHTML = '<li>El precio debe ser un número</li>';
            errores.push("El precio debe ser un número")
        }

        if (!file.value.includes("jpg") && !file.value.includes("jpeg") && !file.value.includes("png") && !file.value.includes("gif")){
            file.classList.add("is-invalid");
            document.querySelector('.file.invalid-feedback').innerHTML = '<li>La imagen debe tener un formato válido</li>';
            errores.push("La imagen debe tener un formato válido")
        } else {
            document.querySelector('.file.invalid-feedback').innerHTML = ""
            file.classList.remove("is-invalid");
        }

        if (errores.length > 0){
            e.preventDefault();
            errores = [];
        } else {
            let confirmar = confirm("¿Está seguro de que desea agregar/editar este ítem?")
            if (confirmar != true){
                e.preventDefault();
            }
        }
});