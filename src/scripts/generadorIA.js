import { set } from "astro:schema";

export function manejarGeneracion() {
  const btn = document.querySelector(".btn-generate");
  const promptInput = document.querySelector("textarea");
  const formatoSelect = document.querySelector(".custom-select");
  let errorPost = document.querySelector(".error");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const prompt = promptInput.value;
    const formato = formatoSelect.value;

    if (!prompt || formato === "Elegir formato...") {
      errorPost.classList.remove("d-none");
      errorPost.style.display = "block";
      errorLabel.style.opacity = "1";
      setTimeout(() => {
        errorPost.style.transition = "opacity 0.8s ease";
        errorPost.style.opacity = "0";

        setTimeout(() => {
          errorPost.classList.add("d-none");
          errorPost.style.display = "none";
        }, 800);
      }, 5000);
      return;
    }

    btn.disabled = true;
    btn.innerHTML = "Generando plantilla...";
    btn.style.opacity = "0.7";

    try {
      console.log("Iniciando peticion");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, formato, categoria: "General" }),
      });

      const data = await response.json();
      // Aquí es donde recibes el texto de la IA
      console.log(data.text);

      btn.classList.replace("btn-generate", "btn-success");
      btn.innerHTML = "¡Completado!";
    } catch (error) {
      btn.disabled = false;
      btn.innerHTML = "Error";
      errorPost.style.display = "none";
      if (error.message.includes("429")) {
        console.log("Falta saldo");
      } else {
        console.log("Error al conectar con la IA");
      }
    }
  });
}
