/* =====================================================================
   perguntas.js - página perguntas.html
   Lê as 6 respostas, valida e mostra o que o usuário escreveu na tela.
   ===================================================================== */

function enviar() {
  // .value lê o texto; trim() tira espaços das pontas
  let r1 = document.getElementById("luiz_resp_1").value.trim();
  let r2 = document.getElementById("luiz_resp_2").value.trim();
  let r3 = document.getElementById("luiz_resp_3").value.trim();
  let r4 = document.getElementById("luiz_resp_4").value.trim();
  let r5 = document.getElementById("luiz_resp_5").value.trim();
  let r6 = document.getElementById("luiz_resp_6").value.trim();
  let msg = document.getElementById("luiz_mensagem_perguntas");

  // Se qualquer resposta estiver vazia, mostra erro
  if (r1 === "" || r2 === "" || r3 === "" || r4 === "" || r5 === "" || r6 === "") {
    msg.innerText = "Responda todas as perguntas antes de enviar!";
    msg.style.color = "red";
    document.getElementById("luiz_resultado").style.display = "none";
  }
  else {
    // Coloca cada resposta no parágrafo correspondente
    document.getElementById("saida1").innerText = r1;
    document.getElementById("saida2").innerText = r2;
    document.getElementById("saida3").innerText = r3;
    document.getElementById("saida4").innerText = r4;
    document.getElementById("saida5").innerText = r5;
    document.getElementById("saida6").innerText = r6;

    document.getElementById("luiz_resultado").style.display = "block"; // mostra as respostas
    msg.innerText = "Respostas enviadas com sucesso!";
    msg.style.color = "green";
    document.getElementById("luiz_form_perguntas").reset(); // limpa o formulário
  }
}
