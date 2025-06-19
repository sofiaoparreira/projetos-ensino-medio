function exibirNome() {
    let nome = document.getElementById('nomeInput').value;
 
    if (nome === "Joui" || nome === "joui") {
        document.getElementById('mensagem').innerHTML = "Você acertou meu nome, parabéns!!!";
    } else {
        document.getElementById('mensagem').innerHTML = "Que pena, você errou...Mas não desanime! Aí vai uma dica: Eu sou um ex-atleta japonês!!";
    }
}
 
function limpar() {
    document.getElementById('nomeInput').value = "";
    document.getElementById('mensagem').innerHTML = "";
}