const buttonTareaAgregar = document.querySelector("#buttonTarea");
const formularioTarea = document.querySelector("#formulario-tarea");
const listadoTareas = document.querySelector("#tareas");
const inputTarea = document.querySelector("#input-tarea");
const fecha = document.querySelector("#fecha");
let tareas = [];
eventListeners();

function eventListeners() {
    formularioTarea.addEventListener("submit", agregarTarea);

    document.addEventListener("DOMContentLoaded", () => { // cada vez que cargue nuestro DOM osea html
        tareas = JSON.parse(localStorage.getItem("tareas")) || []; // recuperamos las tareas del localstorage
        crearHTML();
    });

    fechaActual();

}

function fechaActual() {
    const fechaEtiqueta = document.createElement("h3");
    const fechaActual = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'})
    fechaEtiqueta.textContent = fechaActual;
    fecha.appendChild(fechaEtiqueta);
}

function agregarTarea(e) { // le pasamos el evento
    e.preventDefault() // va a prevenir el evento por default
    const tarea = document.querySelector("#input-tarea").value;

    if (tarea === "") {
        alertaError("Este campo es obligatorio");
        return;
    }

    const tareaObj = {
        id: Date.now(), // devuelve los milisegundos que ha transcurrido desde 1970, lo usamos como id por que es muy complicado que se repita
        tarea // le pasamos la tarea
    }
    // console.log(tareaObj);

    // aniadimos este objeto a nuestro array tareas
    tareas = [...tareas, tareaObj]; // tomamos una copia de nuestro arreglo y lo agregamos a nuestro objeto actual
    console.log(tareas);

    crearHTML();

    inputTarea.value = '';

}


function alertaError(error) {
    const tareaElemento = document.createElement("li");
    tareaElemento.classList.add("error");
    tareaElemento.textContent = error;
    listadoTareas.appendChild(tareaElemento);
    setTimeout(() => {
        tareaElemento.remove();
    }, 3000);

}

function crearHTML() {
    limpiarHTML();
    if (tareas.length > 0) { // si nuestras tareas son mayor a cero
        tareas.forEach(tarea => { // recorremos el arreglo

            // creamos el boton tarea
            const btnEliminar = document.createElement('span');
            btnEliminar.classList.add('borrar-tarea');
            btnEliminar.textContent = 'X';

            // añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTarea(tarea.id); // creamos una funcion borrarTarea a la cual le pasamos como parametro el id
            }

            const liTarea = document.createElement("li");
            liTarea.classList.add("tarea");
            liTarea.textContent = tarea.tarea; // le añadimos el texto
            liTarea.appendChild(btnEliminar);
            listadoTareas.appendChild(liTarea);


        });
    } else {
        sinTareas("No tienes tareas pendientes");
    }

    sincronizarStorage();
}

function sinTareas(mensaje) {

    const parrafoSinTareas = document.createElement("p");
    parrafoSinTareas.textContent = mensaje;
    parrafoSinTareas.classList.add("sin-tareas");
    listadoTareas.appendChild(parrafoSinTareas);
}

function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    console.log(tareas)

    crearHTML()
}

function btnResetear() {
    tareas = [];
    console.log(tareas)
    crearHTML()
}

function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function limpiarHTML() {
    // mientras listado tareas tenga hijos
    while (listadoTareas.firstChild) {
        // va a eliminar el primer hijo de listado tareas
        listadoTareas.removeChild(listadoTareas.firstChild);
    }
}