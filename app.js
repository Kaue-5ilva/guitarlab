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
function estimate(buffer,rate){
 const step=4,n=Math.floor(buffer.length/step),sampleRate=rate/step,signal=new Float32Array(n);let mean=0;
 for(let i=0;i<n;i++){signal[i]=buffer[i*step];mean+=signal[i];}
 mean/=n;let energy=0;for(let i=0;i<n;i++){signal[i]-=mean;energy+=signal[i]*signal[i];}
 if(Math.sqrt(energy/n)<.008)return null;
 const minLag=Math.max(2,Math.floor(sampleRate/1000)),maxLag=Math.min(Math.floor(sampleRate/65),Math.floor(n/3));
 const correlations=new Float32Array(maxLag+2);let bestLag=-1,bestCorr=0;
 for(let lag=minLag;lag<=maxLag;lag++){let cross=0,a=0,b=0;for(let i=0;i<n-lag;i++){const x=signal[i],y=signal[i+lag];cross+=x*y;a+=x*x;b+=y*y;}const corr=(a>0&&b>0)?cross/Math.sqrt(a*b):0;correlations[lag]=corr;if(corr>bestCorr){bestCorr=corr;bestLag=lag;}}
 if(bestLag<0||bestCorr<.55)return null;
 let chosen=bestLag;for(let lag=minLag+1;lag<bestLag;lag++){const c=correlations[lag];if(c>=bestCorr*.92&&c>.55&&c>=correlations[lag-1]&&c>=correlations[lag+1]){chosen=lag;break;}}
 const left=correlations[chosen-1]||0,center=correlations[chosen],right=correlations[chosen+1]||0,denom=left-2*center+right,shift=Math.abs(denom)<1e-8?0:.5*(left-right)/denom;
 return sampleRate/(chosen+Math.max(-.5,Math.min(.5,shift)));
}
function listen(){if(!analyser||!micAudio)return;const buf=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(buf);const hz=estimate(buf,micAudio.sampleRate);
if(hz){const midi=Math.round(69+12*Math.log2(hz/440)),name=notes[(midi%12+12)%12],octave=Math.floor(midi/12)-1,ref=440*Math.pow(2,(midi-69)/12),cents=1200*Math.log2(hz/ref);$("#tunerNote").textContent=name+octave;$("#tunerFrequency").textContent=hz.toFixed(1)+" Hz · "+(cents>0?"+":"")+cents.toFixed(0)+" cents";$("#tunerNeedle").style.transform="rotate("+Math.max(-42,Math.min(42,cents*1.4))+"deg)";$("#tunerStatus").textContent=Math.abs(cents)<5?"Afinada! Nota estável.":cents<0?"Nota baixa — aumente a tensão com cuidado.":"Nota alta — alivie a tensão com cuidado.";}
else $("#tunerStatus").textContent="Escutando… toque uma corda isolada e deixe a nota soar.";frame=requestAnimationFrame(listen);}
async function stopTuner(){if(frame)cancelAnimationFrame(frame);frame=null;if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(micAudio&&micAudio.state!=="closed")await micAudio.close();micAudio=null;analyser=null;$("#tunerToggle").textContent="⌁ ATIVAR MICROFONE";$("#tunerNote").textContent="—";$("#tunerFrequency").textContent="Aguardando áudio";}
$("#tunerToggle").addEventListener("click",async()=>{if(stream){await stopTuner();$("#tunerStatus").textContent="Microfone desativado.";return;}try{if(!navigator.mediaDevices?.getUserMedia)throw Error("O microfone exige HTTPS e um navegador compatível.");stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});const Ctx=window.AudioContext||window.webkitAudioContext;micAudio=new Ctx();const source=micAudio.createMediaStreamSource(stream);analyser=micAudio.createAnalyser();analyser.fftSize=8192;source.connect(analyser);$("#tunerToggle").textContent="Ⅱ DESATIVAR MICROFONE";$("#tunerStatus").textContent="Microfone ativo. Toque uma corda por vez.";listen();}catch(e){await stopTuner();$("#tunerStatus").textContent=e.name==="NotAllowedError"?"Permissão negada. Libere o microfone nas configurações do navegador.":e.message;}});

const practiceLessons={
 open:{label:"LIÇÃO 01 · AFINAÇÃO PADRÃO",title:"Conhecendo as cordas soltas",goal:"Toque as seis cordas sem pressionar nenhuma casa, da mais grave à mais aguda.",instruction:"Toque apenas a corda indicada. Deixe a nota soar por um instante e depois abafe a corda antes de tocar a próxima.",targets:[{midi:40,label:"E2",detail:"6ª corda · Mi grave (solta)"},{midi:45,label:"A2",detail:"5ª corda · Lá (solta)"},{midi:50,label:"D3",detail:"4ª corda · Ré (solta)"},{midi:55,label:"G3",detail:"3ª corda · Sol (solta)"},{midi:59,label:"B3",detail:"2ª corda · Si (solta)"},{midi:64,label:"E4",detail:"1ª corda · Mi agudo (solta)"}]},
 chromatic:{label:"LIÇÃO 02 · COORDENAÇÃO",title:"Cromatismo na primeira corda",goal:"Na 1ª corda (Mi agudo), toque as casas 0, 1, 2 e 3 em sequência, usando um dedo por casa.",instruction:"Comece com a corda solta e avance uma casa por vez: 0, 1, 2 e 3. Pressione perto do traste e toque uma nota de cada vez.",targets:[{midi:64,label:"E4",detail:"1ª corda · casa 0 · solta"},{midi:65,label:"F4",detail:"1ª corda · casa 1"},{midi:66,label:"F♯4",detail:"1ª corda · casa 2"},{midi:67,label:"G4",detail:"1ª corda · casa 3"}]},
 melody:{label:"LIÇÃO 03 · PRIMEIRA MELODIA",title:"Uma pequena sequência melódica",goal:"Toque a sequência G4 – A4 – B4 – A4 – G4 – E4 na primeira corda.",instruction:"Na 1ª corda, toque as casas 3, 5, 7, 5, 3 e 0. Mantenha o tempo regular e abafe levemente cada nota antes da próxima.",targets:[{midi:67,label:"G4",detail:"1ª corda · casa 3"},{midi:69,label:"A4",detail:"1ª corda · casa 5"},{midi:71,label:"B4",detail:"1ª corda · casa 7"},{midi:69,label:"A4",detail:"1ª corda · casa 5"},{midi:67,label:"G4",detail:"1ª corda · casa 3"},{midi:64,label:"E4",detail:"1ª corda · casa 0 · solta"}]}
};
let selectedPractice="open",practiceIndex=0,practiceStream=null,practiceContext=null,practiceAnalyser=null,practiceFrame=null,practiceArmed=true,practiceStableMidi=null,practiceStableFrames=0,practiceSilenceFrames=0;
const practiceSelect=$("#practiceSelect"),practiceNotes=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
function renderPractice(){
 const lesson=practiceLessons[selectedPractice],target=lesson.targets[Math.min(practiceIndex,lesson.targets.length-1)];
 $("#practiceLessonLabel").textContent=lesson.label;$("#practiceLessonTitle").textContent=lesson.title;$("#practiceLessonGoal").textContent=lesson.goal;$("#practiceInstruction").textContent=lesson.instruction;$("#practiceExpected").textContent=target.label;$("#practiceExpectedDetail").textContent=target.detail;
 const sequence=$("#practiceSequence");sequence.innerHTML="";
 lesson.targets.forEach((item,index)=>{const chip=document.createElement("span");chip.className="practice-chip"+(index<practiceIndex?" done":index===practiceIndex?" current":"");chip.textContent=(index+1)+". "+item.label;sequence.appendChild(chip);});
 const percent=Math.round(practiceIndex/lesson.targets.length*100);$("#practiceProgressText").textContent=practiceIndex+" de "+lesson.targets.length+" notas";$("#practiceProgressPercent").textContent=percent+"%";$("#practiceProgressBar").style.width=percent+"%";
 $("#practiceState").textContent=practiceStream?"ESCUTANDO":practiceIndex===lesson.targets.length?"CONCLUÍDA":"AGUARDANDO";
}
function resetPractice(){practiceIndex=0;renderPractice();$("#practiceHeard").textContent="—";$("#practiceFrequency").textContent="Aguardando o primeiro toque";$("#practiceFeedback").textContent="Toque uma nota por vez. O sistema vai comparar a altura musical com a nota solicitada.";}
async function stopPractice(updateMessage=true){
 if(practiceFrame)cancelAnimationFrame(practiceFrame);practiceFrame=null;if(practiceStream)practiceStream.getTracks().forEach(track=>track.stop());practiceStream=null;
 if(practiceContext&&practiceContext.state!=="closed")await practiceContext.close();practiceContext=null;practiceAnalyser=null;
 $("#practiceStart").disabled=false;$("#practiceStop").disabled=true;$("#practiceState").textContent=practiceIndex===practiceLessons[selectedPractice].targets.length?"CONCLUÍDA":"PAUSADA";if(updateMessage)$("#practiceStatus").textContent="Microfone desativado.";
}
function practiceResult(midi,cents,hz){
 const lesson=practiceLessons[selectedPractice],target=lesson.targets[practiceIndex];if(!target)return;const heard=practiceNotes[(midi%12+12)%12]+(Math.floor(midi/12)-1);
 $("#practiceHeard").textContent=heard;$("#practiceFrequency").textContent=hz.toFixed(1)+" Hz · "+(cents>0?"+":"")+cents.toFixed(0)+" cents";
 if(midi===target.midi&&Math.abs(cents)<=45){
  practiceIndex++;renderPractice();$("#practiceFeedback").textContent="Nota correta! Abafe a corda e toque a próxima quando estiver pronto.";
  if(practiceIndex>=lesson.targets.length){$("#practiceFeedback").textContent="Excelente! Você concluiu esta lição com todas as notas reconhecidas.";$("#practiceStatus").textContent="Lição concluída. Escolha outra atividade para continuar praticando.";stopPractice(false);}
  else $("#practiceExpected").textContent=lesson.targets[practiceIndex].label;
 }else if(midi===target.midi)$("#practiceFeedback").textContent="A nota está correta, mas parece desafinada ("+(cents>0?"acima":"abaixo")+" do tom). Afine o instrumento e tente novamente.";
 else $("#practiceFeedback").textContent="Ainda não. O microfone ouviu "+heard+", mas a nota esperada é "+target.label+". Confira a corda e a casa indicadas.";
}
function practiceListen(){
 if(!practiceAnalyser||!practiceContext)return;const buffer=new Float32Array(practiceAnalyser.fftSize);practiceAnalyser.getFloatTimeDomainData(buffer);const hz=estimate(buffer,practiceContext.sampleRate);
 if(hz){const midiFloat=69+12*Math.log2(hz/440),midi=Math.round(midiFloat),cents=(midiFloat-midi)*100;practiceSilenceFrames=0;if(practiceStableMidi===midi)practiceStableFrames++;else{practiceStableMidi=midi;practiceStableFrames=1;}if(practiceStableFrames>=3&&practiceArmed){practiceArmed=false;practiceResult(midi,cents,hz);}}
 else{practiceSilenceFrames++;practiceStableFrames=0;practiceStableMidi=null;if(practiceSilenceFrames>=5)practiceArmed=true;}
 if(practiceAnalyser&&practiceContext)practiceFrame=requestAnimationFrame(practiceListen);
}
practiceSelect.addEventListener("change",async()=>{await stopPractice(false);selectedPractice=practiceSelect.value;resetPractice();$("#practiceStatus").textContent="Lição selecionada. Ative o microfone quando estiver pronto.";});
$("#practiceStart").addEventListener("click",async()=>{
 if(practiceStream)return;if(practiceIndex>=practiceLessons[selectedPractice].targets.length)resetPractice();
 try{if(!navigator.mediaDevices?.getUserMedia)throw Error("O acesso ao microfone exige HTTPS e um navegador compatível.");const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)throw Error("Este navegador não oferece análise de áudio compatível.");
 practiceStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});practiceContext=new Ctx();await practiceContext.resume();
 const source=practiceContext.createMediaStreamSource(practiceStream);practiceAnalyser=practiceContext.createAnalyser();practiceAnalyser.fftSize=8192;practiceAnalyser.smoothingTimeConstant=0;source.connect(practiceAnalyser);
 practiceArmed=true;practiceStableMidi=null;practiceStableFrames=0;practiceSilenceFrames=0;$("#practiceStart").disabled=true;$("#practiceStop").disabled=false;$("#practiceStatus").textContent="Microfone ativo. Toque somente a nota indicada e abafe-a entre tentativas.";
 $("#practiceState").textContent="ESCUTANDO";practiceFrame=requestAnimationFrame(practiceListen);
 }catch(error){await stopPractice(false);$("#practiceStatus").textContent=error.name==="NotAllowedError"?"Permissão do microfone negada. Autorize o acesso nas configurações do navegador.":error.message;}
});
$("#practiceStop").addEventListener("click",()=>stopPractice(true));

window.addEventListener("pagehide",()=>{stopMetro();if(stream)stream.getTracks().forEach(t=>t.stop());if(practiceStream)practiceStream.getTracks().forEach(t=>t.stop());});
const today=new Date(),dayStamp=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");const storageKey="guitarlab-routine-v1-"+dayStamp,checks=$(".tasks input");
function updateProgress(){const done=checks.filter(c=>c.checked).length,p=Math.round(done/checks.length*100);$("#progressText").textContent=done+" de "+checks.length+" concluídas";$("#progressPercent").textContent=p+"%";$("#progressBar").style.width=p+"%";try{localStorage.setItem(storageKey,JSON.stringify(checks.filter(c=>c.checked).map(c=>c.dataset.task)));}catch(e){}}
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"[]");checks.forEach(c=>c.checked=saved.includes(c.dataset.task));}catch(e){}
checks.forEach(c=>c.addEventListener("change",updateProgress));$("#resetTasks").addEventListener("click",()=>{checks.forEach(c=>c.checked=false);updateProgress();});updateProgress();practiceSelect.value=selectedPractice;resetPractice();$("#year").textContent=new Date().getFullYear();
})();