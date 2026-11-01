(() => {
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const menuButton=$("#menuButton"),nav=$("#navigation");
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
$$("#navigation a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
$$(".tool-tab").forEach(tab=>tab.addEventListener("click",()=>{
  $$(".tool-tab").forEach(t=>{const on=t===tab;t.classList.toggle("active",on);t.setAttribute("aria-selected",String(on));});
  $$(".tool-panel").forEach(p=>{const on=p.id==="panel-"+tab.dataset.tool;p.hidden=!on;p.classList.toggle("active",on);});
}));
const chords={
Em:{name:"Mi menor",f:[0,2,2,0,0,0],d:[0,2,3,0,0,0],desc:"Use os dedos 2 e 3 nas cordas Lá e Ré. Toque as seis cordas."},
G:{name:"Sol maior",f:[3,2,0,0,0,3],d:[2,1,0,0,0,3],desc:"Mantenha os dedos arqueados para liberar as cordas soltas."},
C:{name:"Dó maior",f:[-1,3,2,0,1,0],d:[0,3,2,0,1,0],desc:"Comece pela corda Lá. Evite tocar a 6ª corda."},
D:{name:"Ré maior",f:[-1,-1,0,2,3,2],d:[0,0,0,1,3,2],desc:"Toque a partir da 4ª corda e mantenha a forma compacta."},
Am:{name:"Lá menor",f:[-1,0,2,2,1,0],d:[0,0,2,3,1,0],desc:"Comece pela corda Lá. Confira se cada nota soa limpa."},
E:{name:"Mi maior",f:[0,2,2,1,0,0],d:[0,2,3,1,0,0],desc:"Toque todas as cordas e confira se a 3ª corda soa com clareza."},
A:{name:"Lá maior",f:[-1,0,2,2,2,0],d:[0,0,1,2,3,0],desc:"Toque a partir da corda Lá e mantenha os três dedos próximos."},
Dm:{name:"Ré menor",f:[-1,-1,0,2,3,1],d:[0,0,0,2,3,1],desc:"Comece na 4ª corda. O indicador pressiona a 1ª casa da corda Mi aguda."},
A7:{name:"Lá com sétima",f:[-1,0,2,0,2,0],d:[0,0,2,0,3,0],desc:"Toque da 5ª corda. As cordas Ré, Si e Mi aguda ficam soltas."},
D7:{name:"Ré com sétima",f:[-1,-1,0,2,1,2],d:[0,0,0,2,1,3],desc:"Comece pela 4ª corda. Faça as notas soarem separadas e limpas."},
E7:{name:"Mi com sétima",f:[0,2,0,1,0,0],d:[0,2,0,1,0,0],desc:"Toque as seis cordas. É uma variação muito usada em acompanhamento."},
G7:{name:"Sol com sétima",f:[3,2,0,0,0,1],d:[3,2,0,0,0,1],desc:"Mantenha as cordas Ré, Sol e Si soltas e pressione a 1ª casa da Mi aguda."},
Cmaj7:{name:"Dó com sétima maior",f:[-1,3,2,0,0,0],d:[0,3,2,0,0,0],desc:"Comece pela 5ª corda. As três cordas agudas ficam soltas."},
B7:{name:"Si com sétima",f:[-1,2,1,2,0,2],d:[0,2,1,3,0,4],desc:"Comece na 5ª corda. Confira cada nota lentamente para evitar cordas abafadas."}
};
function drawChord(key){
 const c=chords[key];if(!c)return;$("#chordTitle").textContent=key;$("#chordSubtitle").textContent=c.name;$("#chordDescription").textContent=c.desc;
 const x0=36,y0=34,dx=43,dy=34;let svg='<svg viewBox="0 0 300 238" role="img" aria-label="Diagrama do acorde '+key+', seis cordas; Mi, Lá, Ré, Sol, Si, Mi da esquerda para a direita">';
 for(let s=0;s<6;s++){const x=x0+s*dx,f=c.f[s];svg+='<line x1="'+x+'" y1="'+y0+'" x2="'+x+'" y2="'+(y0+4*dy)+'" stroke="#d2dceb" stroke-width="'+((s===0||s===5)?2:1.3)+'"/>';
 if(f<=0)svg+='<text x="'+x+'" y="21" fill="#4da3ff" font-size="17" text-anchor="middle">'+(f===0?"○":"×")+'</text>';
 else{const y=y0+(f-.5)*dy;svg+='<circle cx="'+x+'" cy="'+y+'" r="10" fill="#4da3ff"/><text x="'+x+'" y="'+(y+3.5)+'" text-anchor="middle" fill="#080c14" font-size="10" font-weight="700">'+c.d[s]+'</text>';}}
 for(let f=0;f<=4;f++){const y=y0+f*dy;svg+='<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+5*dx)+'" y2="'+y+'" stroke="'+(f===0?"#e6f0fb":"#31577e")+'" stroke-width="'+(f===0?4:1.2)+'"/>';}
 const stringNames=["E","A","D","G","B","E"];
 for(let s=0;s<6;s++){const x=x0+s*dx;svg+='<text x="'+x+'" y="189" text-anchor="middle" fill="#8ec5ff" font-size="11" font-weight="700">'+stringNames[s]+'</text><text x="'+x+'" y="203" text-anchor="middle" fill="#91a4bc" font-size="8">'+(6-s)+'</text>';}
 svg+='<text x="143" y="229" text-anchor="middle" fill="#91a4bc" font-size="9" font-family="monospace">CASAS 1 — 4</text></svg>';$("#chordDiagram").innerHTML=svg;
}
$("#chordSelect").addEventListener("change",e=>drawChord(e.target.value));drawChord("Em");
let audio=null,metroLoop=null,metroOn=false,beat=0,nextAt=0,bpm=80;const slider=$("#bpmSlider");
function setBpm(v){bpm=Math.max(40,Math.min(220,Number(v)||80));$("#bpmValue").textContent=bpm;slider.value=bpm;$$(".presets button").forEach(b=>b.classList.toggle("selected",Number(b.dataset.bpm)===bpm));}
slider.addEventListener("input",e=>setBpm(e.target.value));$$(".presets button").forEach(b=>b.addEventListener("click",()=>setBpm(b.dataset.bpm)));
function tone(at,accent){const osc=audio.createOscillator(),gain=audio.createGain();osc.type="sine";osc.frequency.value=accent?1100:760;gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(accent?.2:.12,at+.004);gain.gain.exponentialRampToValueAtTime(.0001,at+.055);osc.connect(gain).connect(audio.destination);osc.start(at);osc.stop(at+.06);}
function schedule(){if(!metroOn)return;while(nextAt<audio.currentTime+.12){const n=beat;tone(nextAt,n===0);const delay=Math.max(0,(nextAt-audio.currentTime)*1000);setTimeout(()=>{if(!metroOn)return;$("#beatNumber").textContent=n+1;$("#beat").classList.add("flash");setTimeout(()=>$("#beat").classList.remove("flash"),90);},delay);beat=(beat+1)%4;nextAt+=60/bpm;}}
function stopMetro(){metroOn=false;clearInterval(metroLoop);metroLoop=null;$("#metroToggle").textContent="▶ INICIAR METRÔNOMO";$("#beat").classList.remove("flash");}
$("#metroToggle").addEventListener("click",async()=>{if(metroOn){stopMetro();return;}try{const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)throw Error("Áudio não suportado neste navegador.");audio||(audio=new Ctx());await audio.resume();beat=0;nextAt=audio.currentTime+.05;metroOn=true;$("#metroToggle").textContent="Ⅱ PAUSAR METRÔNOMO";schedule();metroLoop=setInterval(schedule,25);}catch(e){$("#metroStatus").textContent=e.message;}});
let stream=null,micAudio=null,analyser=null,frame=null;const notes=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
function estimate(buffer,rate){let energy=0;for(let i=0;i<buffer.length;i++)energy+=buffer[i]*buffer[i];if(Math.sqrt(energy/buffer.length)<.012)return null;const min=Math.floor(rate/1000),max=Math.min(Math.floor(rate/65),buffer.length-1);let best=-1,bestCorr=0,last=1;
for(let lag=min;lag<=max;lag++){let corr=0;for(let i=0;i<buffer.length-lag;i++)corr+=buffer[i]*buffer[i+lag];corr/=buffer.length-lag;if(corr>.9&&corr>last){if(corr>bestCorr){bestCorr=corr;best=lag;}}else if(best!==-1)break;last=corr;}return best<0?null:rate/best;}
function listen(){if(!analyser||!micAudio)return;const buf=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(buf);const hz=estimate(buf,micAudio.sampleRate);
if(hz){const midi=Math.round(69+12*Math.log2(hz/440)),name=notes[(midi%12+12)%12],octave=Math.floor(midi/12)-1,ref=440*Math.pow(2,(midi-69)/12),cents=1200*Math.log2(hz/ref);$("#tunerNote").textContent=name+octave;$("#tunerFrequency").textContent=hz.toFixed(1)+" Hz · "+(cents>0?"+":"")+cents.toFixed(0)+" cents";$("#tunerNeedle").style.transform="rotate("+Math.max(-42,Math.min(42,cents*1.4))+"deg)";$("#tunerStatus").textContent=Math.abs(cents)<5?"Afinada! Nota estável.":cents<0?"Nota baixa — aumente a tensão com cuidado.":"Nota alta — alivie a tensão com cuidado.";}
else $("#tunerStatus").textContent="Escutando… toque uma corda isolada e deixe a nota soar.";frame=requestAnimationFrame(listen);}
async function stopTuner(){if(frame)cancelAnimationFrame(frame);frame=null;if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(micAudio&&micAudio.state!=="closed")await micAudio.close();micAudio=null;analyser=null;$("#tunerToggle").textContent="⌁ ATIVAR MICROFONE";$("#tunerNote").textContent="—";$("#tunerFrequency").textContent="Aguardando áudio";}
$("#tunerToggle").addEventListener("click",async()=>{if(stream){await stopTuner();$("#tunerStatus").textContent="Microfone desativado.";return;}try{if(!navigator.mediaDevices?.getUserMedia)throw Error("O microfone exige HTTPS e um navegador compatível.");stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});const Ctx=window.AudioContext||window.webkitAudioContext;micAudio=new Ctx();const source=micAudio.createMediaStreamSource(stream);analyser=micAudio.createAnalyser();analyser.fftSize=4096;source.connect(analyser);$("#tunerToggle").textContent="Ⅱ DESATIVAR MICROFONE";$("#tunerStatus").textContent="Microfone ativo. Toque uma corda por vez.";listen();}catch(e){await stopTuner();$("#tunerStatus").textContent=e.name==="NotAllowedError"?"Permissão negada. Libere o microfone nas configurações do navegador.":e.message;}});
window.addEventListener("pagehide",()=>{stopMetro();if(stream)stream.getTracks().forEach(t=>t.stop());});
const today=new Date(),dayStamp=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");const storageKey="guitarlab-routine-v1-"+dayStamp,checks=$(".tasks input");
function updateProgress(){const done=checks.filter(c=>c.checked).length,p=Math.round(done/checks.length*100);$("#progressText").textContent=done+" de "+checks.length+" concluídas";$("#progressPercent").textContent=p+"%";$("#progressBar").style.width=p+"%";try{localStorage.setItem(storageKey,JSON.stringify(checks.filter(c=>c.checked).map(c=>c.dataset.task)));}catch(e){}}
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"[]");checks.forEach(c=>c.checked=saved.includes(c.dataset.task));}catch(e){}
checks.forEach(c=>c.addEventListener("change",updateProgress));$("#resetTasks").addEventListener("click",()=>{checks.forEach(c=>c.checked=false);updateProgress();});updateProgress();$("#year").textContent=new Date().getFullYear();
})();