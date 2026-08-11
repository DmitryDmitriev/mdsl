// Field-family CHROME PARITY audit
// ─────────────────────────────────────────────────────────────────────────────
// Mirror-модель: Input/Search/Select/Textarea — отдельные копии обвязки кубика
// `.=Field` (живой связи нет). Этот скрипт сверяет, что копии не разъехались с
// кубиком по ключевым метрикам chrome. Запускать ПЕРЕД каждым Publish UI-Kit.
//
// КАК ЗАПУСТИТЬ: MCP `use_figma`, fileKey = PI2N65xbeJPTc5oWhOP7Bl (UI-Kit-Mobile).
// Вставить код ниже. Ожидаемый результат: drift: []  (пустой — всё синхронно).
// Textarea намеренно отличается (grow-режим): сверяется только radius.
//
// Источник правды: кубик `.=Field` (11024:404) + docs/field-spec.md.
// ─────────────────────────────────────────────────────────────────────────────
const comps = {
  Cube:'11024:404', Input:'6316:335', Search:'6447:268', Select:'11025:556', Textarea:'9736:94'
};
function containerOf(v){
  return v.children.find(c=>c.name==='Field') || v.children.find(c=>c.name==='Container') || v.children.find(c=>c.type==='FRAME');
}
function metrics(f){
  return { radius:f.cornerRadius, h:Math.round(f.height), padL:f.paddingLeft, padR:f.paddingRight,
    padT:f.paddingTop, padB:f.paddingBottom, layout:f.layoutMode, gap:f.itemSpacing, align:f.counterAxisAlignItems };
}
function pickVariant(set, size){
  return set.children.find(v=>/State=Default/.test(v.name) && (size==='-'||new RegExp('Size='+size).test(v.name)));
}
const report={};
for(const [name,id] of Object.entries(comps)){
  const set=await figma.getNodeByIdAsync(id);
  const hasSize = /Size=/.test(set.children[0].name);
  const sizes = hasSize?['lg','md','sm']:['-'];
  report[name]={};
  for(const s of sizes){
    const v=pickVariant(set,s); if(!v){ report[name][s]='n/a'; continue; }
    const f=containerOf(v); report[name][s]=f?metrics(f):'noContainer';
  }
}
// drift vs Cube (Textarea: только radius — остальное намеренно grow)
const cube=report.Cube; const drift=[];
for(const [name,bySize] of Object.entries(report)){
  if(name==='Cube') continue;
  for(const s of Object.keys(bySize)){
    const m=bySize[s]; if(typeof m==='string') continue;
    const ref = cube[s] || cube['lg'];
    if(m.radius!==ref.radius) drift.push(`${name}/${s}: radius ${m.radius}≠${ref.radius}`);
    if(name!=='Textarea'){
      if(m.h!==ref.h) drift.push(`${name}/${s}: h ${m.h}≠${ref.h}`);
      if(m.padL!==ref.padL) drift.push(`${name}/${s}: padL ${m.padL}≠${ref.padL}`);
      if(m.padR!==ref.padR) drift.push(`${name}/${s}: padR ${m.padR}≠${ref.padR}`);
      if(m.layout!==ref.layout) drift.push(`${name}/${s}: layout ${m.layout}≠${ref.layout}`);
      if(m.align!==ref.align) drift.push(`${name}/${s}: align ${m.align}≠${ref.align}`);
      if(m.gap!==ref.gap) drift.push(`${name}/${s}: gap ${m.gap}≠${ref.gap}`);
    }
  }
}
// READ-only отчёт (throw откатывает мутаций нет — скрипт ничего не пишет)
throw new Error('PARITY::'+JSON.stringify({drift, report}, null, 2));
