const cliente = JSON.parse(sessionStorage.getItem('cliente_corrente'));
if (!cliente) window.location.href = "index.html";

async function caricaPrenotazioni() {
    try {
        const resp = await fetch(`http://localhost:8080/api/prenotazioni?codCliente=${cliente.codCliente}`);
        const prenotazioni = await resp.json();

        let html = "";
        if (!prenotazioni.length) {
            html = `<div class="col-11 col-md-8 alert alert-warning text-center"> Nessuna prenotazione presente.</div>`;
        } else {
            html = `<div class="col-12 col-md-10">
                <table class="table table-bordered table-striped table-hover rounded shadow-sm text-center align-middle">
                <thead>
                <tr>
                    <th>Spettacolo</th><th>Autore</th><th>Regista</th><th>Teatro</th>
                    <th>Data</th><th>Pagamento</th><th>Q.tà</th>
                </tr></thead><tbody>`;
            prenotazioni.forEach(b => {
                html += `<tr>
                    <td>${b.titolo}</td>
                    <td>${b.autore}</td>
                    <td>${b.regista}</td>
                    <td>${b.teatro}</td>
                    <td>${b.data_replica}</td>
                    <td><span class="badge bg-secondary">${b.tipo_pagamento}</span></td>
                    <td><span class="badge bg-success">${b.quantita}</span></td>
                </tr>`;
            });
            html += "</tbody></table></div>";
        }
        document.getElementById("prenotazioniTable").innerHTML = html;
    } catch (err) {
        document.getElementById("prenotazioniTable").innerHTML = `<div class="alert alert-danger">Errore di rete o API.</div>`;
    }
}
caricaPrenotazioni();