document.addEventListener("DOMContentLoaded", () => {
    const previewBtn = document.querySelector("#previewBtn");
    const contrastBtn = document.querySelector("#contrastBtn");
    const markdownInput = document.querySelector("#editor");
    const previewSection = document.querySelector("#preview");
    const charCount = document.querySelector("#charCount");
    let isContrastApplied = false;

    const editorPlaceholder = "Escribí tu código Markdown aquí...";
    const previewPlaceholder = "Vista previa de HTML";

    if (!markdownInput.value.trim()) {
        markdownInput.value = editorPlaceholder;
        markdownInput.classList.add("text-gray-500");
    }
    previewSection.innerHTML = `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;

    markdownInput.addEventListener("focus", () => {
        if (markdownInput.value === editorPlaceholder) {
            markdownInput.value = "";
            markdownInput.classList.remove("text-gray-500");
        }
    });

    markdownInput.addEventListener("blur", () => {
        if (!markdownInput.value.trim()) {
            markdownInput.value = editorPlaceholder;
            markdownInput.classList.add("text-gray-500");
        }
    });

    function updateCharacterCount() {
        charCount.textContent = `Caracteres: ${markdownInput.value.length}`;
    }
    markdownInput.addEventListener("input", updateCharacterCount);

    function convertToHtml(text) {
        return text
            .replace(/^###### (.+)$/gm, "<h6 class='text-xl font-bold'>$1</h6>")
            .replace(/^##### (.+)$/gm, "<h5 class='text-2xl font-bold'>$1</h5>")
            .replace(/^#### (.+)$/gm, "<h4 class='text-3xl font-bold'>$1</h4>")
            .replace(/^### (.+)$/gm, "<h3 class='text-4xl font-bold'>$1</h3>")
            .replace(/^## (.+)$/gm, "<h2 class='text-5xl font-bold'>$1</h2>")
            .replace(/^# (.+)$/gm, "<h1 class='text-6xl font-bold'>$1</h1>")
            .replace(/(?:^|\n)- (.+)/g, "<ul><li>$1</li></ul>")
            .replace(/(?:^|\n)\d+\. (.+)/g, "<ol><li>$1</li></ol>")
            .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");
    }

    function renderPreview(html) {
        previewSection.innerHTML = html || `<p class="text-gray-500 text-sm">${previewPlaceholder}</p>`;
    }

    previewBtn.addEventListener("click", () => {
        const text = markdownInput.value;
        if (text !== editorPlaceholder) {
            renderPreview(convertToHtml(text));
        } else {
            renderPreview("");
        }
    });

    contrastBtn.addEventListener("click", () => {
        previewSection.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(header => {
            header.classList.toggle("contrast");
        });
        isContrastApplied = !isContrastApplied;
    });

    const style = document.createElement("style");
    style.innerHTML = `
        .contrast {
            color: #ff5733 !important;
            background-color: #000 !important;
            padding: 5px !important;
            border-radius: 5px !important;
        }
        
        @media screen and (max-width: 768px) {
            body {
                font-size: 16px;
            }
            #editor {
                width: 100%;
                min-height: 150px;
            }
            #preview {
                width: 100%;
                padding: 10px;
                overflow-x: auto;
            }
            button {
                width: 100%;
                margin-top: 10px;
            }
        }
    `;
    document.head.appendChild(style);
});
