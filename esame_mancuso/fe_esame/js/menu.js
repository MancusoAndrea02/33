const cliente = JSON.parse(sessionStorage.getItem('cliente_corrente'));
if (!cliente) window.location.href = "index.html";
document.getElementById('userName').textContent = cliente.nome + " " + cliente.cognome;

function logout() {
    sessionStorage.removeItem('cliente_corrente');
    window.location.href = "index.html";
}
