const fs=require('fs');
const assert=require('node:assert/strict');
const typography=fs.readFileSync('typography-standard.js','utf8');
const index=fs.readFileSync('index.html','utf8');

assert(index.includes('family=Saira+Semi+Condensed'),
  'Production index must load Saira Semi Condensed from Google Fonts');
assert(index.includes("#app #home")&&index.includes("font-family:'Saira Semi Condensed','Saira Condensed',sans-serif!important"),
  'Internal Academy app must use Saira Semi Condensed');
assert(!typography.includes("html,body,.app,body *"),
  'Typography helper must not override entry/login screens');
assert(typography.includes("#app #home,#app #home *"),
  'Typography helper must scope Saira Semi Condensed to the internal app');
assert(index.includes("font-family:Arial,sans-serif!important"),
  'Poker-card/icon font exceptions must remain neutral');
console.log('Typography identity OK: Saira Semi Condensed internally; entry/login preserved');
