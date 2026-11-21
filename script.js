document.addEventListener("DOMContentLoaded", () => {

  // ---------- ELEMAN YO ----------
  const mlRange  = document.getElementById("mlRange");
  const ml       = document.getElementById("ml");
  const ciclos   = document.getElementById("ciclos");

  const menos    = document.getElementById("menos");
  const mais     = document.getElementById("mais");
  const status   = document.getElementById("status");
  const iniciar  = document.getElementById("iniciar");
  const parar    = document.getElementById("parar");

  // ---------- KONSTANT ----------
  const ML_PAR_CICLO     = 50;     // 1 ciclo = 50 mL
  const MIN_CICLOS       = 1;
  const MAX_CICLOS       = 40;     // 40 × 50 = 2000 mL
  const DURACAO_CICLO_MS = 1000;

  // ---------- ETA ----------
  let quantidadeCiclos = 10;
  let ciclosExecutados = 0;
  let maquinaLigada    = false;
  let temporizador     = null;

  // ---------- FONKSYON: mete mL selon sik ----------
  function atualizarML() {
    const totalML  = quantidadeCiclos * ML_PAR_CICLO;
    ml.textContent = totalML;
    mlRange.value  = totalML;
  }

  function atualizarCiclos() {
    ciclos.textContent = quantidadeCiclos;
  }

  // ---------- BOUTON + : +1 sik = +50 mL ----------
  mais.addEventListener("click", () => {
    if (maquinaLigada) return;
    if (quantidadeCiclos < MAX_CICLOS) {
      quantidadeCiclos++;
      atualizarCiclos();
      atualizarML();
    }
  });

  // ---------- BOUTON − : −1 sik = −50 mL ----------
  menos.addEventListener("click", () => {
    if (maquinaLigada) return;
    if (quantidadeCiclos > MIN_CICLOS) {
      quantidadeCiclos--;
      atualizarCiclos();
      atualizarML();
    }
  });

  // ---------- SLIDER ----------
  mlRange.addEventListener("input", () => {
    if (maquinaLigada) return;

    const valorML    = parseInt(mlRange.value, 10);
    const novoCiclos = Math.max(
      MIN_CICLOS,
      Math.min(MAX_CICLOS, Math.round(valorML / ML_PAR_CICLO))
    );

    quantidadeCiclos = novoCiclos;
    atualizarCiclos();
    atualizarML();
  });

  // ---------- INICIAR ----------
  iniciar.addEventListener("click", () => {
    if (maquinaLigada) return;

    maquinaLigada    = true;
    ciclosExecutados = 0;

    status.textContent = "LIGADA";
    status.classList.remove("status-parada");
    status.classList.add("status-ligada");

    console.log(`Iniciando ${quantidadeCiclos} ciclos de ${ML_PAR_CICLO} mL = ${ml.textContent} mL`);

    temporizador = setInterval(() => {
      ciclosExecutados++;
      console.log(`Ciclo ${ciclosExecutados}/${quantidadeCiclos} — ${ciclosExecutados * ML_PAR_CICLO} mL`);

      if (ciclosExecutados >= quantidadeCiclos) {
        finalizar();
      }
    }, DURACAO_CICLO_MS);
  });

  // ---------- PARAR ----------
  parar.addEventListener("click", () => {
    if (!maquinaLigada) return;
    finalizar();
  });

  // ---------- FINALIZAR ----------
  function finalizar() {
    clearInterval(temporizador);
    temporizador  = null;
    maquinaLigada = false;

    status.textContent = "PARADA";
    status.classList.remove("status-ligada");
    status.classList.add("status-parada");

    console.log(`Máquina parada. Ciclos executados: ${ciclosExecutados}`);
  }

  // ---------- INISYALIZASYON ----------
  atualizarCiclos();
  atualizarML();

});