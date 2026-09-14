const fs=require('fs');
const vm=require('vm');

const failures=[];
let checked=0;

function norm(value){
  return String(value??'')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\s+/g,' ').trim().toUpperCase();
}

function auditOptions(source,id,options,answer){
  if(!Array.isArray(options))return;
  checked++;
  const normalized=options.map(norm);
  const seen=new Map();
  normalized.forEach((value,index)=>{
    if(!value)failures.push(`${source} ${id}: alternativa vazia na posicao ${index+1}`);
    if(seen.has(value))failures.push(`${source} ${id}: alternativa repetida "${options[index]}" nas posicoes ${seen.get(value)+1} e ${index+1}`);
    else seen.set(value,index);
  });
  if(answer!==undefined){
    const target=norm(answer);
    const count=normalized.filter(x=>x===target).length;
    if(count!==1)failures.push(`${source} ${id}: resposta correta "${answer}" aparece ${count} vezes nas alternativas`);
  }
}

function auditSequence(source,id,items,answer){
  if(!Array.isArray(items))return;
  checked++;
  const normalized=items.map(norm);
  if(new Set(normalized).size!==normalized.length)failures.push(`${source} ${id}: itens repetidos na sequencia`);
  if(Array.isArray(answer)){
    const itemSet=new Set(normalized);
    for(const value of answer){if(!itemSet.has(norm(value)))failures.push(`${source} ${id}: resposta de sequencia contem item inexistente "${value}"`);}
    if(new Set(answer.map(norm)).size!==answer.length)failures.push(`${source} ${id}: resposta de sequencia contem item repetido`);
  }
}

function executeBank(file,globalName){
  const sandbox={window:{},console:{log(){},error(){},warn(){}}};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file,timeout:2000});
  const bank=sandbox.window[globalName];
  if(!bank)throw new Error(`${file}: ${globalName} nao foi exposto`);
  return bank;
}

function extractConst(file,name){
  const src=fs.readFileSync(file,'utf8');
  const marker=`const ${name}=`;
  let at=src.indexOf(marker);
  if(at<0)throw new Error(`${file}: const ${name} nao encontrado`);
  let i=at+marker.length;
  while(/\s/.test(src[i]))i++;
  const open=src[i];
  const close=open==='['?']':open==='{'?'}':null;
  if(!close)throw new Error(`${file}: ${name} nao inicia com array/objeto`);
  let depth=0,quote=null,escaped=false;
  for(let j=i;j<src.length;j++){
    const ch=src[j];
    if(quote){
      if(escaped){escaped=false;continue;}
      if(ch==='\\'){escaped=true;continue;}
      if(ch===quote){quote=null;continue;}
      continue;
    }
    if(ch==='"'||ch==="'"||ch==='`'){quote=ch;continue;}
    if(ch===open)depth++;
    else if(ch===close){
      depth--;
      if(depth===0){
        const expr=src.slice(i,j+1);
        return vm.runInNewContext(`(${expr})`,{}, {filename:file,timeout:2000});
      }
    }
  }
  throw new Error(`${file}: fim de ${name} nao encontrado`);
}

// Fundamentos interativos.
const fundamentals=executeBank('fundamentals-interactive-bank.js','StackupFundamentalsSpotBank');
for(const [chapter,spots] of Object.entries(fundamentals)){
  for(const spot of spots){
    const id=spot.id||spot.prompt||chapter;
    if(spot.type==='sequence')auditSequence(`FUNDAMENTOS/${chapter}`,id,spot.items,spot.answer);
    else auditOptions(`FUNDAMENTOS/${chapter}`,id,spot.options,spot.answer);
  }
}

// Banco avancado da pratica.
const advanced=executeBank('practice-advanced-bank.js','StackupPracticeAdvancedBank');
for(const key of ['sim','quiz','math']){
  for(const item of advanced[key]||[])auditOptions(`PRATICA-AVANCADA/${key}`,item.id||item.question,item.options,item.answer);
}

// Banco basico da pratica.
for(const name of ['SIM','QUIZ']){
  const rows=extractConst('practice-module.js',name);
  rows.forEach((row,index)=>auditOptions(`PRATICA/${name}`,`${name}-${index+1}`,row[2]||row[1],row[3]||row[2]));
}

// Modalidades: perguntas factuais e sequencias de cada modalidade.
const lessons=extractConst('modalities-module.js','LESSONS');
for(const [lesson,data] of Object.entries(lessons)){
  (data.facts||[]).forEach((fact,index)=>auditOptions(`MODALIDADES/${lesson}`,`FACT-${index+1}`,[fact[1],...(fact[2]||[])],fact[1]));
  (data.seqs||[]).forEach((seq,index)=>auditSequence(`MODALIDADES/${lesson}`,`SEQ-${index+1}`,seq[1],seq[1]));
}

// Mixed Games.
const core=extractConst('mixed-games-module.js','CORE');
core.forEach((row,index)=>auditOptions('MIXED-GAMES',`CORE-${index+1}`,[row[2],...(row[3]||[])],row[2]));
const mixedSeq=extractConst('mixed-games-module.js','SEQ_BASE');
mixedSeq.forEach((row,index)=>auditSequence('MIXED-GAMES',`SEQ-${index+1}`,row[1],row[1]));

if(failures.length){
  console.error(`Quiz audit: ${checked} conjuntos verificados, ${failures.length} falhas.`);
  failures.forEach(x=>console.error('FAIL:',x));
  process.exit(1);
}
console.log(`Quiz audit: ${checked} conjuntos verificados, 0 falhas.`);
