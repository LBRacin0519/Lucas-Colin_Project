const $=id=>document.getElementById(id);
const money=n=>n==null?'N/A':n.toLocaleString('en-US',{style:'currency',currency:'USD'});
let images=[],compIndex=0,revision=0;
const setStatus=(id,text,error=false)=>{$(id).textContent=text;$(id).classList.toggle('error',error)};
async function api(path,data){const r=await fetch('/api/'+path,{method:'POST',headers:{'Content-Type':'application/json','X-Flip-Advisor':'1'},body:JSON.stringify(data)});const result=await r.json();if(!r.ok)throw Error(result.error||'Request failed');return result}
async function run(button,status,fn){if(button.disabled)return;button.disabled=true;setStatus(status,'Working…');try{await fn();setStatus(status,'')}catch(e){setStatus(status,e.message,true)}finally{button.disabled=false}}
function clearResult(){revision++;$('result').hidden=true}
function invalidateIdentity(){$('confirmed').checked=false;$('inspected').checked=false;for(const c of document.querySelectorAll('.comp [data-field="verified"]'))c.checked=false;clearResult()}
async function convert(file){
 if(file.size>30*1024*1024)throw Error('Photo exceeds 30 MB');
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.src=url;await img.decode();const scale=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.naturalWidth*scale));c.height=Math.max(1,Math.round(img.naturalHeight*scale));c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.82)}catch{throw Error('Could not read image. Try a JPEG/PNG screenshot or camera photo.')}finally{URL.revokeObjectURL(url)}
}
async function addImages(files){try{if(images.length+files.length>4)throw Error('Maximum 4 photos; remove one first.');const next=await Promise.all([...files].map(convert));if(images.length+next.length>4)throw Error('Maximum 4 photos');images.push(...next);renderImages();invalidateIdentity();setStatus('identifyStatus','')}catch(e){setStatus('identifyStatus',e.message,true)}}
function renderImages(){$('previews').replaceChildren();images.forEach((src,i)=>{const b=document.createElement('button');b.className='secondary';b.title='Remove photo '+(i+1);const img=document.createElement('img');img.src=src;img.alt='Remove photo '+(i+1);b.append(img);b.onclick=()=>{images.splice(i,1);renderImages();invalidateIdentity()};$('previews').append(b)})}
for(const id of ['photos','camera'])$(id).onchange=async()=>{const files=[...$(id).files];$(id).value='';await addImages(files)};
function addLink(parent,text,url){try{const u=new URL(url);if(!['https:','http:'].includes(u.protocol))return;const a=document.createElement('a');a.textContent=text;a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';parent.append(a)}catch{}}
function links(){const q=$('query').value.trim();$('links').replaceChildren();if(!q)return;const search=encodeURIComponent(q);addLink($('links'),'eBay sold','https://www.ebay.com/sch/i.html?_nkw='+search+'&LH_Sold=1&LH_Complete=1');addLink($('links'),'eBay Product Research','https://www.ebay.com/sh/research');addLink($('links'),'Poshmark search','https://www.google.com/search?q='+encodeURIComponent('site:poshmark.com/listing '+q));addLink($('links'),'Depop search','https://www.google.com/search?q='+encodeURIComponent('site:depop.com/products '+q))}
$('query').oninput=()=>{links();invalidateIdentity();$('researchText').textContent='';$('sources').replaceChildren()};
for(const id of ['brand','garment','styleCode','size','notes'])$(id).oninput=invalidateIdentity;
$('identify').onclick=()=>run($('identify'),'identifyStatus',async()=>{
 const current=revision;const d=await api('identify',{notes:$('notes').value,images});if(current!==revision)throw Error('Inputs changed. Run identification again.');
 $('identity').replaceChildren();for(const [k,v] of Object.entries(d)){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k.replace(/([A-Z])/g,' $1');dd.textContent=v;$('identity').append(dt,dd)}
 for(const k of ['brand','garment','styleCode','size'])$(k).value=d[k]==='Unknown'?'':d[k];
 $('query').value=d.searchQuery.slice(0,300);links();invalidateIdentity();$('researchText').textContent='';$('sources').replaceChildren();
});
$('research').onclick=()=>run($('research'),'researchStatus',async()=>{
 const query=$('query').value;$('researchText').textContent='';$('sources').replaceChildren();const d=await api('research',{query});if(query!==$('query').value)throw Error('Query changed. Search again.');$('researchText').textContent=d.text;
 for(const s of d.sources){const p=document.createElement('p');addLink(p,s.title,s.url);$('sources').append(p)}if(!d.sources.length)$('sources').textContent='No cited sources returned; do not treat as sales evidence.';
});
function addComp(){
 if(document.querySelectorAll('.comp').length>=50)return;const box=document.createElement('div');box.className='comp';const n=++compIndex;
 box.innerHTML='<strong>Comparison '+n+'</strong><label>Source listing URL<input data-field="url" type="url" placeholder="https://…"></label><div class="grid"><label>Item price ($)<input data-field="price" type="number" min=".01" step=".01"></label><label>Sale date<input data-field="date" type="date"></label><label>Platform<select data-field="platform"><option>eBay</option><option>Poshmark</option><option>Depop</option><option>Other</option></select></label><label>Evidence type<select data-field="kind"><option value="sold">Sold</option><option value="active">Active ask</option><option value="unknown">Unverified</option></select></label></div><label class="check"><input data-field="verified" type="checkbox"> I confirmed actual sold price, matching style, size and condition.</label><button class="secondary remove" type="button">Remove comparison</button>';
 box.querySelector('[data-field=platform]').value=$('platform').value;box.addEventListener('input',e=>{if(e.target.dataset.field!=='verified')box.querySelector('[data-field=verified]').checked=false;clearResult()});box.querySelector('.remove').onclick=()=>{box.remove();clearResult()};$('comps').append(box);clearResult()
}
$('addComp').onclick=addComp;for(let i=0;i<3;i++)addComp();
const costFields=[['purchase','Purchase price ($)',''],['upfront','Upfront costs ($)','0'],['ship','Seller shipping ($)','0'],['buyerShip','Buyer-paid shipping ($)','0'],['other','Other selling costs ($)','0'],['flat','Fixed fee ($)','0'],['fee','Percentage fee (%)',''],['feeExtra','Additional fee base ($)','0'],['target','Minimum profit ($)','15'],['roi','Minimum ROI (%)','50']];
for(const [id,title,value] of costFields){const label=document.createElement('label');label.textContent=title;const el=document.createElement('input');el.id=id;el.type='number';el.min='0';el.step='.01';el.inputMode='decimal';el.value=value;if(id==='fee')el.max='100';label.append(el);$('costs').append(label)}
const ids=costFields.map(c=>c[0]);
for(const id of [...ids,'platform','confirmed','inspected','costsConfirmed'])$(id).addEventListener('input',()=>{if((ids.includes(id)&&!['purchase','target','roi'].includes(id))||id==='platform')$('costsConfirmed').checked=false;clearResult()});
$('calculate').onclick=()=>run($('calculate'),'calcStatus',async()=>{
 clearResult();const current=revision;const data=Object.fromEntries(ids.map(id=>[id,$(id).value]));for(const id of ['confirmed','inspected','costsConfirmed'])data[id]=$(id).checked;
 data.platform=$('platform').value;data.comps=[...document.querySelectorAll('.comp')].map(c=>Object.fromEntries([...c.querySelectorAll('[data-field]')].map(el=>[el.dataset.field,el.type==='checkbox'?el.checked:el.value])));
 const d=await api('evaluate',data);if(current!==revision)throw Error('Inputs changed. Recalculate.');$('decision').textContent=d.decision;$('reason').textContent=d.reason;$('metrics').replaceChildren();
 const metrics=d.mid===undefined?[]:[['Conservative resale',money(d.low)],['Typical resale',money(d.mid)],['Optimistic resale',money(d.high)],['Typical net profit',money(d.profitMid)],['Conservative net profit',money(d.profitLow)],['Optimistic net profit',money(d.profitHigh)],['Typical ROI',d.roi===null?'N/A':d.roi.toFixed(1)+'%'],['Maximum offer',d.maxOffer===null?'No viable offer':money(d.maxOffer)]];
 for(const [label,value] of metrics){const box=document.createElement('div'),s=document.createElement('small'),strong=document.createElement('strong');box.className='metric';s.textContent=label;strong.textContent=value;box.append(s,strong);$('metrics').append(box)}
 $('evidence').textContent=d.count+' accepted comparison(s). '+(d.confidence||'Insufficient evidence')+'. '+(d.rejected.length?'Excluded: '+d.rejected.join('; '):'');$('result').hidden=false;$('result').scrollIntoView({behavior:'smooth'});
});
$('identify').disabled=true;$('research').disabled=true;
fetch('/api/status',{cache:'no-store'}).then(r=>r.json()).then(s=>{setStatus('status',s.ai?'AI configured · '+(s.webResearch?'web research enabled':'manual comparable research'):'Manual mode · configure AI key on host');$('research').disabled=!s.ai||!s.webResearch;$('identify').disabled=!s.ai}).catch(()=>setStatus('status','Host unavailable'));
if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register('/sw.js').catch(()=>{});
