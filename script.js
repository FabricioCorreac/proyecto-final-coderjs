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
    tiempoRestante: 1500, //25 minutos
    minutosRestantes: function () {return String(Math.floor(this.tiempoRestante/60))},
    segundosRestantes: function () {return (this.tiempoRestante%60).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})},

}

let idIntervalo
botonEmpezar_pausarPomodoro.addEventListener("click", e => {
    temporizador.activo = !temporizador.activo
    if (temporizador.activo) {
        idIntervalo = setInterval(actualizarTemporizador, 1000)
        botonEmpezar_pausarPomodoro.innerText = "Pausar"         
    }
    else {
        clearInterval(idIntervalo)
        botonEmpezar_pausarPomodoro.innerText = "Empezar"
    }
})

botonSaltar.addEventListener("click", cambiarEtapa)

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
    if (temporizador.tiempoRestante > 1) {
        temporizador.tiempoRestante -= 1
    }
    else {cambiarEtapa()}

    tiempoRestante.innerText = temporizador.minutosRestantes() + ":" + temporizador.segundosRestantes()
}



function cambiarEtapa() {
    temporizador.activo = false
    clearInterval(idIntervalo)
    botonEmpezar_pausarPomodoro.innerText = "Empezar"

    if (temporizador.etapa == "break") {
        temporizador.etapa = "trabajo"
        temporizador.tiempoRestante = 1500
    }
    else {
        temporizador.etapa = "break"
        temporizador.tiempoRestante = 300
    }
    tiempoRestante.innerText = temporizador.minutosRestantes() + ":" + temporizador.segundosRestantes()
}

function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}