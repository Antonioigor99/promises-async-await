const pegaTag = document.getElementById("input-tag");
const listContainer = document.getElementById("list__tags-container");
const tagsPermitidas = ["tag", "teste", "teste2", "teste3"];

async function verificaTag(tag) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsPermitidas.includes(tag));
    }, 1000);
  });
}

pegaTag.addEventListener("keypress", async (evento) => {
  if (evento.key == "Enter") {
    const inputTag = pegaTag.value.trim();
    if (inputTag !== "") {
      try {
        const inputVerificaTag = await verificaTag(inputTag);
        if (inputVerificaTag) {
          const listTag = document.createElement("li");
          listTag.innerHTML = `<p>${inputTag}</p><strong class="remove-tag">X</strong>`;
          console.log(listTag);
          listContainer.appendChild(listTag);
          pegaTag.value = "";
        } else {
          alert("Tag não está na lista");
        }
      } catch (error) {
        console.error("Deu erro" + error);
      }
    }
  }
});
listContainer.addEventListener("click", (evento) => {
  evento.preventDefault();
  if (evento.target.classList.contains("remove-tag")) {
    const removeTag = evento.target.parentElement;
    listContainer.removeChild(removeTag);
  }
});
