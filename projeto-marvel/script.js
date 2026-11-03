/* =====================================================================
   script.js - Portal Marvel - Luiz Farias
   Funcionalidades (todas chamadas por onclick no HTML):
   1) Validação do formulário (obrigatória, 8 campos)  -> validar()
   2) Troca de cores de fundo (4 botões com onclick direto no HTML)
      + modo claro/escuro                              -> alternarTema()
   3) Carrossel de imagens (8 imagens)                 -> mudar()
   4) Abas por gênero (6 abas)                         -> mostrarAba()
   5) FAQ / accordion (6 itens)                        -> alternar()
   6) Modal reaproveitável com conteúdo dinâmico       -> abrirModal() / fecharModal()
   ===================================================================== */


/* ===================== 1) VALIDAÇÃO DO FORMULÁRIO ===================== */
function validar() {
  // .value lê o que foi digitado; trim() tira espaços do começo e do fim
  let nome = document.getElementById("luiz_nome").value.trim();
  let email = document.getElementById("luiz_email").value.trim();
  let idade = Number(document.getElementById("luiz_idade").value); // Number() converte texto em número
  let filme = document.getElementById("luiz_filme").value;
  let heroi = document.querySelector('input[name="luiz_heroi"]:checked'); // radio marcado (ou null)
  let nota = Number(document.getElementById("luiz_nota").value);
  let comentario = document.getElementById("luiz_comentario").value.trim();
  let termos = document.getElementById("luiz_termos").checked; // checkbox: true ou false
  let msg = document.getElementById("luiz_mensagem");

  // if / else if / else: só a primeira condição verdadeira é executada
  if (nome === "") {
    msg.innerText = "O nome é obrigatório. Digite um nome válido.";
    msg.style.color = "red";
  }
  else if (nome.length < 3 || !isNaN(nome)) {
    // isNaN(nome) é falso quando o texto é só número (ex.: "123")
    msg.innerText = "Digite um nome válido (mínimo 3 letras e não só números).";
    msg.style.color = "red";
  }
  else if (email === "") {
    msg.innerText = "O e-mail é obrigatório. Digite um e-mail válido.";
    msg.style.color = "red";
  }
  else if (!email.includes("@") || !email.includes(".")) {
    msg.innerText = "Digite um e-mail válido.";
    msg.style.color = "red";
  }
  else if (idade < 10 || idade > 120) {
    // campo vazio vira 0 no Number(), então também cai aqui
    msg.innerText = "Digite uma idade válida (entre 10 e 120 anos).";
    msg.style.color = "red";
  }
  else if (filme === "") {
    msg.innerText = "Escolha seu filme favorito.";
    msg.style.color = "red";
  }
  else if (heroi === null) {
    msg.innerText = "Selecione seu herói preferido.";
    msg.style.color = "red";
  }
  else if (document.getElementById("luiz_nota").value === "" || nota < 0 || nota > 10) {
    msg.innerText = "A nota deve ser um número de 0 a 10.";
    msg.style.color = "red";
  }
  else if (comentario.length < 10) {
    msg.innerText = "O comentário precisa ter pelo menos 10 caracteres.";
    msg.style.color = "red";
  }
  else if (termos === false) {
    msg.innerText = "Você precisa aceitar as regras do clube.";
    msg.style.color = "red";
  }
  else {
    msg.innerText = "Inscrição enviada com sucesso, " + nome + "!";
    msg.style.color = "green";
    // Limpa todos os campos em uma única linha
    document.getElementById("luiz_formulario").reset();
  }
}


/* ===================== 2) MODO CLARO / ESCURO ===================== */
// As 4 cores de fundo são feitas direto no HTML, com onclick nos botões.
function alternarTema() {
  // Liga/desliga a classe "luiz_claro" na tag <body>
  document.body.classList.toggle("luiz_claro");
}


/* ===================== 3) CARROSSEL DE IMAGENS ===================== */
let fotos = [
  "img/carrossel-1.jpg",
  "img/carrossel-2.jpg",
  "img/carrossel-3.jpg",
  "img/carrossel-4.jpg",
  "img/carrossel-5.jpg",
  "img/carrossel-6.jpg",
  "img/carrossel-7.jpg",
  "img/carrossel-8.jpg"
];

let legendas = [
  "Homem-Aranha: Um Novo Dia",
  "Homem-Aranha: Sem Volta para Casa",
  "Homem-Aranha: De Volta ao Lar",
  "Homem-Aranha: Longe de Casa",
  "Homem de Ferro",
  "Capitão América: Guerra Civil",
  "Vingadores: Guerra Infinita",
  "Vingadores: Ultimato"
];

let indice = 0; // posição da imagem que está aparecendo

function mudar(direcao) {
  indice = indice + direcao;

  // Volta ao início ou ao final se passar dos limites
  if (indice >= fotos.length) indice = 0;
  if (indice < 0) indice = fotos.length - 1;

  document.getElementById("foto").src = fotos[indice];
  document.getElementById("luiz_legenda").innerText = legendas[indice];
  document.getElementById("indicador").innerText = "Imagem " + (indice + 1) + " de " + fotos.length;
}


/* ===================== 4) ABAS POR GÊNERO ===================== */
// 1. Esconde todos os painéis e tira o destaque de todos os botões
function resetarTudo() {
  document.querySelector("#aba1").style.display = "none";
  document.querySelector("#aba2").style.display = "none";
  document.querySelector("#aba3").style.display = "none";
  document.querySelector("#aba4").style.display = "none";
  document.querySelector("#aba5").style.display = "none";
  document.querySelector("#aba6").style.display = "none";

  document.querySelector("#btnAba1").classList.remove("ativo");
  document.querySelector("#btnAba2").classList.remove("ativo");
  document.querySelector("#btnAba3").classList.remove("ativo");
  document.querySelector("#btnAba4").classList.remove("ativo");
  document.querySelector("#btnAba5").classList.remove("ativo");
  document.querySelector("#btnAba6").classList.remove("ativo");
}

// 2. Mostra só o painel e o botão da aba clicada
function mostrarAba(numero) {
  resetarTudo();
  document.querySelector("#aba" + numero).style.display = "block";
  document.querySelector("#btnAba" + numero).classList.add("ativo");
}


/* ===================== 5) FAQ / ACCORDION ===================== */
// Recebe o número da pergunta e abre ou fecha a resposta dela
function alternar(numero) {
  let painel = document.querySelector("#resp" + numero);
  if (painel.style.display === "block") {
    painel.style.display = "none";
  } else {
    painel.style.display = "block";
  }
}


/* ===================== 6) MODAL REAPROVEITÁVEL ===================== */
// UMA função preenche o MESMO modal com o texto que o botão enviou
function abrirModal(titulo, info, sinopse) {
  document.getElementById("luiz_modal_titulo").innerText = titulo;
  document.getElementById("luiz_modal_info").innerText = info;
  document.getElementById("luiz_modal_sinopse").innerText = sinopse;
  document.getElementById("luiz_modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("luiz_modal").style.display = "none";
}
