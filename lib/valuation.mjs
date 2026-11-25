// All currency calculations use integer cents.
export function evaluate(input, now=Date.now()) {
 const cents=(v,name,limit=100000)=>{if((typeof v!=='string'&&typeof v!=='number')||String(v).trim()===''||!Number.isFinite(Number(v))||Number(v)<0||Number(v)>limit)throw Error('Enter a valid '+name);return Math.round(Number(v)*100)};
 const purchase=cents(input.purchase,'purchase price'),upfront=cents(input.upfront,'upfront costs'),ship=cents(input.ship,'seller shipping'),buyerShip=cents(input.buyerShip,'buyer shipping'),other=cents(input.other,'other selling costs'),flat=cents(input.flat,'fixed fee'),extra=cents(input.feeExtra,'additional fee base'),target=cents(input.target,'target profit'),fee=cents(input.fee,'fee percentage',100),roiTarget=cents(input.roi,'ROI target',10000);
 if(!['eBay','Poshmark','Depop','Other'].includes(input.platform))throw Error('Select a selling platform');
 if(!Array.isArray(input.comps)||input.comps.length>50)throw Error('Maximum 50 comparisons');
 const seen=new Set(),valid=[],rejected=[];
 for(const row of input.comps){
  try{
   if(!row.url&&!row.price&&!row.date)continue;
   const url=new URL(row.url);
   if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.pathname==='/')throw Error('Invalid evidence URL');
   const item=(url.hostname==='ebay.com'||url.hostname.endsWith('.ebay.com'))?url.pathname.match(/\/itm\/(?:[^/]+\/)?(\d+)/):null;
   const key=item?'ebay:'+item[1]:url.hostname.replace(/^www\./,'')+url.pathname.replace(/\/$/,'');
   const date=Date.parse(row.date+'T00:00:00Z');
   if(row.verified!==true||row.kind!=='sold'||row.platform!==input.platform)throw Error('Not a confirmed sold match on target platform');
   if(!/^\d{4}-\d{2}-\d{2}$/.test(row.date)||!Number.isFinite(date)||new Date(date).toISOString().slice(0,10)!==row.date||date>now||now-date>90*86400000)throw Error('Sale must be within the last 90 days');
   const price=cents(row.price,'sold item price');if(price<=0)throw Error('Price must exceed zero');
   if(seen.has(key))throw Error('Duplicate evidence URL');seen.add(key);valid.push(price);
  }catch(e){rejected.push(e.message)}
 }
 valid.sort((a,b)=>a-b);
 const q=p=>{const i=(valid.length-1)*p,lo=Math.floor(i),hi=Math.ceil(i);return Math.floor(valid[lo]+(valid[hi]-valid[lo])*(i-lo))};
 if(valid.length<3)return {decision:'Investigate',reason:'Need 3 distinct, recent, user-verified actual sold matches on the target platform.',count:valid.length,rejected};
 const low=q(.25),mid=q(.5),high=q(.75);
 const proceeds=s=>s+buyerShip-Math.ceil((s+buyerShip+extra)*fee/10000)-flat-ship-other;
 const profit=s=>proceeds(s)-purchase-upfront,invested=purchase+upfront;
 const cap=Math.min(proceeds(low)-target-upfront,Math.floor(proceeds(low)*10000/(10000+roiTarget))-upfront);
 const result={count:valid.length,rejected,low:low/100,mid:mid/100,high:high/100,profitLow:profit(low)/100,profitMid:profit(mid)/100,profitHigh:profit(high)/100,roi:invested?profit(mid)/invested*100:null,maxOffer:cap>=0?cap/100:null,confidence:valid.length>=8?'More evidence':'Limited evidence'};
 if(input.confirmed!==true||input.inspected!==true||input.costsConfirmed!==true)return {...result,decision:'Investigate',reason:'Confirm identity, condition/authenticity checks and costs before acting.'};
 if(cap<0||profit(mid)<=0)return {...result,decision:'Pass',reason:'Median deal is unprofitable or no offer meets conservative targets.'};
 if(purchase<=cap)return {...result,decision:'Conditional buy',reason:'Conservative estimate meets both profit and ROI targets. Sale is not guaranteed.'};
 return {...result,decision:'Negotiate',reason:'Purchase price exceeds the conservative maximum offer.'};
}
