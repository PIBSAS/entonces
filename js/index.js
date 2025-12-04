// CONFIGURA TU USUARIO Y REPO
const usuario = "PIBSAS"; 
const repo = "entonces";

// Contenedor donde se mostrarán los HTML
const contenedorHTML = document.querySelector(".html-container");

fetch(`https://api.github.com/repos/${usuario}/${repo}/contents/`)
    .then(response => response.json())
    .then(data => {

        let archivosHTML = [];

        data.forEach(file => {
            if (file.name.endsWith(".html") && file.name !== "index.html") {
                archivosHTML.push({
                    nombre: file.name.replace(".html", ""),
                    url: file.path   // OJO: usamos path, no download_url
                });
            }
        });

        // Orden alfabético (podemos usar otro orden si querés)
        archivosHTML.sort((a, b) => a.nombre.localeCompare(b.nombre));

        // Crear botones
        archivosHTML.forEach(archivo => {
            let boton = document.createElement("a");
            boton.href = archivo.url;   // ruta relativa en GitHub Pages
            boton.className = "boton";
            boton.innerHTML = `<i class="fas fa-file"></i> ${archivo.nombre}`;
            contenedorHTML.appendChild(boton);
        });

        if (archivosHTML.length === 0) {
            contenedorHTML.innerHTML = "<p>No hay archivos HTML subidos.</p>";
        }

    })
    .catch(error => {
        console.error("Error al cargar HTML:", error);
        contenedorHTML.innerHTML = "<p>Error al cargar.</p>";
    });
