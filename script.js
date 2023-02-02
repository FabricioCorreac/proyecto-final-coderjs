const formularioCrearTarea = document.getElementById("crear-tarea")
const inputNuevaTarea = document.getElementById("nombre-nueva-tarea")
const contenedorTareasPendientes = document.getElementById("tareas-pendientes")
const contadorPendientes = document.getElementById("numero-tareas-pendientes")
const plantillaTarea = document.getElementById("plantilla-tarea")

const tareas = JSON.parse(localStorage.getItem("tareas")) || []

class Tarea {
    constructor (nombre) {
        this.nombre = nombre
        this.completada = false
    }
}

actualizarTareas()

formularioCrearTarea.addEventListener("submit", event => {
    event.preventDefault()
    agregarTarea(inputNuevaTarea.value)
    inputNuevaTarea.value = ""
})

function agregarTarea(nombre) {
    tareas.push(new Tarea(nombre))
    actualizarTareas()
    
}

function actualizarTareas() {
    guardarTareas()
    contenedorTareasPendientes.innerHTML = ""
    contadorPendientes.innerText = "Número de tareas pendientes: " + tareas.length

    tareas.forEach((elemento, indice) => {
        const tarea = plantillaTarea.content.firstElementChild.cloneNode(true)
        tarea.dataset["indice"] = indice
        
        const nombreTarea = tarea.querySelector(".nombre-tarea")
        nombreTarea.innerText = elemento.nombre
        
        const boton = tarea.querySelector("button")
        boton.addEventListener("click", (e) => {
            tareas.splice(tarea.dataset["indice"], 1)
            actualizarTareas()

        })

        contenedorTareasPendientes.prepend(tarea)
    })
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}
