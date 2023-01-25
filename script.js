const formularioCrearTarea = document.getElementById("crear-tarea")
const inputNuevaTarea = document.getElementById("nombre-nueva-tarea")
const contenedorTareasPendientes = document.getElementById("tareas-pendientes")
const contadorPendientes = document.getElementById("numero-tareas-pendientes")

const tareas = JSON.parse(localStorage.getItem("tareas")) || []

class Tarea {
    constructor (nombre) {
        this.nombre = nombre
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
        const tarea = document.createElement("div")
        tarea.classList.add("tarea")
        tarea.dataset["indice"] = indice

        const nombreTarea = document.createElement("p")
        nombreTarea.classList.add("nombre-tarea")
        nombreTarea.innerText = elemento.nombre
        tarea.appendChild(nombreTarea)

        const boton = document.createElement("button")
        boton.addEventListener("click", (e) => {
            tareas.splice(tarea.dataset.indice, 1)
            actualizarTareas()
        })

        const tick = document.createElement("img")
        tick.classList.add("tick")
        tick.src = "./tick.svg"
        boton.appendChild(tick)
        
        tarea.appendChild(boton)

        contenedorTareasPendientes.prepend(tarea)})
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}