import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

let dataBuffer = fs.readFileSync('PitchSnap_Redesign_PRD_TRD.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('PitchSnap_Redesign_PRD_TRD.md', data.text);
    console.log("PDF parsed!");
});
