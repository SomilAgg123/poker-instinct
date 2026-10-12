// Zero-dependency tests: the tested engine is extracted from the shipped HTML.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const engine=source.split('// ENGINE_START')[1].split('// ENGINE_END')[0];
const P=vm.runInNewContext(engine+';Poker');
const h=(ranks,suits=[0,1,2,3,0])=>ranks.map((r,i)=>({r,s:suits[i],id:suits[i]+'-'+r}));
const rank=x=>P.evaluate(x)[0];
assert.equal(rank(h([14,2,3,4,5])),4);assert.equal(P.evaluate(h([14,2,3,4,5]))[1],5);
assert.equal(rank(h([10,11,12,13,14],[1,1,1,1,1])),8);
assert.equal(rank(h([9,9,9,9,2])),7);assert.equal(rank(h([8,8,8,2,2])),6);
assert.equal(rank(h([2,4,7,10,14],[2,2,2,2,2])),5);
assert.equal(rank(h([9,9,9,4,2])),3);assert.equal(rank(h([9,9,4,4,2])),2);
assert.equal(rank(h([9,9,4,3,2])),1);assert.equal(rank(h([14,10,6,4,2])),0);
assert.equal(P.compare(P.evaluate(h([14,14,12,8,2])),P.evaluate(h([14,14,11,10,9]))),1);
assert.equal(P.compare(P.evaluate(h([14,2,3,4,5])),P.evaluate(h([2,3,4,5,6]))),-1);
assert.equal(P.contract(h([14,13,8,6,2],[1,2,1,2,0]),0),true);
assert.equal(P.contract(h([14,2,3,4,5]),1),true);
assert.equal(P.contract(h([8,8,8,2,3]),2),true);
assert.equal(P.contract(h([2,4,7,10,14],[2,2,2,2,2]),2),false);
assert.equal(P.legal(h([2,3,4,5]),{r:2,s:0,id:'0-2'}),false);
const counts=Array(9).fill(0),d=P.shuffled(P.rng(10));
// Exhaust every five-card combination from a conventional deck.
for(let a=0;a<48;a++)for(let b=a+1;b<49;b++)for(let c=b+1;c<50;c++)for(let e=c+1;e<51;e++)for(let f=e+1;f<52;f++)counts[rank([d[a],d[b],d[c],d[e],d[f]])]++;
assert.deepEqual(counts,[1302540,1098240,123552,54912,10200,5108,3744,624,40]);
for(const difficulty of ['easy','standard','hard'])for(let seed=0;seed<500;seed++){
 const random=P.rng(seed),player=[[],[],[]],rival=[[],[],[]];let deck=[];
 for(let t=0;t<15;t++){
  if(deck.length<4){const used=new Set([...player.flat(),...rival.flat()].map(c=>c.id));deck=P.shuffled(random).filter(c=>!used.has(c.id));}
  const market=deck.splice(0,4),human=P.choice(market,player,rival,random,'standard');assert.ok(human);player[human.l].push(market.splice(human.i,1)[0]);
  const ai=P.choice(market,rival,player,random,difficulty);assert.ok(ai);rival[ai.l].push(market[ai.i]);
 }
 assert.ok([...player,...rival].every(h=>h.length===5));assert.equal(new Set([...player.flat(),...rival.flat()].map(c=>c.id)).size,30);
 const s=P.score(player,rival);assert.ok(s.p>=0&&s.p<=15&&s.r>=0&&s.r<=15);
}
console.log('PASS: all 2,598,960 poker hands, tie-breaks, contracts and 1,500 full matches.');
