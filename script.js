const formularioCrearTarea = document.getElementById("crear-tarea")
const inputNuevaTarea = document.getElementById("nombre-nueva-tarea")
const contenedorTareasPendientes = document.getElementById("tareas-pendientes")
const contadorPendientes = document.getElementById("numero-tareas-pendientes")
const plantillaTarea = document.getElementById("plantilla-tarea")
const tiempoRestante = document.getElementById("tiempo-restante")
const botonEmpezar_pausarPomodoro = document.getElementById("empezar-pausar")
const botonSaltar = document.getElementById("boton-saltar")

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

let temporizador = {
    etapa: "trabajo",
    activo: false, 
    momentoActivacion: new Date().getTime(),
    tiempoRestante: 1500000 //25 minutos
}

let idIntervalo
botonEmpezar_pausarPomodoro.addEventListener("click", e => {
    temporizador.activo = !temporizador.activo
    temporizador.momentoActivacion = new Date().getTime()
    if (temporizador.activo) {
        idIntervalo = setInterval(actualizarTemporizador, 1000)
        botonEmpezar_pausarPomodoro.innerText = "Pausar"         
    }
    else {
        clearInterval(idIntervalo)
        botonEmpezar_pausarPomodoro.innerText = "Empezar"
    }
})

botonSaltar.addEventListener("click", saltarPomodoro)

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

function actualizarTemporizador() {
    const UN_SEGUNDO = 1000
    if (temporizador.tiempoRestante > UN_SEGUNDO) {
        temporizador.tiempoRestante -= 1000
    }
    else {saltarPomodoro()}

    tiempoRestante.innerText = String(new Date(temporizador.tiempoRestante).getMinutes()) + ":" + new Date(temporizador.tiempoRestante).getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})
}

function saltarPomodoro() {
    temporizador.activo = false
    clearInterval(idIntervalo)
    botonEmpezar_pausarPomodoro.innerText = "Empezar"

    if (temporizador.etapa == "break") {
        temporizador.etapa = "trabajo"
        temporizador.tiempoRestante = 1500000
    }
    else {
        temporizador.etapa = "break"
        temporizador.tiempoRestante = 300000
    }
    tiempoRestante.innerText = String(new Date(temporizador.tiempoRestante).getMinutes()) + ":" + new Date(temporizador.tiempoRestante).getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})
}