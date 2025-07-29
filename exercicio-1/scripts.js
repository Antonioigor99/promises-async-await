const btnImagem = document.getElementById("upload-btn");
const inputImagem = document.getElementById("imagem-upload");
btnImagem.addEventListener("click", (e) => {
  e.preventDefault();
  inputImagem.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do Arquivo ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

const conteudoImagem = document.querySelector(".imagem-conteudo");
const imagemTextoConteudo = document.querySelector(".img-descricao p");

inputImagem.addEventListener("change", async (event) => {
  event.preventDefault();
  const arquivo = event.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      conteudoImagem.src = conteudoDoArquivo.url;
      imagemTextoConteudo.textContent = conteudoDoArquivo.nome;
    } catch (error) {
      console.error("sem conteudo");
    }
  }
});

const listaDeGatos = [
  { nome: "gato1", cor: "amarelo" },
  { nome: "gato2", cor: "azul" },
  { nome: "gato3", cor: "cinza" },
  { nome: "gato4", cor: "amarelo" },
];
const corDesejada = "amarelo";
function filtrarGatos(arr, corDesejada) {
  return arr.filter((gato) => gato.cor === corDesejada);
}
console.log(filtrarGatos(listaDeGatos, corDesejada));

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const vaiRemover = evento.target.parentElement;
    listaTags.removeChild(vaiRemover);
  }
});

const tagsParaGatos = ["Gato", "Gato ciames", "Gato especial"];

async function verificatagsGatos(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsParaGatos.includes(tagTexto));
    }, 1000);
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const tagExiste = await verificatagsGatos(tagTexto);
      try {
        if (tagExiste) {
          const novaTag = document.createElement("li");
          novaTag.innerHTML = `<p>${tagTexto}</p><img src="/img/close-black.svg" class="remove-tag" />`;
          listaTags.appendChild(novaTag);
          inputTags.value = "";
        } else {
          alert("tag não encotrada");
        }
      } catch (error) {
        console.error("erro ao tentar executar" + error);
      }
    }
  }
});
