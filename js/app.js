document.addEventListener("DOMContentLoaded", () => {
const previewBtn = document.querySelector("#previewBtn"); // Botón Generar Vista Previa
const contrastBtn = document.querySelector("#contrastBtn"); // Botón Contrastar Encabezados
const markdownInput = document.querySelector("#editor"); // Editor Markdown
const previewSection = document.querySelector("#preview"); // Sección de Vista Previa
const charCount = document.querySelector("#charCount"); // Contador de caracteres
let isContrastApplied = false; // Estado del contraste

const editorPlaceholder = "Escribí tu código Markdown aquí...";
const previewPlaceholder = "Vista previa de HTML";

// Inicializar placeholders
if (!markdownInput.value.trim()) {
    markdownInput.value = editorPlaceholder;
    markdownInput.classList.add("text-gray-500");
}
previewSection.innerHTML = `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;

// Ocultar placeholder en el textarea cuando se enfoca
markdownInput.addEventListener("focus", () => {
    if (markdownInput.value === editorPlaceholder) {
        markdownInput.value = "";
        markdownInput.classList.remove("text-gray-500");
    }
});

// Restaurar placeholder si queda vacío al perder foco
markdownInput.addEventListener("blur", () => {
    if (!markdownInput.value.trim()) {
        markdownInput.value = editorPlaceholder;
        markdownInput.classList.add("text-gray-500");
    }
});

// Función para actualizar el contador de caracteres
function updateCharacterCount() {
    charCount.textContent = `Caracteres: ${markdownInput.value.length}`;
}

// Evento: actualizar contador cuando el usuario escribe
markdownInput.addEventListener("input", updateCharacterCount);

// Función para convertir encabezados Markdown a HTML
function convertHeadings(html) {
    html = html.replace(/^###### (.+)$/gm, "<h6 class='text-xl font-bold'>$1</h6>");
    html = html.replace(/^##### (.+)$/gm, "<h5 class='text-2xl font-bold'>$1</h5>");
    html = html.replace(/^#### (.+)$/gm, "<h4 class='text-3xl font-bold'>$1</h4>");
    html = html.replace(/^### (.+)$/gm, "<h3 class='text-4xl font-bold'>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2 class='text-5xl font-bold'>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1 class='text-6xl font-bold'>$1</h1>");
    return html;
}

// Función para convertir listas Markdown a HTML
function convertLists(html) {
    html = html.replace(/(?:^|\n)- (.+)/g, "<ul><li>$1</li></ul>"); // Listas no ordenadas
    html = html.replace(/(?:^|\n)\d+\. (.+)/g, "<ol><li>$1</li></ol>"); // Listas ordenadas
    return html;
}

// Función para convertir negritas e itálicas a HTML
function convertTextStyles(html) {
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>"); // Negrita + itálica
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Negrita
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Itálica
    return html;
}

// Función principal para convertir Markdown a HTML
function convertToHtml(text) {
    let html = text;
    html = convertHeadings(html);
    html = convertLists(html);
    html = convertTextStyles(html);
    return html;
}

// Función para renderizar la vista previa
function renderPreview(html) {
    previewSection.innerHTML = html || `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;
}

// Evento: generar vista previa al hacer clic en el botón
previewBtn.addEventListener("click", () => {
    const text = markdownInput.value;
    if (text !== editorPlaceholder) {
        const html = convertToHtml(text);
        renderPreview(html);
    } else {
        renderPreview("");
    }
});

// Evento: aplicar o quitar contraste en encabezados
contrastBtn.addEventListener("click", () => {
    const headers = previewSection.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headers.forEach(header => {
        header.classList.toggle("contrast");
    });

    isContrastApplied = !isContrastApplied; // Alternar estado
});

// Agregar estilos CSS para el contraste
const style = document.createElement("style");
style.innerHTML = `
        .contrast {
            color: #ff5733 !important;
            background-color: #000 !important;
            padding: 5px !important;
            border-radius: 5px !important;
        }
    `;
document.head.appendChild(style);
});
