const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
uploadBtn.addEventListener("click", (evento) => {
  evento.preventDefault();
  inputUpload.click();
});
// função para ler do arquivo
function lerConteudoDoArquivo(arquivo) {
  //retorna uma promessa - Promessa é algo que não sabemos se vai dar certo ou nao(Algo ascincrono, algo que nao sabemos quando vai acontecer)
  return new Promise((resolve, reject) => {
    //resolve quando der tudo certo, reject quando algo der errado
    const leitor = new FileReader(); //new FileReader é uma funcionalidade do javascript que ira ler o arquivo
    leitor.onload = () => {
      //onload ele carrega algo
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p");

//como precisamos esperar algo usamos o async na função calback
inputUpload.addEventListener("change", async (evento) => {
  evento.preventDefault();
  const arquivo = evento.target.files[0];
  //a gente faz um if se tiver arquivo
  if (arquivo) {
    //usamos o try para tentar fazer algo
    try {
      // se acontecer ele funcionar esse codigo será executado
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeImagem.textContent = conteudoDoArquivo.name;
    } catch (erro) {
      // casso de erro esse codigo será executado
      console.log("Não foi possivel adicionar um arquivo");
    }
  }
});

// pega o e lista Ul
const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");

//adiciona um evento na lista em que quando clicar na imagem com id remove-tag ele remove o elemento filho da listaTags (o Li)
listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagQueremosRemover = evento.target.parentElement;
    listaTags.removeChild(tagQueremosRemover);
  }
});

// lista pré definida de tags
const tagsDisponiveis = [
  "Front-end",
  "Back-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "Javascript",
];

//função assincrona para verificar se a tag está na lista de tags disponiveis
async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    //simula uma consulta no banco de dados com tempo de 1 segundo
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

//adiciona um evento de pressionar um botão
inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      //se tagTexto for diferente de vazio ele vai tentar
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto); //cria uma variavel que vai verifica se a tag ta disponivel
        //aqui ele vai verificar se a tag existe caso exista ela vai criar um li, e no li vai adicionar um p e uma imagem
        if (tagExiste) {
          const novaTag = document.createElement("li");
          novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(novaTag);
          inputTags.value = "";
        } else {
          //se não vai dar um alerta de tag não encontrada
          alert("Tag não foi encontrada");
        }
      } catch (erro) {
        //caso não consiga realizar ele vai vir pro catch de erro
        console.error("Erro ao verificar a existencia da Tag" + erro);
        alert("Erro ao verificar a existencia da tag");
      }
    }
  }
});

const botaoPublicar = document.getElementById("btn-publicar");

async function publicarProjeto(
  nomeDoprojeto,
  descricaoDoProjeto,
  tagsDoProjeto
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;
      if (deuCerto) {
        resolve("Projeto Publicado");
      } else {
        reject("Erro ao publicar");
      }
    }, 2000);
  });
}
botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();
  const inputNome = document.getElementById("nome");
  const inputDescricao = document.getElementById("descricao");
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  ); //pega todos os p dentro do listaTag com map ele passa um por um e pega o conteudo do texto
  try {
    const resultado = await publicarProjeto(
      inputNome,
      inputDescricao,
      tagsProjeto
    );
    console.log(resultado);
    alert("Deu tudo certo");
  } catch (erro) {
    console.error("Deu tudo Errado" + erro);
    alert("Deu tudo errado");
  }
});

const botaoDescartar = document.querySelector(".botao-descartar");
botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();
  const formulario = document.querySelector("form");
  formulario.reset();
  imagemPrincipal.src = "./img/imagem1.png";
  nomeImagem.textContent = "image_projeto.png";
  listaTags.innerHTML = "";
});
