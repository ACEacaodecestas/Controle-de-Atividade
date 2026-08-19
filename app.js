const lists={
cftvChecks:["Verificação do funcionamento das câmeras","Verificação da imagem","Verificação de foco e enquadramento","Verificação de lente","Limpeza das lentes","Verificação de fixação","Verificação de conectores","Verificação do cabeamento","Verificação da alimentação","Verificação de câmeras offline","Teste de visualização ao vivo","Teste de infravermelho/visão noturna","Verificação de câmera com imagem distorcida/intermitente"],
accessEquip:["Controladora","Leitor facial","Leitor RFID/Tag","Biometria","Fechadura eletromagnética","Fechadura elétrica","Eclusa/Intertravamento","Botoeira","Sensor magnético","Catraca","Portão","Interfonia"],
accessTests:["Teste de abertura","Teste de fechamento","Teste de leitura facial","Teste de leitura de cartão/tag","Teste de botoeira","Teste de fechadura","Verificação de alimentação","Verificação de bateria/fonte","Verificação de comunicação de rede","Verificação dos usuários cadastrados","Teste de acionamento remoto","Verificação dos registros/eventos"],
fenceChecks:["Central de choque funcionando","Alimentação elétrica verificada","Bateria verificada","Tensão de saída verificada conforme especificação do fabricante","Fios de alta tensão verificados","Isoladores verificados","Hastes verificadas","Fixações verificadas","Arames/fios verificados","Aterramento verificado","Sinais de oxidação identificados","Vegetação/objetos próximos removidos","Sirene testada","Disparo/alarme testado","Tamper/violação testado","Central comunicando corretamente","Perímetro inspecionado"],
alarmCentral:["Central funcionando","Alimentação verificada","Bateria verificada","Comunicação verificada","Eventos verificados","Memória de eventos consultada"],
alarmSensors:["Sensores magnéticos testados","Sensores PIR testados","Sensores externos testados","Sensor de movimento testado","Botão de pânico testado","Sirene testada","Teclado testado"],
alarmComm:["Internet/IP","GPRS/4G","Aplicativo","Central de monitoramento","Notificação de disparo"],
infraChecks:["Racks organizados","Switches funcionando","Patch cords/conectores verificados","Cabeamento verificado","Fontes de alimentação verificadas","Nobreak funcionando","Baterias verificadas","Tomadas/alimentação verificadas","Equipamentos sem aquecimento anormal","Equipamentos identificados","Rede de comunicação funcionando"],sourceChecks:["Fonte de alimentação funcionando","Tensão de saída verificada","Cabos e conectores verificados","Bateria verificada","Nobreak funcionando","Autonomia do nobreak verificada","Alarmes do nobreak verificados","Tomadas e alimentação verificadas","Sinais de aquecimento anormal verificados","Equipamento identificado"],
repairResults:["Equipamento normalizado","Sistema normalizado","Funcionamento parcial","Necessário retorno","Necessário orçamento","Necessária substituição de equipamento"],
finalCondition:["Sistema funcionando normalmente","Sistema funcionando parcialmente","Equipamento permanece com falha","Necessário substituição de equipamento","Necessário novo atendimento","Aguardando aprovação de orçamento"],
preventiveResults:["Manutenção preventiva concluída","Sistema funcionando normalmente","Foi identificada necessidade de correção","Necessário orçamento","Necessário retorno"],
visitResults:["Avaliação concluída","Necessário orçamento","Necessário manutenção corretiva","Necessário retorno","Sistema sem irregularidades aparentes"],
returnResults:["Pendência solucionada","Sistema normalizado","Funcionamento parcial","Necessário novo retorno","Necessário orçamento"],
emergencyResults:["Sistema normalizado","Funcionamento parcial","Contenção realizada","Necessária manutenção definitiva","Necessário retorno","Necessário substituição de equipamento"]
};
function populate(){
for(const [id,arr] of Object.entries(lists)){document.getElementById(id).innerHTML=arr.map((x,i)=><label><input type="checkbox" data-group="${id}" value="${esc(x)}"> ${esc(x)}</label>).join("")}
}

const systemChecklistMap={
"CFTV":"checklistCFTV",
"Controle de Acesso":"checklistAccess",
"Cerca Elétrica":"checklistFence",
"Sistema de Alarme":"checklistAlarm",
"Infraestrutura/Rede":"checklistInfra",
"Fonte/Nobreak":"checklistSource",
"Outro":"checklistOther"
};
function selectedSystems(){
return [...document.querySelectorAll("#systems input[data-system]")].map(x=>x.value);
}
function updateSystemChecklists(){
const selected=selectedSystems();
document.querySelectorAll(".system-checklist").forEach(card=>{
const name=card.dataset.checklist;
card.classList.toggle("hidden",!selected.includes(name));
});
const otherWrap=document.getElementById("otherSystemWrap");
if(otherWrap) otherWrap.classList.toggle("hidden",!selected.includes("Outro"));
const hint=document.getElementById("systemHint");
if(hint) hint.textContent=selected.length
?"Checklist exibido conforme o(s) sistema(s) selecionado(s). Você pode selecionar mais de um."
:"Selecione um ou mais sistemas. A OS exibirá somente os checklists correspondentes aos sistemas selecionados.";
}
function updateServiceTypeSection(){
const type=document.getElementById("serviceType").value;
document.querySelectorAll(".service-type-section").forEach(el=>{
el.classList.toggle("hidden",el.dataset.serviceType!==type);
});
}
function esc(s){return s.replaceAll("&","&").replaceAll("<","<").replaceAll(">",">").replaceAll('"',""")}
function val(id){return document.getElementById(id)?.value||""}
function set(id,v){if(document.getElementById(id))document.getElementById(id).value=v||""}
function checks(group){return [...document.querySelectorAll(input[data-group="${group}"]:checked)].map(x=>x.value)}
function today(){return new Date().toISOString().slice(0,10)}
function nextNumber(){let n=Number(localStorage.getItem("osNext")||"1");localStorage.setItem("osNext",n+1);return String(n).padStart(6,"0")}
function newOS(){
document.getElementById("osForm").reset();populateClientSelect();set("osNumber",nextNumber());set("osDate",today());set("visitDate",today());set("clientSignDate",today());set("techSignDate",today());set("closedDate",today());document.getElementById("materials").innerHTML="";for(let i=0;i<3;i++)addMaterial();clearCanvas("clientCanvas");clearCanvas("techCanvas");document.getElementById("photoGrid").innerHTML="";window.scrollTo({top:0,behavior:"smooth"});toast("Nova OS criada")}
function addMaterial(data={}){const d=document.createElement("div");d.className="grid material";d.style.marginBottom="8px";d.innerHTML=<div class="col-8"><input class="matDesc" placeholder="Descrição" value="${esc(data.desc||"")}"></div><div class="col-3"><input class="matQty" type="number" min="0" placeholder="Quantidade" value="${data.qty||""}"></div><div class="col-1"><button type="button" class="danger" onclick="this.parentElement.parentElement.remove()">✕</button></div>;document.getElementById("materials").appendChild(d)}
function setupCanvas(id){const c=document.getElementById(id),ctx=c.getContext("2d");let drawing=false,last={x:0,y:0};function pos(e){const r=c.getBoundingClientRect();const p=e.touches?e.touches[0];return{x:(p.clientX-r.left)c.width/r.width,y:(p.clientY-r.top)c.height/r.height}}function down(e){drawing=true;last=pos(e);e.preventDefault()}function move(e){if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle="#111827";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.stroke();last=p;e.preventDefault()}function up(){drawing=false}c.addEventListener("mousedown",down);c.addEventListener("mousemove",move);window.addEventListener("mouseup",up);c.addEventListener("touchstart",down,{passive});c.addEventListener("touchmove",move,{passive});c.addEventListener("touchend",up);resizeCanvas(c,ctx)}
function resizeCanvas(c,ctx){const r=c.getBoundingClientRect(),ratio=Math.max(devicePixelRatio||1,1);c.width=r.widthratio;c.height=180ratio;ctx.scale(ratio,ratio)}
function clearCanvas(id){const c=document.getElementById(id);if(!c)return;const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height)}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.style.display="block";setTimeout(()=>e.style.display="none",1800)}
function collect(){
const materials=[...document.querySelectorAll(".material")].map(r=>({desc.querySelector(".matDesc").value,qty.querySelector(".matQty").value})).filter(x=>x.desc||x.qty);
return {osNumber("osNumber"),osDate("osDate"),visitDate("visitDate"),status("status"),serviceType("serviceType"),priority("priority"),client("client"),document("document"),address("address"),phone("phone"),responsible("responsible"),technician("technician"),arrival("arrival"),departure("departure"),request("request"),systems("systems"),otherSystem("otherSystem"),cameraQty("cameraQty"),cameraIssues("cameraIssues"),cftvObs("cftvObs"),accessFault("accessFault"),accessObs("accessObs"),fenceIssues("fenceIssues"),fenceObs("fenceObs"),alarmIssues("alarmIssues"),alarmObs("alarmObs"),infraIssues("infraIssues"),problem("problem"),diagnosis("diagnosis"),cause("cause"),serviceDone("serviceDone"),replaced("replaced"),repairTest("repairTest"),repairResults("repairResults"),
preventiveObjective("preventiveObjective"),preventiveActivities("preventiveActivities"),preventiveCondition("preventiveCondition"),preventiveRecommendations("preventiveRecommendations"),preventiveResults("preventiveResults"),
visitReason("visitReason"),visitEvaluation("visitEvaluation"),visitFindings("visitFindings"),visitRecommendations("visitRecommendations"),visitResults("visitResults"),
returnPreviousOS("returnPreviousOS"),returnReason("returnReason"),returnPending("returnPending"),returnAction("returnAction"),returnResults("returnResults"),
emergencySituation("emergencySituation"),emergencyImpact("emergencyImpact"),emergencyAction("emergencyAction"),emergencyReplaced("emergencyReplaced"),emergencyResults("emergencyResults"),emergencyPending("emergencyPending"),
materials,photosBefore("photosBefore"),photosAfter("photosAfter"),photos.currentPhotos||[],pending("pending"),recommendations("recommendations"),extraQuote("extraQuote"),deadline("deadline"),quoteDescription("quoteDescription"),finalCondition("finalCondition"),finalObs("finalObs"),sourceChecks("sourceChecks"),sourceFault("sourceFault"),sourceObs("sourceObs"),otherChecks("otherChecks"),otherIssues("otherIssues"),otherObs("otherObs"),clientSignName("clientSignName"),clientRole("clientRole"),clientSignDate("clientSignDate"),clientSignature.getElementById("clientCanvas").toDataURL("image/png"),techSignName("techSignName"),techSignDate("techSignDate"),techSignature.getElementById("techCanvas").toDataURL("image/png"),generalNote("generalNote"),closedDate("closedDate"),closedTime("closedTime"),cftvChecks("cftvChecks"),accessEquip("accessEquip"),accessTests("accessTests"),fenceChecks("fenceChecks"),alarmCentral("alarmCentral"),alarmSensors("alarmSensors"),alarmComm("alarmComm"),infraChecks("infraChecks")};
return {osNumber("osNumber"),osDate("osDate"),visitDate("visitDate"),status("status"),serviceType("serviceType"),priority("priority"),client("client"),document("document"),address("address"),phone("phone"),responsible("responsible"),technician("technician"),arrival("arrival"),departure("departure"),request("request"),systems:[...document.querySelectorAll("#systems input")].map(x=>x.value),otherSystem("otherSystem"),cameraQty("cameraQty"),cameraIssues("cameraIssues"),cftvObs("cftvObs"),accessFault("accessFault"),accessObs("accessObs"),fenceIssues("fenceIssues"),fenceObs("fenceObs"),alarmIssues("alarmIssues"),alarmObs("alarmObs"),infraIssues("infraIssues"),problem("problem"),diagnosis("diagnosis"),cause("cause"),serviceDone("serviceDone"),replaced("replaced"),repairTest("repairTest"),repairResults("repairResults"),
preventiveObjective("preventiveObjective"),preventiveActivities("preventiveActivities"),preventiveCondition("preventiveCondition"),preventiveRecommendations("preventiveRecommendations"),preventiveResults("preventiveResults"),
visitReason("visitReason"),visitEvaluation("visitEvaluation"),visitFindings("visitFindings"),visitRecommendations("visitRecommendations"),visitResults("visitResults"),
returnPreviousOS("returnPreviousOS"),returnReason("returnReason"),returnPending("returnPending"),returnAction("returnAction"),returnResults("returnResults"),
emergencySituation("emergencySituation"),emergencyImpact("emergencyImpact"),emergencyAction("emergencyAction"),emergencyReplaced("emergencyReplaced"),emergencyResults("emergencyResults"),emergencyPending("emergencyPending"),
materials,photosBefore("photosBefore"),photosAfter("photosAfter"),photos.currentPhotos||[],pending("pending"),recommendations("recommendations"),extraQuote("extraQuote"),deadline("deadline"),quoteDescription("quoteDescription"),finalCondition("finalCondition"),finalObs("finalObs"),sourceChecks("sourceChecks"),sourceFault("sourceFault"),sourceObs("sourceObs"),otherChecks("otherChecks"),otherIssues("otherIssues"),otherObs("otherObs"),clientSignName("clientSignName"),clientRole("clientRole"),clientSignDate("clientSignDate"),clientSignature.getElementById("clientCanvas").toDataURL("image/png"),techSignName("techSignName"),techSignDate("techSignDate"),techSignature.getElementById("techCanvas").toDataURL("image/png"),generalNote("generalNote"),closedDate("closedDate"),closedTime("closedTime"),cftvChecks("cftvChecks"),accessEquip("accessEquip"),accessTests("accessTests"),fenceChecks("fenceChecks"),alarmCentral("alarmCentral"),alarmSensors("alarmSensors"),alarmComm("alarmComm"),infraChecks("infraChecks")};
}
function saveOS(){
const d=collect();let arr=JSON.parse(localStorage.getItem("osList")||"[]");arr=arr.filter(x=>x.osNumber!==d.osNumber);arr.push(d);localStorage.setItem("osList",JSON.stringify(arr));toast("OS salva com sucesso")}
function renderHistory(){
const q=val("searchHistory").toLowerCase();const arr=JSON.parse(localStorage.getItem("osList")||"[]").filter(x=>JSON.stringify(x).toLowerCase().includes(q)).sort((a,b)=>b.osNumber.localeCompare(a.osNumber));document.getElementById("history").innerHTML=arr.length?arr.map(x=><div class="history-item"><div><b>OS ${x.osNumber}</b><br>${esc(x.client||"Sem cliente")}<br><span class="small">${x.osDate||""} • ${esc(x.status||"")}</span></div><div><button onclick="loadOS('${x.osNumber}')">Abrir</button> <button class="ok" onclick="loadOS('${x.osNumber}');setTimeout(generatePDF,300)">PDF</button></div></div>).join(""):"Nenhuma OS encontrada."}
function getQuotes(){return JSON.parse(localStorage.getItem("quotesList")||"[]")}
function setQuotes(arr){localStorage.setItem("quotesList",JSON.stringify(arr))}
function nextQuoteNumber(){let n=Number(localStorage.getItem("quoteNext")||"1");localStorage.setItem("quoteNext",n+1);return "ORC-"+String(n).padStart(6,"0")}
function populateQuoteClientSelect(){
const sel=document.getElementById("quoteClient"); if(!sel)return;
const current=sel.value;
const clients=getClients();
sel.innerHTML='<option value="">— Selecione um cliente cadastrado —</option>'+clients.map(c=><option value="${esc(c.id)}">${esc(c.name)}</option>).join("");
if(current && clients.some(c=>c.id===current))sel.value=current;
}
function selectClientForQuote(){
const c=getClients().find(x=>x.id===val("quoteClient"));
if(!c){set("quoteDocument","");set("quotePhone","");set("quoteAddress","");return}
set("quoteDocument",c.document);set("quotePhone",c.phone);set("quoteAddress",c.address);
}
function addQuoteItem(data={}){
const tbody=document.getElementById("quoteItems"); if(!tbody)return;
const tr=document.createElement("tr"); tr.className="quote-item";
tr.innerHTML=<td><input class="quoteDesc" placeholder="Descrição do item ou serviço" value="${esc(data.desc||"")}"></td><td style="width:90px"><input class="quoteQty" type="number" min="0" step="0.01" value="${data.qty??1}" oninput="updateQuoteTotals()"></td><td style="width:160px"><input class="quoteUnit" type="number" min="0" step="0.01" placeholder="0,00" value="${data.unit??""}" oninput="updateQuoteTotals()"></td><td style="width:140px"><strong class="quoteLineTotal">R$ 0,00</strong></td><td style="width:55px"><button type="button" class="danger quote-remove" onclick="this.closest('tr').remove();updateQuoteTotals()">✕</button></td>;
tbody.appendChild(tr);updateQuoteTotals();
}
function money(v){return Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function updateQuoteTotals(){
let total=0;
document.querySelectorAll(".quote-item").forEach(row=>{
const qty=Number(row.querySelector(".quoteQty")?.value||0);const unit=Number(row.querySelector(".quoteUnit")?.value||0);const line=qtyunit;total+=line;
const el=row.querySelector(".quoteLineTotal");if(el)el.textContent=money(line);
});
const g=document.getElementById("quoteGrandTotal");if(g)g.textContent=money(total);
return total;
}
function collectQuote(){
const client=getClients().find(c=>c.id===val("quoteClient"));
const items=[...document.querySelectorAll(".quote-item")].map(r=>({desc.querySelector(".quoteDesc")?.value.trim()||"",qty(r.querySelector(".quoteQty")?.value||0),unit(r.querySelector(".quoteUnit")?.value||0)})).filter(x=>x.desc||x.qty||x.unit);
return {quoteNumber("quoteNumber"),date("quoteDate"),clientId?.id||"",client?.name||"",document?.document||"",phone?.phone||"",address?.address||"",systems("quoteSystems"),otherSystem("quoteOtherSystem"),description("quoteDescription"),items,validity("quoteValidity"),deadline("quoteDeadline"),payment("quotePayment"),notes("quoteNotes"),total()};
}
function newQuote(){
["quoteClient","quoteDocument","quotePhone","quoteAddress","quoteOtherSystem","quoteDescription","quoteDeadline","quotePayment","quoteNotes"].forEach(id=>set(id,""));
set("quoteNumber",nextQuoteNumber());set("quoteDate",today());set("quoteValidity","10");
document.querySelectorAll('#quoteSystems input[type="checkbox"]').forEach(x=>x.checked=false);
document.getElementById("quoteItems").innerHTML="";for(let i=0;i<3;i++)addQuoteItem();
updateQuoteTotals();
const saveBtn=document.getElementById("quoteSaveBtn");if(saveBtn)saveBtn.textContent="💾 Salvar orçamento";
window.currentQuoteNumber=val("quoteNumber");
window.scrollTo({top:0,behavior:"smooth"});toast("Novo orçamento criado");
}
function saveQuote(){
const d=collectQuote();
if(!d.client){toast("Selecione um cliente cadastrado");return false}
if(!d.items.length){toast("Adicione pelo menos um item ao orçamento");return false}
let arr=getQuotes();arr=arr.filter(x=>x.quoteNumber!==d.quoteNumber);arr.push(d);setQuotes(arr);window.currentQuoteNumber=d.quoteNumber;renderQuotes();toast("Orçamento salvo com sucesso");return true;
}
function renderQuotes(){
const box=document.getElementById("quotesList");if(!box)return;
const q=val("quoteSearch").toLowerCase().trim();
const arr=getQuotes().filter(x=>JSON.stringify(x).toLowerCase().includes(q)).sort((a,b)=>String(b.quoteNumber).localeCompare(String(a.quoteNumber)));
box.innerHTML=arr.length?arr.map(x=><div class="history-item quote-history-item"><div><b>${esc(x.quoteNumber)}</b><br>${esc(x.client||"Sem cliente")}<br><span class="small">${esc(x.date||"")} • ${esc((x.systems||[]).join(", "))} • <strong>${money(x.total)}</strong></span></div><div><button type="button" onclick="editQuote('${esc(x.quoteNumber)}')">✏️ Editar</button> <button type="button" class="ok" onclick="editQuote('${esc(x.quoteNumber)}');setTimeout(generateQuotePDF,150)">📄 PDF</button> <button type="button" class="danger" onclick="deleteQuote('${esc(x.quoteNumber)}')">🗑️ Excluir</button></div></div>).join(""):"Nenhum orçamento cadastrado.";
}
function editQuote(number){
const d=getQuotes().find(x=>x.quoteNumber===number);if(!d){toast("Orçamento não encontrado");return}
populateQuoteClientSelect();
set("quoteNumber",d.quoteNumber);set("quoteDate",d.date);set("quoteClient",d.clientId);selectClientForQuote();
set("quoteOtherSystem",d.otherSystem);set("quoteDescription",d.description);set("quoteValidity",d.validity);set("quoteDeadline",d.deadline);set("quotePayment",d.payment);set("quoteNotes",d.notes);
document.querySelectorAll('#quoteSystems input[type="checkbox"]').forEach(x=>x.checked=(d.systems||[]).includes(x.value));
const tbody=document.getElementById("quoteItems");tbody.innerHTML="";(d.items||[]).forEach(addQuoteItem);if(!d.items?.length)for(let i=0;i<3;i++)addQuoteItem();
updateQuoteTotals();window.currentQuoteNumber=d.quoteNumber;
const saveBtn=document.getElementById("quoteSaveBtn");if(saveBtn)saveBtn.textContent="💾 Atualizar orçamento";
showTab("quote");toast("Orçamento carregado para edição");window.scrollTo({top:0,behavior:"smooth"});
}
function deleteQuote(number){
const d=getQuotes().find(x=>x.quoteNumber===number);if(!d)return;
if(!confirm(Excluir o orçamento ${number} de ${d.client||"cliente"}?))return;
setQuotes(getQuotes().filter(x=>x.quoteNumber!==number));renderQuotes();toast("Orçamento excluído");
}
function generateQuotePDF(){
const d=collectQuote();
if(!d.client){toast("Selecione um cliente cadastrado");return}
if(!d.items.length){toast("Adicione pelo menos um item ao orçamento");return}
saveQuote();
const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:"mm",format:"a4"});let y=16;
doc.setFillColor(11,18,32);doc.rect(0,0,210,30,"F");doc.setTextColor(255);doc.setFontSize(17);doc.setFont(undefined,"bold");doc.text("FORTAL TECH",10,12);doc.setFontSize(9);doc.setFont(undefined,"normal");doc.text("SEGURANÇA ELETRÔNICA & ELÉTRICA",10,19);doc.text("ORÇAMENTO",154,15);doc.text(Nº ${d.quoteNumber},154,21);doc.setTextColor(0);y=39;
const sec=(title)=>{if(y>275){doc.addPage();y=15}doc.setFillColor(11,18,32);doc.setTextColor(255);doc.rect(10,y-5,190,7,"F");doc.setFontSize(10);doc.setFont(undefined,"bold");doc.text(title,12,y);doc.setTextColor(0);y+=8};
const field=(label,value,w=190)=>{doc.setFontSize(8);doc.setFont(undefined,"bold");doc.text(label,10,y);doc.setFont(undefined,"normal");const lines=doc.splitTextToSize(value||"—",w);doc.text(lines,10,y+4);y+=4+lines.length4.2};
sec("DADOS DO CLIENTE");field("Cliente / Condomínio",d.client);field("CNPJ/CPF",d.document);field("Endereço",d.address);field("Telefone",d.phone);field("Data do orçamento",d.date);
sec("SISTEMAS ENVOLVIDOS");field("Sistemas",d.systems.join(", ")+(d.otherSystem?" / "+d.otherSystem:""));
sec("DESCRIÇÃO DO SERVIÇO / ESCOPO");field("Descrição",d.description);
sec("ITENS DO ORÇAMENTO");
doc.setFontSize(8);doc.setFont(undefined,"bold");doc.text("Item / Descrição",10,y);doc.text("Qtd.",112,y);doc.text("Valor unit.",135,y);doc.text("Total",171,y);y+=5;doc.setFont(undefined,"normal");
d.items.forEach((it,i)=>{if(y>270){doc.addPage();y=15;doc.setFontSize(8)}const lineTotal=it.qtyit.unit;const descLines=doc.splitTextToSize(${i+1}. ${it.desc},96);doc.text(descLines,10,y);doc.text(String(it.qty),112,y);doc.text(money(it.unit),135,y);doc.text(money(lineTotal),171,y);y+=Math.max(5,descLines.length4);});
doc.setDrawColor(180);doc.line(10,y,200,y);y+=7;doc.setFontSize(12);doc.setFont(undefined,"bold");doc.text("TOTAL DO ORÇAMENTO",120,y);doc.text(money(d.total),171,y);y+=10;
sec("CONDIÇÕES DO ORÇAMENTO");field("Validade",${d.validity||"—"} dias);field("Prazo de execução",d.deadline);field("Forma de pagamento",d.payment);field("Observações / condições",d.notes);
doc.setFontSize(7);doc.setFont(undefined,"normal");doc.text("Orçamento emitido pelo sistema FORTAL TECH.",10,289);doc.save(ORCAMENTO-${d.quoteNumber}.pdf);toast("PDF do orçamento gerado");
}

function showTab(t){
document.getElementById("formTab").classList.toggle("hidden",t!=="form");
document.getElementById("clientsTab").classList.toggle("hidden",t!=="clients");
document.getElementById("historyTab").classList.toggle("hidden",t!=="history");
document.getElementById("quoteTab").classList.toggle("hidden",t!=="quote");
if(t==="history")renderHistory();
if(t==="clients"){renderClients();}
if(t==="form"){populateClientSelect();}
if(t==="quote"){populateQuoteClientSelect();renderQuotes();if(!val("quoteNumber"))newQuote();else updateQuoteTotals();}
}

function getClients(){
return JSON.parse(localStorage.getItem("clientsList")||"[]");
}
function setClients(arr){
localStorage.setItem("clientsList",JSON.stringify(arr));
}
function clearClientForm(){
["newClientName","newClientDocument","newClientAddress","newClientPhone","newClientResponsible","newClientEmail"].forEach(id=>set(id,""));
}
function saveClient(){
const name=val("newClientName").trim();
if(!name){toast("Informe o nome do cliente/condomínio");return}
const clients=getClients();
const id=crypto.randomUUID?crypto.randomUUID()(Date.now());
clients.push({
id,name,
document("newClientDocument"),
address("newClientAddress"),
phone("newClientPhone"),
responsible("newClientResponsible"),
email("newClientEmail")
});
setClients(clients);
clearClientForm();
renderClients();
populateClientSelect();
populateQuoteClientSelect();
toast("Cliente cadastrado com sucesso");
}
function editClient(id){
const c=getClients().find(x=>x.id===id); if(!c)return;
set("newClientName",c.name); set("newClientDocument",c.document); set("newClientAddress",c.address);
set("newClientPhone",c.phone); set("newClientResponsible",c.responsible); set("newClientEmail",c.email);
setClients(getClients().filter(x=>x.id!==id));
renderClients(); populateClientSelect(); populateQuoteClientSelect();
window.scrollTo({top:0,behavior:"smooth"});
toast("Cliente carregado para edição. Salve novamente.");
}
function deleteClient(id){
const c=getClients().find(x=>x.id===id); if(!c)return;
if(!confirm("Excluir o cliente ""+c.name+""?"))return;
setClients(getClients().filter(x=>x.id!==id));
renderClients(); populateClientSelect();
toast("Cliente excluído");
}
function renderClients(){
const q=val("clientSearch").toLowerCase();
const arr=getClients().filter(c=>JSON.stringify(c).toLowerCase().includes(q));
const el=document.getElementById("clientsList"); if(!el)return;
el.innerHTML=arr.length?arr.map(c=>`<div class="history-item">
<div><b>${esc(c.name)}</b><br><span class="small">${esc(c.document||"")} ${c.phone?"• "+esc(c.phone):""}<br>${esc(c.address||"")}</span></div>
<div><button type="button" onclick="editClient('${c.id}')">✏️ Editar</button>
<button type="button" class="danger" onclick="deleteClient('${c.id}')">Excluir</button></div>

  </div>`).join(""):"Nenhum cliente cadastrado.";
}
function populateClientSelect(){
  const el=document.getElementById("clientSelect"); if(!el)return;
  const current=el.value;
  const arr=getClients();
  el.innerHTML='<option value="">— Selecione um cliente cadastrado —</option>'+arr.map(c=>`<option value="${c.id}">${esc(c.name)}${c.document?" — "+esc(c.document):""}</option>`).join("");
  if(arr.some(c=>c.id===current))el.value=current;
}
function selectClientForOS(){
  const id=val("clientSelect"); if(!id)return;
  const c=getClients().find(x=>x.id===id); if(!c)return;
  set("client",c.name); set("document",c.document); set("address",c.address);
  set("phone",c.phone); set("responsible",c.responsible);
}

function loadOS(num){const d=JSON.parse(localStorage.getItem("osList")||"[]").find(x=>x.osNumber===num);if(!d)return;set("osNumber",d.osNumber);Object.keys(d).forEach(k=>{if(document.getElementById(k)&&typeof d[k]==="string")set(k,d[k])});for(const g of Object.keys(lists)){document.querySelectorAll(input[data-group="${g}"]).forEach(c=>c.checked=(d[g]||[]).includes(c.value))}document.querySelectorAll('#systems input').forEach(c=>c.checked=(d.systems||[]).includes(c.value));updateSystemChecklists();updateServiceTypeSection();document.getElementById("materials").innerHTML="";(d.materials||[]).forEach(addMaterial);window.currentPhotos=d.photos||[];renderPhotos();showTab("form");toast("OS carregada")}
document.getElementById("photoInput").addEventListener("change",async e=>{window.currentPhotos=window.currentPhotos||[];for(const f of e.target.files){const r=new FileReader();r.onload=()=>{window.currentPhotos.push(r.result);renderPhotos()};r.readAsDataURL(f)}});
function renderPhotos(){document.getElementById("photoGrid").innerHTML=(window.currentPhotos||[]).map((p,i)=><div class="photo-card"><img src="${p}"><button type="button" class="danger" onclick="currentPhotos.splice(${i},1);renderPhotos()">Excluir</button></div>).join("")}
function line(doc,label,value,x,y,w){doc.setFontSize(8);doc.setFont(undefined,"bold");doc.text(label,x,y);doc.setFont(undefined,"normal");let lines=doc.splitTextToSize(value||"—",w);doc.text(lines,x,y+4);return y+4+lines.length*3.8}
function section(doc,title,y){if(y>275){doc.addPage();y=15}doc.setFillColor(11,18,32);doc.setTextColor(255);doc.rect(10,y-5,190,7,"F");doc.setFontSize(10);doc.setFont(undefined,"bold");doc.text(title,12,y);doc.setTextColor(0);return y+7}
async function generatePDF(){
saveOS();const d=collect();const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:"mm",format:"a4"});let y=16;
doc.setFontSize(15);doc.setFont(undefined,"bold");doc.text("FORTAL TECH – MANUTENÇÃO PREVENTIVA E CORRETIVA",10,y);y+=8;doc.setFontSize(9);doc.setFont(undefined,"normal");doc.text(OS Nº ${d.osNumber}   Data: ${d.osDate}   Visita: ${d.visitDate}   Status: ${d.status},10,y);y+=7;
y=section(doc,"DADOS DO CLIENTE",y);y=line(doc,"Cliente/Condomínio",d.client,10,y,90);y=line(doc,"CNPJ/CPF",d.document,105,y-4,90);y=line(doc,"Endereço",d.address,10,y,120);y=line(doc,"Telefone",d.phone,135,y-4,55);y=line(doc,"Responsável",d.responsible,10,y,90);y=line(doc,"Técnico responsável",d.technician,105,y-4,90);y=line(doc,"Tipo / Prioridade",d.serviceType+" / "+d.priority,10,y,90);
y=section(doc,"SOLICITAÇÃO / MOTIVO",y+3);y=line(doc,"Descrição",d.request,10,y,190);y=line(doc,"Sistemas envolvidos",d.systems.join(", ")+(d.otherSystem?" / "+d.otherSystem:""),10,y+2,190);
const groups=[];
if(d.systems.includes("CFTV")) groups.push(["CFTV",d.cftvChecks]);
if(d.systems.includes("Controle de Acesso")) {groups.push(["CONTROLE DE ACESSO – EQUIPAMENTOS",d.accessEquip]);groups.push(["CONTROLE DE ACESSO – TESTES",d.accessTests]);}
if(d.systems.includes("Cerca Elétrica")) groups.push(["CERCA ELÉTRICA",d.fenceChecks]);
if(d.systems.includes("Sistema de Alarme")) {groups.push(["ALARME – CENTRAL",d.alarmCentral]);groups.push(["ALARME – SENSORES",d.alarmSensors]);groups.push(["ALARME – COMUNICAÇÃO",d.alarmComm]);}
if(d.systems.includes("Infraestrutura/Rede")) groups.push(["INFRAESTRUTURA / REDE / ALIMENTAÇÃO",d.infraChecks]);
if(d.systems.includes("Fonte/Nobreak")) groups.push(["FONTE/NOBREAK",d.sourceChecks]);
for(const [t,a] of groups){y=section(doc,t,y+3);y=line(doc,"Itens verificados",a.length?a.map(v=>"✓ "+v).join(" | "):"Nenhum item marcado",10,y,190);if(y>270){doc.addPage();y=15}}
if(d.systems.includes("Outro")) {y=section(doc,"OUTRO SISTEMA – "+(d.otherSystem||"Não informado"),y+3);y=line(doc,"Itens verificados",d.otherChecks,10,y,190);y=line(doc,"Irregularidades",d.otherIssues,10,y,190);y=line(doc,"Observações",d.otherObs,10,y,190);}
const pdfServiceBlocks={
"Manutenção Corretiva":()=>{y=section(doc,"MANUTENÇÃO CORRETIVA",y+3);for(const [l,k] of [["Problema relatado","problem"],["Diagnóstico técnico","diagnosis"],["Causa identificada","cause"],["Serviço executado","serviceDone"],["Equipamento/peça substituída","replaced"],["Teste após reparo","repairTest"]])y=line(doc,l,d[k],10,y,190);y=line(doc,"Resultado",d.repairResults.join(", "),10,y+2,190);},
"Manutenção Preventiva":()=>{y=section(doc,"MANUTENÇÃO PREVENTIVA",y+3);for(const [l,k] of [["Objetivo / serviço programado","preventiveObjective"],["Atividades preventivas realizadas","preventiveActivities"],["Condição encontrada","preventiveCondition"],["Recomendações","preventiveRecommendations"]])y=line(doc,l,d[k],10,y,190);y=line(doc,"Resultado",d.preventiveResults.join(", "),10,y+2,190);},
"Visita Técnica":()=>{y=section(doc,"VISITA TÉCNICA",y+3);for(const [l,k] of [["Motivo da visita","visitReason"],["Avaliação técnica","visitEvaluation"],["Constatações","visitFindings"],["Recomendações técnicas","visitRecommendations"]])y=line(doc,l,d[k],10,y,190);y=line(doc,"Resultado",d.visitResults.join(", "),10,y+2,190);},
"Retorno":()=>{y=section(doc,"RETORNO",y+3);y=line(doc,"Nº da OS anterior",d.returnPreviousOS,10,y,190);for(const [l,k] of [["Motivo do retorno","returnReason"],["Pendência / serviço anterior","returnPending"],["Ação realizada no retorno","returnAction"]])y=line(doc,l,d[k],10,y,190);y=line(doc,"Resultado",d.returnResults.join(", "),10,y+2,190);},
"Emergencial":()=>{y=section(doc,"ATENDIMENTO EMERGENCIAL",y+3);for(const [l,k] of [["Situação emergencial","emergencySituation"],["Impacto / risco","emergencyImpact"],["Ação imediata executada","emergencyAction"],["Equipamento/peça substituída","emergencyReplaced"],["Pendência após atendimento","emergencyPending"]])y=line(doc,l,d[k],10,y,190);y=line(doc,"Resultado",d.emergencyResults.join(", "),10,y+2,190);}
};
if(pdfServiceBlocks[d.serviceType]) pdfServiceBlocksd.serviceType;
y=section(doc,"MATERIAIS / PEÇAS",y+3);(d.materials||[]).forEach((m,i)=>{y=line(doc,${i+1}. ${m.desc},String(m.qty||""),10,y,190)});
y=section(doc,"PENDÊNCIAS / RECOMENDAÇÕES",y+3);y=line(doc,"Pendências",d.pending,10,y,190);y=line(doc,"Recomendações",d.recommendations,10,y);y=line(doc,"Orçamento adicional",d.extraQuote+" — "+d.quoteDescription,10,y);y=line(doc,"Prazo recomendado",d.deadline,10,y);
y=section(doc,"CONDIÇÃO FINAL",y+3);y=line(doc,"Condição",d.finalCondition.join(", "),10,y,190);y=line(doc,"Observações finais",d.finalObs,10,y);
if(y>220){doc.addPage();y=15}y=section(doc,"ACEITE DO SERVIÇO",y+4);y=line(doc,"Responsável pelo cliente",d.clientSignName+" — "+d.clientRole,10,y,90);y=line(doc,"Técnico responsável",d.techSignName,105,y-4,90);
if(d.clientSignature&&d.clientSignature.length>1000)doc.addImage(d.clientSignature,"PNG",10,y+2,80,35);if(d.techSignature&&d.techSignature.length>1000)doc.addImage(d.techSignature,"PNG",110,y+2,80,35);y+=42;
y=line(doc,"Data do aceite",d.clientSignDate,10,y,90);y=line(doc,"Data do técnico",d.techSignDate,105,y-4,90);y=section(doc,"OBSERVAÇÃO",y+4);y=line(doc,"",d.generalNote,10,y,190);y=line(doc,"OS encerrada em",d.closedDate+" às "+d.closedTime,10,y+2,190);
doc.setFontSize(7);doc.text("Documento gerado pelo sistema de FORTAL TECH.",10,289);doc.save(OS-${d.osNumber}.pdf);toast("PDF gerado")}
populate();
document.querySelectorAll("#systems input[data-system]").forEach(cb=>cb.addEventListener("change",updateSystemChecklists));
document.getElementById("serviceType").addEventListener("change",updateServiceTypeSection);
setupCanvas("clientCanvas");setupCanvas("techCanvas");newOS();updateSystemChecklists();updateServiceTypeSection();populateQuoteClientSelect();newQuote();



// ================= PWA / INSTALAÇÃO =================
let deferredInstallPrompt = null;

function isStandalone() {
return window.matchMedia("(display-mode: standalone)").matches ||
window.navigator.standalone === true;
}

function installButton() {
return document.getElementById("installBtn");
}

function showInstallButton(show) {
const btn = installButton();
if (!btn) return;
btn.style.display = show ? "inline-block" : "none";
}

window.addEventListener("beforeinstallprompt", (event) => {
// Chrome só dispara este evento quando decidiu que a PWA pode ser
// instalada pelo prompt programático.
event.preventDefault();
deferredInstallPrompt = event;
showInstallButton(true);
console.log("PWA: prompt de instalação disponível.");
});

window.addEventListener("appinstalled", () => {
deferredInstallPrompt = null;
showInstallButton(false);
if (typeof toast === "function") toast("FORTAL TECH instalada!");
});

async function installApp() {
if (deferredInstallPrompt) {
deferredInstallPrompt.prompt();
const result = await deferredInstallPrompt.userChoice;
deferredInstallPrompt = null;

if (result && result.outcome === "accepted") {
  showInstallButton(false);
}
return;

}

// O Chrome não fornece um método JavaScript para obrigar o prompt.
// Quando o evento não está disponível, mostramos o caminho nativo.
alert(
"O Chrome ainda não liberou o botão automático nesta visita.\n\n" +
"Faça assim no Chrome Android:\n\n" +
"1. Toque nos três pontos ⋮\n" +
"2. Escolha 'Instalar aplicativo' (ou 'Adicionar à tela inicial')\n" +
"3. Toque em 'Instalar'\n\n" +
"Se aparecer 'Instalar aplicativo', será instalado como PWA."
);
}

async function registerPWA() {
if (!("serviceWorker" in navigator)) return;

try {
const base = "/Controle-de-Atividade/";
const regs = await navigator.serviceWorker.getRegistrations();

// Remove apenas registros antigos do mesmo projeto.
for (const reg of regs) {
  if (reg.scope.includes(base)) {
    await reg.unregister();
  }
}

const reg = await navigator.serviceWorker.register(base + "sw.js", {
  scope: base,
  updateViaCache: "none"
});

await reg.update();
await navigator.serviceWorker.ready;
console.log("PWA Service Worker ativo:", reg.scope);

} catch (error) {
console.error("PWA Service Worker:", error);
}
}

async function diagnosePWA() {
const results = [];
const add = (name, ok, detail) =>
results.push((ok ? "✅ " : "❌ ") + name + ": " + detail);

add("HTTPS", location.protocol === "https:", location.protocol);

const manifestLink = document.querySelector('link[rel="manifest"]');
add("Manifest link", !!manifestLink,
manifestLink?.getAttribute("href") || "não encontrado");

let manifest = null;
try {
const r = await fetch("/Controle-de-Atividade/manifest.json", {cache:"no-store"});
manifest = r.ok ? await r.json() : null;
add("Manifest publicado", r.ok, r.status + " " + r.statusText);
} catch {
add("Manifest publicado", false, "erro ao carregar");
}

if (manifest) {
add("display standalone", manifest.display === "standalone", manifest.display || "ausente");
add("start_url", manifest.start_url === "/Controle-de-Atividade/",
manifest.start_url || "ausente");
add("scope", manifest.scope === "/Controle-de-Atividade/",
manifest.scope || "ausente");
add("ícone 192", manifest.icons?.some(i => i.sizes === "192x192"), "verificado");
add("ícone 512", manifest.icons?.some(i => i.sizes === "512x512"), "verificado");
}

try {
const regs = await navigator.serviceWorker.getRegistrations();
const reg = regs.find(r => r.scope.includes("/Controle-de-Atividade/"));
add("Service Worker registrado", !!reg, reg ? reg.scope : "não encontrado");
add("Service Worker controlando", !!navigator.serviceWorker.controller,
navigator.serviceWorker.controller ? "sim" : "não");
} catch {
add("Service Worker", false, "erro ao consultar");
}

add("beforeinstallprompt", !!deferredInstallPrompt,
deferredInstallPrompt ? "disponível" : "não fornecido pelo Chrome");
add("Modo aplicativo", isStandalone(),
isStandalone() ? "standalone" : "navegador");

alert("DIAGNÓSTICO PWA\n\n" + results.join("\n"));
}

window.addEventListener("load", () => {
registerPWA();
if (isStandalone()) showInstallButton(false);
});
