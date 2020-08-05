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
            document.querySelector('#name.form-input').style.border = '1px solid red'
            document.querySelector('.name.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        } else if (name.value.length < 3) {
            document.querySelector('#name.form-input').style.border = '1px solid red'
            document.querySelector('.name.invalid-feedback').innerHTML = '<li>Este campo debe tener al menos 3 caracteres</li>'
        } else {
            document.querySelector('.name.invalid-feedback').innerHTML = ""
            document.querySelector('#name.form-input').style.border = '1px solid green'
        }
    });

    price.addEventListener("blur", function(){
        if (price.value == ""){
            document.querySelector('#price.form-input').style.border = '1px solid red'
            document.querySelector('.price.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
            } else {
            document.querySelector('.price.invalid-feedback').innerHTML = ""
            document.querySelector('#price.form-input').style.border = '1px solid green'
            }
    });

    discount.addEventListener("blur", function(){
        if (discount.value == ""){
            document.querySelector('#discount.form-input').style.border = '1px solid red'
            document.querySelector('.discount.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
            } else {
            document.querySelector('.discount.invalid-feedback').innerHTML = ""
            document.querySelector('#discount.form-input').style.border = '1px solid green'
            }
    });

    description.addEventListener("blur", function(){
        if (description.value == ""){
            document.querySelector('#description.form-input').style.border = '1px solid red'
            document.querySelector('.description.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        } else if (description.value.length < 10) {
                document.querySelector('#description.form-input').style.border = '1px solid red'
                document.querySelector('.description.invalid-feedback').innerHTML = '<li>La descripción debe tener al menos 10 caracteres</li>'
        } else {
            document.querySelector('.description.invalid-feedback').innerHTML = ""
            document.querySelector('#description.form-input').style.border = '1px solid green'
            }
    });

    category.addEventListener("blur", function(){
        if (category.value == ""){
            document.querySelector('#category.form-input').style.border = '1px solid red'
            document.querySelector('.category.invalid-feedback').innerHTML = '<li>Debe seleccionar una categoría</li>'
        } else {
            document.querySelector('.category.invalid-feedback').innerHTML = ""
            document.querySelector('#category.form-input').style.border = '1px solid green'
        }
    });

formulario.addEventListener("submit", function(e){

        if(name.value == ""){
            errores.push("El nombre de la tienda debe estar completo")
            document.querySelector('#name.form-input').style.border = '1px solid red'
            document.querySelector('.name.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        }

        if (price.value == ""){
            errores.push("El campo precio debe estar lleno")
            document.querySelector('#price.form-input').style.border = '1px solid red'
            document.querySelector('.price.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        }

        if (discount.value == ""){
            errores.push("El campo descuento debe estar lleno")
            document.querySelector('#discount.form-input').style.border = '1px solid red'
            document.querySelector('.discount.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        }

        if (description.value == ""){
            errores.push("Debe colocar una descripción")
            document.querySelector('#description.form-input').style.border = '1px solid red'
            document.querySelector('.description.invalid-feedback').innerHTML = '<li>Este campo debe estar completo</li>'
        } else if (description.value.length < 10) {
            errores.push("La descripción debe tener al menos 10 caracteres")
            document.querySelector('#description.form-input').style.border = '1px solid red'
            document.querySelector('.description.invalid-feedback').innerHTML = '<li>La descripción debe tener al menos 10 caracteres</li>'
        }

        if (category.value == ""){
            errores.push("Debe seleccionar una categoría")
            document.querySelector('#category.form-input').style.border = '1px solid red'
            document.querySelector('.category.invalid-feedback').innerHTML = '<li>Debe seleccionar una categoría</li>'
        }

        if (!file.value.includes("jpg") && !file.value.includes("jpeg") && !file.value.includes("png") && !file.value.includes("gif")){
            errores.push("La imagen debe tener un formato válido")
            file.style.border = '1px solid red'
            document.querySelector('.file.invalid-feedback').innerHTML = '<li>La imagen debe tener un formato válido</li>'
        }

        if (errores.length > 0){
            e.preventDefault();
            console.log(errores)
            errores = [];
        } else {
            let confirmar = confirm("¿Está seguro de que desea agregar/editar este ítem?")
            if (confirmar != true){
                e.preventDefault();
            }
        }

    });
