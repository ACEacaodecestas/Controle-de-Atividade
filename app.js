
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
for(const [id,arr] of Object.entries(lists)){document.getElementById(id).innerHTML=arr.map((x,i)=>`<label><input type="checkbox" data-group="${id}" value="${esc(x)}"> ${esc(x)}</label>`).join("")}
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
return [...document.querySelectorAll("#systems input[data-system]:checked")].map(x=>x.value);
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
function esc(s){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}
function val(id){return document.getElementById(id)?.value||""}
function set(id,v){if(document.getElementById(id))document.getElementById(id).value=v||""}
function checks(group){return [...document.querySelectorAll(`input[data-group="${group}"]:checked`)].map(x=>x.value)}
function today(){return new Date().toISOString().slice(0,10)}
function nextNumber(){let n=Number(localStorage.getItem("osNext")||"1");localStorage.setItem("osNext",n+1);return String(n).padStart(6,"0")}
function newOS(){
document.getElementById("osForm").reset();populateClientSelect();set("osNumber",nextNumber());set("osDate",today());set("visitDate",today());set("clientSignDate",today());set("techSignDate",today());set("closedDate",today());document.getElementById("materials").innerHTML="";for(let i=0;i<3;i++)addMaterial();clearCanvas("clientCanvas");clearCanvas("techCanvas");document.getElementById("photoGrid").innerHTML="";window.scrollTo({top:0,behavior:"smooth"});toast("Nova OS criada")}
function addMaterial(data={}){const d=document.createElement("div");d.className="grid material";d.style.marginBottom="8px";d.innerHTML=`<div class="col-8"><input class="matDesc" placeholder="Descrição" value="${esc(data.desc||"")}"></div><div class="col-3"><input class="matQty" type="number" min="0" placeholder="Quantidade" value="${data.qty||""}"></div><div class="col-1"><button type="button" class="danger" onclick="this.parentElement.parentElement.remove()">✕</button></div>`;document.getElementById("materials").appendChild(d)}
function setupCanvas(id){const c=document.getElementById(id),ctx=c.getContext("2d");let drawing=false,last={x:0,y:0};function pos(e){const r=c.getBoundingClientRect();const p=e.touches?e.touches[0]:e;return{x:(p.clientX-r.left)*c.width/r.width,y:(p.clientY-r.top)*c.height/r.height}}function down(e){drawing=true;last=pos(e);e.preventDefault()}function move(e){if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle="#111827";ctx.lineWidth=2.5;ctx.lineCap="round";ctx.stroke();last=p;e.preventDefault()}function up(){drawing=false}c.addEventListener("mousedown",down);c.addEventListener("mousemove",move);window.addEventListener("mouseup",up);c.addEventListener("touchstart",down,{passive:false});c.addEventListener("touchmove",move,{passive:false});c.addEventListener("touchend",up);resizeCanvas(c,ctx)}
function resizeCanvas(c,ctx){const r=c.getBoundingClientRect(),ratio=Math.max(devicePixelRatio||1,1);c.width=r.width*ratio;c.height=180*ratio;ctx.scale(ratio,ratio)}
function clearCanvas(id){const c=document.getElementById(id);if(!c)return;const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height)}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.style.display="block";setTimeout(()=>e.style.display="none",1800)}
function collect(){
const materials=[...document.querySelectorAll(".material")].map(r=>({desc:r.querySelector(".matDesc").value,qty:r.querySelector(".matQty").value})).filter(x=>x.desc||x.qty);
return {osNumber:val("osNumber"),osDate:val("osDate"),visitDate:val("visitDate"),status:val("status"),serviceType:val("serviceType"),priority:val("priority"),client:val("client"),document:val("document"),address:val("address"),phone:val("phone"),responsible:val("responsible"),technician:val("technician"),arrival:val("arrival"),departure:val("departure"),request:val("request"),systems:checks("systems"),otherSystem:val("otherSystem"),cameraQty:val("cameraQty"),cameraIssues:val("cameraIssues"),cftvObs:val("cftvObs"),accessFault:val("accessFault"),accessObs:val("accessObs"),fenceIssues:val("fenceIssues"),fenceObs:val("fenceObs"),alarmIssues:val("alarmIssues"),alarmObs:val("alarmObs"),infraIssues:val("infraIssues"),problem:val("problem"),diagnosis:val("diagnosis"),cause:val("cause"),serviceDone:val("serviceDone"),replaced:val("replaced"),repairTest:val("repairTest"),repairResults:checks("repairResults"),
preventiveObjective:val("preventiveObjective"),preventiveActivities:val("preventiveActivities"),preventiveCondition:val("preventiveCondition"),preventiveRecommendations:val("preventiveRecommendations"),preventiveResults:checks("preventiveResults"),
visitReason:val("visitReason"),visitEvaluation:val("visitEvaluation"),visitFindings:val("visitFindings"),visitRecommendations:val("visitRecommendations"),visitResults:checks("visitResults"),
returnPreviousOS:val("returnPreviousOS"),returnReason:val("returnReason"),returnPending:val("returnPending"),returnAction:val("returnAction"),returnResults:checks("returnResults"),
emergencySituation:val("emergencySituation"),emergencyImpact:val("emergencyImpact"),emergencyAction:val("emergencyAction"),emergencyReplaced:val("emergencyReplaced"),emergencyResults:checks("emergencyResults"),emergencyPending:val("emergencyPending"),
materials,photosBefore:val("photosBefore"),photosAfter:val("photosAfter"),photos:window.currentPhotos||[],pending:val("pending"),recommendations:val("recommendations"),extraQuote:val("extraQuote"),deadline:val("deadline"),quoteDescription:val("quoteDescription"),finalCondition:checks("finalCondition"),finalObs:val("finalObs"),sourceChecks:checks("sourceChecks"),sourceFault:val("sourceFault"),sourceObs:val("sourceObs"),otherChecks:val("otherChecks"),otherIssues:val("otherIssues"),otherObs:val("otherObs"),clientSignName:val("clientSignName"),clientRole:val("clientRole"),clientSignDate:val("clientSignDate"),clientSignature:document.getElementById("clientCanvas").toDataURL("image/png"),techSignName:val("techSignName"),techSignDate:val("techSignDate"),techSignature:document.getElementById("techCanvas").toDataURL("image/png"),generalNote:val("generalNote"),closedDate:val("closedDate"),closedTime:val("closedTime"),cftvChecks:checks("cftvChecks"),accessEquip:checks("accessEquip"),accessTests:checks("accessTests"),fenceChecks:checks("fenceChecks"),alarmCentral:checks("alarmCentral"),alarmSensors:checks("alarmSensors"),alarmComm:checks("alarmComm"),infraChecks:checks("infraChecks")};
return {osNumber:val("osNumber"),osDate:val("osDate"),visitDate:val("visitDate"),status:val("status"),serviceType:val("serviceType"),priority:val("priority"),client:val("client"),document:val("document"),address:val("address"),phone:val("phone"),responsible:val("responsible"),technician:val("technician"),arrival:val("arrival"),departure:val("departure"),request:val("request"),systems:[...document.querySelectorAll("#systems input:checked")].map(x=>x.value),otherSystem:val("otherSystem"),cameraQty:val("cameraQty"),cameraIssues:val("cameraIssues"),cftvObs:val("cftvObs"),accessFault:val("accessFault"),accessObs:val("accessObs"),fenceIssues:val("fenceIssues"),fenceObs:val("fenceObs"),alarmIssues:val("alarmIssues"),alarmObs:val("alarmObs"),infraIssues:val("infraIssues"),problem:val("problem"),diagnosis:val("diagnosis"),cause:val("cause"),serviceDone:val("serviceDone"),replaced:val("replaced"),repairTest:val("repairTest"),repairResults:checks("repairResults"),
preventiveObjective:val("preventiveObjective"),preventiveActivities:val("preventiveActivities"),preventiveCondition:val("preventiveCondition"),preventiveRecommendations:val("preventiveRecommendations"),preventiveResults:checks("preventiveResults"),
visitReason:val("visitReason"),visitEvaluation:val("visitEvaluation"),visitFindings:val("visitFindings"),visitRecommendations:val("visitRecommendations"),visitResults:checks("visitResults"),
returnPreviousOS:val("returnPreviousOS"),returnReason:val("returnReason"),returnPending:val("returnPending"),returnAction:val("returnAction"),returnResults:checks("returnResults"),
emergencySituation:val("emergencySituation"),emergencyImpact:val("emergencyImpact"),emergencyAction:val("emergencyAction"),emergencyReplaced:val("emergencyReplaced"),emergencyResults:checks("emergencyResults"),emergencyPending:val("emergencyPending"),
materials,photosBefore:val("photosBefore"),photosAfter:val("photosAfter"),photos:window.currentPhotos||[],pending:val("pending"),recommendations:val("recommendations"),extraQuote:val("extraQuote"),deadline:val("deadline"),quoteDescription:val("quoteDescription"),finalCondition:checks("finalCondition"),finalObs:val("finalObs"),sourceChecks:checks("sourceChecks"),sourceFault:val("sourceFault"),sourceObs:val("sourceObs"),otherChecks:val("otherChecks"),otherIssues:val("otherIssues"),otherObs:val("otherObs"),clientSignName:val("clientSignName"),clientRole:val("clientRole"),clientSignDate:val("clientSignDate"),clientSignature:document.getElementById("clientCanvas").toDataURL("image/png"),techSignName:val("techSignName"),techSignDate:val("techSignDate"),techSignature:document.getElementById("techCanvas").toDataURL("image/png"),generalNote:val("generalNote"),closedDate:val("closedDate"),closedTime:val("closedTime"),cftvChecks:checks("cftvChecks"),accessEquip:checks("accessEquip"),accessTests:checks("accessTests"),fenceChecks:checks("fenceChecks"),alarmCentral:checks("alarmCentral"),alarmSensors:checks("alarmSensors"),alarmComm:checks("alarmComm"),infraChecks:checks("infraChecks")};
}
function saveOS(){
const d=collect();let arr=JSON.parse(localStorage.getItem("osList")||"[]");arr=arr.filter(x=>x.osNumber!==d.osNumber);arr.push(d);localStorage.setItem("osList",JSON.stringify(arr));toast("OS salva com sucesso")}
function renderHistory(){
const q=val("searchHistory").toLowerCase();const arr=JSON.parse(localStorage.getItem("osList")||"[]").filter(x=>JSON.stringify(x).toLowerCase().includes(q)).sort((a,b)=>b.osNumber.localeCompare(a.osNumber));document.getElementById("history").innerHTML=arr.length?arr.map(x=>`<div class="history-item"><div><b>OS ${x.osNumber}</b><br>${esc(x.client||"Sem cliente")}<br><span class="small">${x.osDate||""} • ${esc(x.status||"")}</span></div><div><button onclick="loadOS('${x.osNumber}')">Abrir</button> <button class="ok" onclick="loadOS('${x.osNumber}');setTimeout(generatePDF,300)">PDF</button></div></div>`).join(""):"Nenhuma OS encontrada."}
function showTab(t){
document.getElementById("formTab").classList.toggle("hidden",t!=="form");
document.getElementById("clientsTab").classList.toggle("hidden",t!=="clients");
document.getElementById("historyTab").classList.toggle("hidden",t!=="history");
if(t==="history")renderHistory();
if(t==="clients")renderClients();
if(t==="form")populateClientSelect();
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
  const id=crypto.randomUUID?crypto.randomUUID():String(Date.now());
  clients.push({
    id,name,
    document:val("newClientDocument"),
    address:val("newClientAddress"),
    phone:val("newClientPhone"),
    responsible:val("newClientResponsible"),
    email:val("newClientEmail")
  });
  setClients(clients);
  clearClientForm();
  renderClients();
  populateClientSelect();
  toast("Cliente cadastrado com sucesso");
}
function editClient(id){
  const c=getClients().find(x=>x.id===id); if(!c)return;
  set("newClientName",c.name); set("newClientDocument",c.document); set("newClientAddress",c.address);
  set("newClientPhone",c.phone); set("newClientResponsible",c.responsible); set("newClientEmail",c.email);
  setClients(getClients().filter(x=>x.id!==id));
  renderClients(); populateClientSelect();
  window.scrollTo({top:0,behavior:"smooth"});
  toast("Cliente carregado para edição. Salve novamente.");
}
function deleteClient(id){
  const c=getClients().find(x=>x.id===id); if(!c)return;
  if(!confirm("Excluir o cliente \""+c.name+"\"?"))return;
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

function loadOS(num){const d=JSON.parse(localStorage.getItem("osList")||"[]").find(x=>x.osNumber===num);if(!d)return;set("osNumber",d.osNumber);Object.keys(d).forEach(k=>{if(document.getElementById(k)&&typeof d[k]==="string")set(k,d[k])});for(const g of Object.keys(lists)){document.querySelectorAll(`input[data-group="${g}"]`).forEach(c=>c.checked=(d[g]||[]).includes(c.value))}document.querySelectorAll('#systems input').forEach(c=>c.checked=(d.systems||[]).includes(c.value));updateSystemChecklists();updateServiceTypeSection();document.getElementById("materials").innerHTML="";(d.materials||[]).forEach(addMaterial);window.currentPhotos=d.photos||[];renderPhotos();showTab("form");toast("OS carregada")}
document.getElementById("photoInput").addEventListener("change",async e=>{window.currentPhotos=window.currentPhotos||[];for(const f of e.target.files){const r=new FileReader();r.onload=()=>{window.currentPhotos.push(r.result);renderPhotos()};r.readAsDataURL(f)}});
function renderPhotos(){document.getElementById("photoGrid").innerHTML=(window.currentPhotos||[]).map((p,i)=>`<div class="photo-card"><img src="${p}"><button type="button" class="danger" onclick="currentPhotos.splice(${i},1);renderPhotos()">Excluir</button></div>`).join("")}
function line(doc,label,value,x,y,w){doc.setFontSize(8);doc.setFont(undefined,"bold");doc.text(label,x,y);doc.setFont(undefined,"normal");let lines=doc.splitTextToSize(value||"—",w);doc.text(lines,x,y+4);return y+4+lines.length*3.8}
function section(doc,title,y){if(y>275){doc.addPage();y=15}doc.setFillColor(11,18,32);doc.setTextColor(255);doc.rect(10,y-5,190,7,"F");doc.setFontSize(10);doc.setFont(undefined,"bold");doc.text(title,12,y);doc.setTextColor(0);return y+7}
async function generatePDF(){
saveOS();const d=collect();const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:"mm",format:"a4"});let y=16;
doc.setFontSize(15);doc.setFont(undefined,"bold");doc.text("ORDEM DE SERVIÇO – MANUTENÇÃO PREVENTIVA E CORRETIVA",10,y);y+=8;doc.setFontSize(9);doc.setFont(undefined,"normal");doc.text(`OS Nº ${d.osNumber}   Data: ${d.osDate}   Visita: ${d.visitDate}   Status: ${d.status}`,10,y);y+=7;
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
if(pdfServiceBlocks[d.serviceType]) pdfServiceBlocks[d.serviceType]();
y=section(doc,"MATERIAIS / PEÇAS",y+3);(d.materials||[]).forEach((m,i)=>{y=line(doc,`${i+1}. ${m.desc}`,String(m.qty||""),10,y,190)});
y=section(doc,"PENDÊNCIAS / RECOMENDAÇÕES",y+3);y=line(doc,"Pendências",d.pending,10,y,190);y=line(doc,"Recomendações",d.recommendations,10,y);y=line(doc,"Orçamento adicional",d.extraQuote+" — "+d.quoteDescription,10,y);y=line(doc,"Prazo recomendado",d.deadline,10,y);
y=section(doc,"CONDIÇÃO FINAL",y+3);y=line(doc,"Condição",d.finalCondition.join(", "),10,y,190);y=line(doc,"Observações finais",d.finalObs,10,y);
if(y>220){doc.addPage();y=15}y=section(doc,"ACEITE DO SERVIÇO",y+4);y=line(doc,"Responsável pelo cliente",d.clientSignName+" — "+d.clientRole,10,y,90);y=line(doc,"Técnico responsável",d.techSignName,105,y-4,90);
if(d.clientSignature&&d.clientSignature.length>1000)doc.addImage(d.clientSignature,"PNG",10,y+2,80,35);if(d.techSignature&&d.techSignature.length>1000)doc.addImage(d.techSignature,"PNG",110,y+2,80,35);y+=42;
y=line(doc,"Data do aceite",d.clientSignDate,10,y,90);y=line(doc,"Data do técnico",d.techSignDate,105,y-4,90);y=section(doc,"OBSERVAÇÃO",y+4);y=line(doc,"",d.generalNote,10,y,190);y=line(doc,"OS encerrada em",d.closedDate+" às "+d.closedTime,10,y+2,190);
doc.setFontSize(7);doc.text("Documento gerado pelo sistema de Ordem de Serviço.",10,289);doc.save(`OS-${d.osNumber}.pdf`);toast("PDF gerado")}
populate();
document.querySelectorAll("#systems input[data-system]").forEach(cb=>cb.addEventListener("change",updateSystemChecklists));
document.getElementById("serviceType").addEventListener("change",updateServiceTypeSection);
setupCanvas("clientCanvas");setupCanvas("techCanvas");newOS();updateSystemChecklists();updateServiceTypeSection();


// ================= PWA / INSTALAÇÃO =================
let deferredInstallPrompt = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err =>
      console.warn("Service Worker:", err)
    );
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "inline-block";
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "none";
  if (typeof toast === "function") toast("Aplicativo instalado com sucesso!");
});

async function installApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const result = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (result && result.outcome === "accepted" && typeof toast === "function") {
      toast("Instalação iniciada!");
    }
    return;
  }

  const isAndroid = /Android/i.test(navigator.userAgent);
  if (isAndroid) {
    alert(
      "Para instalar no Android:\\n\\n" +
      "1. Toque nos três pontos ⋮ do Chrome.\\n" +
      "2. Escolha 'Instalar aplicativo' ou 'Adicionar à tela inicial'.\\n" +
      "3. Confirme a instalação."
    );
  } else {
    alert(
      "O navegador não disponibilizou a instalação automática.\\n\\n" +
      "No Chrome/Edge, procure o ícone de instalação na barra de endereço ou use o menu do navegador."
    );
  }
}
