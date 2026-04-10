const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('PitchSnap_Redesign_PRD_TRD.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('PitchSnap_Redesign_PRD_TRD.md', data.text);
    console.log("PDF parsed and written to PitchSnap_Redesign_PRD_TRD.md!");
});
