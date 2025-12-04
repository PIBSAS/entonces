// CONFIGURA TU USUARIO Y REPO
const usuario = "PIBSAS"; 
const repo = "entonces";

const contenedor = document.querySelector(".html-container");

// =============================
// OBTENER TODOS LOS ARCHIVOS .HTML DEL REPO
// INCLUIDO SUBCARPETAS
// =============================
async function obtenerArchivos(carpeta = "") {
    const url = `https://api.github.com/repos/${usuario}/${repo}/contents/${carpeta}`;
    const res = await fetch(url);
    const data = await res.json();

    let resultados = [];

    for (const item of data) {
        if (item.type === "dir") {
            // Recursivo: entrar a subcarpetas
            const subitems = await obtenerArchivos(item.path);
            resultados = resultados.concat(subitems);
        } else if (item.name.endsWith(".html") && item.name !== "index.html") {
            resultados.push({
                nombre: item.name,
                ruta: item.path
            });
        }
    }

    return resultados;
}

// =============================
// CREAR BOTONES EN EL INDEX
// =============================
function crearBoton(nombre, ruta) {
    const enlace = document.createElement("a");
    enlace.href = ruta;
    enlace.innerText = nombre;
    contenedor.appendChild(enlace);
}

// =============================
// FORMATEAR NOMBRE BONITO
// =============================
function formatearNombre(ruta) {
    // ejemplo: matematicas1/Unidad1/u1cap1.html → "Unidad1 / u1cap1"
    let partes = ruta.split("/");
    partes = partes.slice(1); // quitar el repo si aparece
    if (partes.length > 1) {
        return partes.join(" / ").replace(".html", "");
    }
    return ruta.replace(".html", "");
}

// =============================
// EJECUCIÓN PRINCIPAL
// =============================
async function iniciar() {
    const archivos = await obtenerArchivos("");

    archivos.sort((a, b) => a.ruta.localeCompare(b.ruta));

    archivos.forEach(archivo => {
        crearBoton(
            formatearNombre(archivo.ruta),
            archivo.ruta
        );
    });
}

iniciar();
