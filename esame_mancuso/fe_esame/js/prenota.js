const cliente = JSON.parse(sessionStorage.getItem('cliente_corrente'));
if (!cliente) window.location.href = "index.html";

// Ottiengo codReplica da query string
function getParam(name){let m=location.search.match(new RegExp('[?&]'+name+'=([^&]+)(&|$)'));return m?decodeURIComponent(m[1]):null;}
const codReplica = getParam('codice');

async function caricaReplica() {
    try {
        const resp = await fetch(`http://localhost:8080/api/repliche/${codReplica}`);
        if(!resp.ok) {
            document.getElementById('replicaInfo').innerHTML = "<div class='alert alert-danger'>Spettacolo non trovato.</div>";
            return;
        }
        const replica = await resp.json();
        document.getElementById('replicaInfo').innerHTML = `
            <div class="mb-3">
                <h5>${replica.titolo} <span class="badge bg-info">${replica.teatro}</span></h5>
                <h6 class="mb-1 text-secondary">
                  <i class="bi bi-person"></i> ${replica.autore} | Regia: ${replica.regista}
                </h6>
                <div>
                  <i class="bi bi-calendar-event"></i> <b>Data:</b> ${replica.data_replica} | <b>Prezzo:</b> <span class="badge bg-success">&euro;${replica.prezzo}</span>
                </div>
                <div><span class="badge bg-primary">Prenotati: ${replica.prenotati} posti</span></div>
            </div>`;
    } catch(err) {
        //document.getElementById('replicaInfo').innerHTML = "<div class='alert alert-danger'></div>";
    }
}
caricaReplica();

document.getElementById('prenotaForm').onsubmit = async function(e){
    e.preventDefault();
    let quantita = parseInt(document.getElementById('quantita').value,10);
    let tipoPagamento = document.getElementById('tipoPagamento').value;
    let prenotaMsg = document.getElementById('prenotaMsg');
    prenotaMsg.classList.add('d-none');
    prenotaMsg.classList.remove('alert-success','alert-danger');
    try {
        const res = await fetch("http://localhost:8080/api/biglietti", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                codCliente: cliente.codCliente,
                codReplica,
                tipoPagamento,
                quantita
            })
        });
        const result = await res.json();
        if(result.success) {
            prenotaMsg.textContent = "Prenotazione effettuata!";
            prenotaMsg.classList.remove('d-none');
            prenotaMsg.classList.add('alert-success');
            setTimeout(function(){ window.location.href = "prenotazioni.html"; }, 1200);
        } else {
            prenotaMsg.textContent = result.message || "Errore nella prenotazione.";
            prenotaMsg.classList.remove('d-none');
            prenotaMsg.classList.add('alert-danger');
        }
    } catch(err) {
        prenotaMsg.textContent = "Errore di rete.";
        prenotaMsg.classList.remove('d-none');
        prenotaMsg.classList.add('alert-danger');
    }
};