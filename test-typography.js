const fs=require('fs');
const assert=require('node:assert/strict');
const typography=fs.readFileSync('typography-standard.js','utf8');
const index=fs.readFileSync('index.html','utf8');

assert(typography.includes("font-family:'Overlock Academy','Overlock',sans-serif!important"),
  'Academy typography helper must use the Overlock family');
assert(index.includes("font-family:'Overlock Academy',sans-serif!important"),
  'Production index must lock the UI to embedded Overlock');
assert(index.includes("font-family:Arial,sans-serif!important"),
  'Poker-card/icon font exceptions must remain neutral');
console.log('Typography identity OK: Overlock');
