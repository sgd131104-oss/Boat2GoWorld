/* ===== CONFIGURACIÓN: cambia aquí tus datos ===== */
const CONTACTO = {
  whatsapp: "",   // solo números con lada, ej. "529991234567"
  telefono: "",   // como se muestra, ej. "+52 999 123 4567"
  correo: ""      // ej. "ventas@boat2go.mx"
};

/* ===== BARCOS: agrega o quita anuncios aquí ===== */
const BARCOS = [
  {ref:"B2G-001", nombre:"Lancha Tiburonera 26", tipo:"Panga", condicion:"Usado", anio:2019, eslora:26, motor:"Fuera de borda 150 HP", ubicacion:"Progreso, Yuc.", precio:420000, descripcion:"Lancha de fibra lista para pesca, con hielera, bimini y GPS. Motor con mantenimiento al día.", ejemplo:true},
  {ref:"B2G-002", nombre:"Sport Cruiser 42", tipo:"Yate", condicion:"Usado", anio:2015, eslora:42, motor:"2 × 370 HP diésel", ubicacion:"Cancún, Q. Roo", precio:6900000, descripcion:"Dos camarotes, baño completo, cocineta y plataforma de baño. Ideal para paseos largos en el Caribe.", ejemplo:true},
  {ref:"B2G-003", nombre:"Velero Crucero 36", tipo:"Velero", condicion:"Usado", anio:2008, eslora:36, motor:"Auxiliar diésel 30 HP", ubicacion:"Isla Mujeres, Q. Roo", precio:1850000, descripcion:"Velero de travesía con velas en buen estado, piloto automático y equipo de seguridad.", ejemplo:true},
  {ref:"B2G-004", nombre:"Bowrider 23", tipo:"Lancha", condicion:"Nuevo", anio:2026, eslora:23, motor:"Fuera de borda 200 HP", ubicacion:"Mérida, Yuc.", precio:1290000, descripcion:"Lancha deportiva nueva para familia o esquí. Incluye remolque y garantía de agencia.", ejemplo:true},
  {ref:"B2G-005", nombre:"Catamarán 40", tipo:"Catamarán", condicion:"Usado", anio:2017, eslora:40, motor:"2 × 45 HP diésel", ubicacion:"Puerto Morelos, Q. Roo", precio:7400000, descripcion:"Cuatro camarotes, amplio salón y redes de proa. Excelente para charter.", ejemplo:true},
  {ref:"B2G-006", nombre:"Panga de pesca 23", tipo:"Panga", condicion:"Nuevo", anio:2026, eslora:23, motor:"Fuera de borda 115 HP", ubicacion:"Campeche, Camp.", precio:310000, descripcion:"Panga nueva reforzada para trabajo de pesca, con consola central.", ejemplo:true}
];

/* ===== Dibujos de barco por tipo ===== */
const ART = {
  Lancha:`<path d="M20 70h150l-22 22H40z"/><path d="M70 70l12-18h40l10 18"/><path d="M90 52v-10"/>`,
  Panga:`<path d="M15 72h165l-12 18H35z"/><path d="M95 72V58h22v14"/><path d="M106 58v-8"/>`,
  Yate:`<path d="M15 72h170l-24 22H40z"/><path d="M50 72V58h90l18 14"/><path d="M68 58V46h56l10 12"/><path d="M60 64h12M80 64h12M100 64h12M120 64h12"/><path d="M98 46V34"/>`,
  Velero:`<path d="M30 78h140l-18 16H48z"/><path d="M100 78V12"/><path d="M100 14l48 58h-48"/><path d="M96 20L58 70h38"/>`,
  "Catamarán":`<path d="M25 80h62l-6 12H31zM113 80h62l-6 12h-50z"/><path d="M40 80V66h120v14"/><path d="M62 66l10-14h56l10 14"/><path d="M100 52V18"/><path d="M100 20l34 30h-34"/>`
};
const art = t => `<svg viewBox="0 0 200 110" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[t]||ART.Lancha}<path d="M5 102c10 0 10-4 20-4s10 4 20 4 10-4 20-4 10 4 20 4 10-4 20-4 10 4 20 4 10-4 20-4 10 4 20 4 10-4 20-4" stroke="#C9A15A"/></svg>`;
const mxn = n => "$" + n.toLocaleString("es-MX");

/* ===== Contacto en pantalla ===== */
function pintarContacto(){
  const tel = document.getElementById("v-tel"), mail = document.getElementById("v-mail");
  tel.textContent = CONTACTO.telefono || "Número por confirmar";
  tel.classList.toggle("pending", !CONTACTO.telefono);
  mail.textContent = CONTACTO.correo || "Correo por confirmar";
  mail.classList.toggle("pending", !CONTACTO.correo);
}

/* ===== Listado y filtros ===== */
const state = {q:"", tipo:"", cond:"", orden:"rec"};
const grid = document.getElementById("grid");
function render(){
  let list = BARCOS.filter(b =>
    (!state.tipo || b.tipo === state.tipo) &&
    (!state.cond || b.condicion === state.cond) &&
    (!state.q || (b.nombre+" "+b.tipo+" "+b.ubicacion+" "+b.motor).toLowerCase().includes(state.q))
  );
  if(state.orden==="asc") list.sort((a,b)=>a.precio-b.precio);
  if(state.orden==="desc") list.sort((a,b)=>b.precio-a.precio);
  if(!list.length){ grid.innerHTML = `<div class="empty">No hay barcos con esos filtros. Escríbenos y te avisamos cuando llegue uno.</div>`; return; }
  grid.innerHTML = list.map(b => `
    <button class="card" type="button" data-ref="${b.ref}">
      <div class="pic">${art(b.tipo)}
        <span class="tag cond ${b.condicion==="Usado"?"used":""}">${b.condicion}</span>
        ${b.ejemplo?'<span class="tag demo">Ejemplo</span>':""}
      </div>
      <div class="body">
        <span class="type">${b.tipo} · ${b.ref}</span>
        <h3>${b.nombre}</h3>
        <div class="specs"><span><b>${b.eslora}</b> pies</span><span><b>${b.anio}</b></span><span>${b.motor}</span></div>
        <div class="foot"><span class="price">${mxn(b.precio)}<small>MXN</small></span><span class="loc">${b.ubicacion}</span></div>
      </div>
    </button>`).join("");
}
document.getElementById("q").addEventListener("input", e=>{state.q=e.target.value.trim().toLowerCase();render();});
document.getElementById("tipo").addEventListener("change", e=>{state.tipo=e.target.value;render();});
document.getElementById("orden").addEventListener("change", e=>{state.orden=e.target.value;render();});
document.querySelectorAll(".seg button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".seg button").forEach(x=>x.setAttribute("aria-pressed", x===btn));
  state.cond = btn.dataset.cond; render();
}));

/* ===== Ficha del barco ===== */
const modal = document.getElementById("modal");
let actual = null;
grid.addEventListener("click", e=>{
  const card = e.target.closest(".card"); if(!card) return;
  const b = BARCOS.find(x=>x.ref===card.dataset.ref); actual = b;
  document.getElementById("m-pic").innerHTML = art(b.tipo) + '<button class="m-close" type="button" id="m-close" aria-label="Cerrar">×</button>';
  document.getElementById("m-close").onclick = ()=>modal.close();
  document.getElementById("m-type").textContent = `${b.tipo} · ${b.condicion} · ${b.ref}`;
  document.getElementById("m-title").textContent = b.nombre;
  document.getElementById("m-specs").innerHTML =
    [["Eslora",b.eslora+" pies"],["Año",b.anio],["Motor",b.motor],["Ubicación",b.ubicacion]]
    .map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join("");
  document.getElementById("m-desc").textContent = b.descripcion;
  document.getElementById("m-price").innerHTML = `${mxn(b.precio)}<small>MXN</small>`;
  modal.showModal();
});
modal.addEventListener("click", e=>{ if(e.target===modal) modal.close(); });
document.getElementById("m-cta").addEventListener("click", ()=>{
  modal.close(); setMode("comprar");
  document.getElementById("f-barco").value = `${actual.nombre} (${actual.ref})`;
  document.getElementById("contacto").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>document.getElementById("f-nombre").focus({preventScroll:true}), 500);
});

/* ===== Formulario comprar / vender ===== */
let mode = "comprar";
function setMode(m){
  mode = m;
  document.querySelectorAll(".tabs button").forEach(t=>t.setAttribute("aria-selected", t.dataset.mode===m));
  document.querySelectorAll("[data-for]").forEach(el=>el.hidden = el.dataset.for!==m);
  document.getElementById("done").hidden = true;
}
document.querySelectorAll(".tabs button").forEach(t=>t.addEventListener("click",()=>setMode(t.dataset.mode)));
document.querySelectorAll('[data-goto="vender"]').forEach(a=>a.addEventListener("click",()=>setMode("vender")));

const val = id => document.getElementById(id).value.trim();
document.getElementById("form").addEventListener("submit", e=>{
  e.preventDefault();
  const nombre = val("f-nombre"), tel = val("f-tel");
  if(!nombre || !tel){ toast("Escribe tu nombre y tu celular para poder contactarte."); return; }
  let lines = [`Hola Boat2Go, soy ${nombre}.`];
  if(mode==="comprar"){
    lines.push("Quiero COMPRAR un barco.");
    if(val("f-barco")) lines.push(`Me interesa: ${val("f-barco")}`);
    lines.push(`Tipo: ${val("f-tipo-c")}`, `Presupuesto: ${val("f-presu")}`);
  } else {
    lines.push("Quiero VENDER mi barco.", `Tipo: ${val("f-tipo-v")}`);
    if(val("f-eslora")) lines.push(`Eslora: ${val("f-eslora")} pies`);
    if(val("f-motor")) lines.push(`Año y motor: ${val("f-motor")}`);
    if(val("f-precio")) lines.push(`Precio: ${val("f-precio")}`);
  }
  if(val("f-msg")) lines.push(val("f-msg"));
  lines.push(`Celular: ${tel}`); if(val("f-mail")) lines.push(`Correo: ${val("f-mail")}`);
  const text = lines.join("\n");
  document.getElementById("done-text").textContent = text;
  const wa = document.getElementById("wa-link");
  wa.href = "https://wa.me/" + (CONTACTO.whatsapp||"") + "?text=" + encodeURIComponent(text);
  document.getElementById("done").hidden = false;
});

/* ===== Copiar ===== */
async function copiar(t){
  try{ await navigator.clipboard.writeText(t); toast("Copiado"); }
  catch(_){ toast("Selecciona el texto y cópialo manualmente"); }
}
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>{
  const v = b.dataset.copy==="tel" ? CONTACTO.telefono : CONTACTO.correo;
  v ? copiar(v) : toast("Ese dato todavía no está configurado");
}));
document.getElementById("copy-msg").addEventListener("click",()=>copiar(document.getElementById("done-text").textContent));
let tt; function toast(m){const el=document.getElementById("toast");el.textContent=m;el.hidden=false;clearTimeout(tt);tt=setTimeout(()=>el.hidden=true,2400);}

pintarContacto(); render();
