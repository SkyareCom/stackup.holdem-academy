const fs=require('fs');
const typography=fs.readFileSync('typography-standard.js','utf8');
if(!typography.includes("font-family:'Love Ya Like A Sister',cursive!important")){
  console.error('FAIL: Academy font lock is missing');
  process.exit(1);
}
if(!typography.includes('.navicon')||!typography.includes('Arial,sans-serif!important')){
  console.error('FAIL: Poker/icon font exceptions are missing');
  process.exit(1);
}
console.log('Typography identity OK: Love Ya Like A Sister');
