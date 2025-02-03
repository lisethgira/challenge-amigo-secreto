let amigos = []; // Lista de amigos
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");
const alerta = document.createElement("div"); // Contenedor de alertas
alerta.classList.add("alerta");
document.body.appendChild(alerta);

// Función para agregar amigos
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        mostrarAlerta("⚠️ Por favor, inserte un nombre.", "error");
        return;
    }

    if (amigos.includes(nombre)) {
        mostrarAlerta("⚠️ Ese nombre ya está en la lista.", "error");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = ""; // Limpiar el campo de texto
    mostrarAlerta("✅ Nombre agregado correctamente.", "success");
}

// Función para actualizar la lista en el HTML
function actualizarLista() {
    listaAmigos.innerHTML = "";

    amigos.forEach((nombre, index) => {
        const li = document.createElement("li");
        li.classList.add("nombre-item");

        const spanNombre = document.createElement("span");
        spanNombre.textContent = nombre;

        const botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "🗑️"; // Ícono de basura
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.setAttribute("data-index", index);
        botonEliminar.addEventListener("click", eliminarAmigo);

        li.appendChild(spanNombre);
        li.appendChild(botonEliminar);
        listaAmigos.appendChild(li);
    });
}

// Función para eliminar un amigo
function eliminarAmigo(event) {
    const index = event.target.getAttribute("data-index");
    const eliminado = amigos.splice(index, 1); // Elimina el nombre del array
    actualizarLista();
    mostrarAlerta(`🗑️ "${eliminado}" ha sido eliminado.`, "info");
}

// Función para sortear un amigo al azar
function sortearAmigo() {
    if (amigos.length === 0) {
        mostrarAlerta("⚠️ No hay nombres en la lista para sortear.", "error");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    resultado.innerHTML = `🎉 ¡El amigo secreto es: <strong>${amigoSecreto}</strong>! 🎁`;
    mostrarAlerta(`🎉 ¡Sorteo realizado! El amigo secreto es "${amigoSecreto}".`, "success");
}

// Función para mostrar alertas bonitas en HTML
function mostrarAlerta(mensaje, tipo) {
    alerta.textContent = mensaje;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}
