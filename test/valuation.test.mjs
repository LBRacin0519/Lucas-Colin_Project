import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate} from '../lib/valuation.mjs';
const now=Date.parse('2026-11-24T12:00:00Z');
const sample={purchase:20,upfront:5,ship:8,buyerShip:0,other:2,flat:0,feeExtra:0,target:15,fee:10,roi:50,platform:'eBay',confirmed:true,inspected:true,costsConfirmed:true,comps:[40,60,80].map((price,i)=>({url:'https://www.ebay.com/itm/'+(123456789+i),date:'2026-11-20',verified:true,kind:'sold',platform:'eBay',price}))};
test('conservative offer, median profit and ROI include all costs',()=>{
 const r=evaluate(sample,now);assert.equal(r.mid,60);assert.equal(r.low,50);assert.equal(r.high,70);assert.equal(r.profitMid,19);assert.equal(r.roi,76);assert.equal(r.maxOffer,15);assert.equal(r.decision,'Negotiate');
});
test('buy, pass and confirmation gates',()=>{
 assert.equal(evaluate({...sample,purchase:15},now).decision,'Conditional buy');
 assert.equal(evaluate({...sample,purchase:80},now).decision,'Pass');
 for(const k of ['confirmed','inspected','costsConfirmed'])assert.equal(evaluate({...sample,[k]:false},now).decision,'Investigate');
});
test('reject duplicates, active asks, stale and cross-platform evidence',()=>{
 assert.equal(evaluate({...sample,comps:[sample.comps[0],sample.comps[0],sample.comps[1]]},now).count,2);
 for(const patch of [{kind:'active'},{date:'2025-01-01'},{platform:'Depop'},{verified:false}])assert.equal(evaluate({...sample,comps:sample.comps.map(c=>({...c,...patch}))},now).count,0);
});
test('reject missing or negative costs',()=>{
 assert.throws(()=>evaluate({...sample,fee:''},now));
 assert.throws(()=>evaluate({...sample,purchase:-1},now));
});
test('zero investment and impossible target',()=>{
 assert.equal(evaluate({...sample,purchase:0,upfront:0},now).roi,null);
 assert.equal(evaluate({...sample,target:500},now).maxOffer,null);
});
