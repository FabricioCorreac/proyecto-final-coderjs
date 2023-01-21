function pedirEnteroPositivo() {
    let num = Number(prompt('Ingrese un entero mayor a 0'))
    while (!Number.isInteger(num) || num == 0) {
        num = Number(prompt('Entrada inválida. Debe ingresar un entero mayor a 0'))
    }
    return num
}

function mcd(a, b) { //Calculamos el máximo comun divisor usando el algoritmo de Euclides.
    if (b == 0) return a
    else return mcd(b, a % b)
}

let num1 = pedirEnteroPositivo()
let num2 = pedirEnteroPositivo()
alert("El mínimo común divisor entre " + num1 + " y " + num2  + " es: " + mcd(num1,num2))

const formularioCrearTarea = document.getElementById("crear-tarea")
const inputNuevaTarea = document.getElementById("nombre-nueva-tarea")
const contenedorTareasPendientes = document.getElementById("tareas-pendientes")
const contadorPendientes = document.getElementById("numero-tareas-pendientes")
const tareas = []

class Tarea {
    constructor (nombre) {
        this.nombre = nombre
    }
}

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
    contenedorTareasPendientes.innerHTML = ""
    contadorPendientes.innerText = "Número de tareas pendientes: " + tareas.length
    tareas.reverse().forEach((elemento, indice) => { //Usamos reverse para que las tareas más nuevas aparezcan más arriba
        const tarea = document.createElement("div")
        tarea.classList.add("tarea")
        tarea.dataset["indice"] = indice

        const nombreTarea = document.createElement("p")
        nombreTarea.classList.add("nombre-tarea")
        nombreTarea.innerText = elemento.nombre
        tarea.appendChild(nombreTarea)

        const boton = document.createElement("button")
        boton.addEventListener("click", function(e) {  //En este caso no usamos => ya que usar this nos retornaría el objeto window y no el botón
            tareas.splice(this.parentElement.dataset.indice, 1)
            actualizarTareas()
        })

        const tick = document.createElement("img")
        tick.classList.add("tick")
        tick.src = "./tick.svg"
        boton.appendChild(tick)
        
        tarea.appendChild(boton)

        contenedorTareasPendientes.appendChild(tarea)})
}