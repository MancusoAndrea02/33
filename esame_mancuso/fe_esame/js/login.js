document.getElementById('loginForm').onsubmit = async function(e) {
    e.preventDefault();
    const codice = document.getElementById('codiceCliente').value.trim();

    // Chiamata al backend Spring Boot REST API (GET /api/login/{codCliente})
    try {
        const resp = await fetch(`http://localhost:8080/api/login/${codice}`);
        if(resp.ok) {
            const cliente = await resp.json();
            // Salva cliente solo in sessionStorage
            sessionStorage.setItem("cliente_corrente", JSON.stringify(cliente));
            window.location.href = "menu.html";
        } else {
            document.getElementById('loginMsg').textContent = "Codice cliente non valido!";
            document.getElementById('loginMsg').classList.remove("d-none");
        }
    } catch (err) {
        document.getElementById('loginMsg').textContent = "Errore di rete.";
        document.getElementById('loginMsg').classList.remove("d-none");
    }
};