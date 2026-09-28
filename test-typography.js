const fs=require('fs');
const typography=fs.readFileSync('typography-standard.js','utf8');
if(!typography.includes("font-family:'Coming Soon',cursive!important")){
  console.error('FAIL: Academy font lock is missing');
  process.exit(1);
}
if(!typography.includes('font-weight:700!important')||!typography.includes('font-style:italic!important')){
  console.error('FAIL: Academy typography must be Coming Soon bold italic globally');
  process.exit(1);
}
if(/Arial,sans-serif!important|Road Rage/i.test(typography)){
  console.error('FAIL: Legacy font exception detected');
  process.exit(1);
}
console.log('Typography identity OK: Coming Soon');
