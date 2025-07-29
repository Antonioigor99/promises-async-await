const inputText = document.getElementById("input-content");
const btnInput = document.getElementById("btn-input");

btnInput.addEventListener("click", (e) => {
  e.preventDefault();
  const listaPessoas = document.querySelectorAll(".lista-pessoas-cargos li");
  console.log(listaPessoas.classList(".nome-pessoa"));
});
