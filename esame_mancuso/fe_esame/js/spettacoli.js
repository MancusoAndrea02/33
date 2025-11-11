const cliente = JSON.parse(sessionStorage.getItem('cliente_corrente'));
if (!cliente) window.location.href = "index.html";

async function caricaSpettacoli() {
    try {
        const resp = await fetch("http://localhost:8080/api/spettacoli");
        const spettacoli = await resp.json();
        let html = "";
        spettacoli.forEach(r => {
            html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card shadow h-100">
                    <div class="card-body">
                        <h5 class="card-title mb-2">${r.titolo}</h5>
                        <h6 class="card-subtitle mb-2 text-secondary">
                            <i class="bi bi-person"></i>Autore: ${r.autore} <br/>
                            <span class="text-info">Regia:</span> ${r.regista}
                        </h6>
                        <span class="badge bg-info mb-2">
                            <i class="bi bi-house-door"></i> ${r.teatro}
                        </span>
                        <p class="mb-1"><i class="bi bi-calendar-event"></i> ${r.data_replica}</p>
                        <p class="mb-2"><strong>Prezzo:</strong> <span class="badge bg-success">&euro;${r.prezzo}</span></p>
                        <p class="mb-2"><span class="badge bg-primary">Prenotati: </span></p>
                        <a href="prenota.html?codice=${r.cod_replica}" class="btn btn-success w-100 rounded-pill"><i class="bi bi-cart-plus"></i> Prenota</a>
                    </div>
                </div>
            </div>`;
        });
        document.getElementById("spettacoliCards").innerHTML = html;
        } catch(err) {
        document.getElementById('replicaInfo').innerHTML = "<div class='alert alert-danger'>Errore API</div>";
    }
}
caricaSpettacoli();