import { jsPDF } from "jspdf";

export interface PDFExportData {
  clientName: string;
  service: string;
  coldEmail: string;
  linkedinOutreach: string;
  fullProposal: string;
  followUpSequence: string;
  pricingRange: string;
}

export async function exportProposalPDF(data: PDFExportData) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  
  // Header Background: Dark #0C0C0C
  pdf.setFillColor(12, 12, 12);
  pdf.rect(0, 0, pageWidth, 297, "F");
  
  // Header Logo "PITCHSNAP."
  pdf.setTextColor(245, 245, 245);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("PITCHSNAP.", 20, 25);
  
  // Subheader
  pdf.setFontSize(11);
  pdf.setTextColor(136, 136, 136); // Muted gray
  pdf.text(`PROPOSAL PACKAGE — ${data.clientName.toUpperCase()}`, 20, 35);
  
  // Generated Date
  const dateStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());
  pdf.text(`Generated: ${dateStr}`, 20, 42);

  // Divider
  pdf.setDrawColor(30, 30, 30);
  pdf.line(20, 50, pageWidth - 20, 50);

  // Helper function to render text sections safely with word wrapping
  const renderSection = (title: string, content: string, startY: number) => {
    let currentY = startY;
    
    // Add page if near bottom
    if (currentY > 260) {
      pdf.addPage();
      pdf.setFillColor(12, 12, 12);
      pdf.rect(0, 0, pageWidth, 297, "F");
      currentY = 30; // reset
    }

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(184, 255, 87); // PitchSnap Green accent
    pdf.text(title.toUpperCase(), 20, currentY);
    currentY += 8;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(245, 245, 245);
    
    const lines = pdf.splitTextToSize(content, pageWidth - 40);
    
    for (let i = 0; i < lines.length; i++) {
      if (currentY > 270) {
        pdf.addPage();
        pdf.setFillColor(12, 12, 12);
        pdf.rect(0, 0, pageWidth, 297, "F");
        currentY = 30;
        pdf.setTextColor(245, 245, 245);
      }
      pdf.text(lines[i], 20, currentY);
      currentY += 6;
    }
    
    return currentY + 12; // margin bottom
  };

  let cursorY = 65;
  cursorY = renderSection("1. COLD EMAIL", data.coldEmail, cursorY);
  cursorY = renderSection("2. LINKEDIN OUTREACH", data.linkedinOutreach, cursorY);
  cursorY = renderSection("3. PROJECT PROPOSAL", data.fullProposal, cursorY);
  cursorY = renderSection("4. FOLLOW-UP SEQUENCE", data.followUpSequence, cursorY);
  renderSection("5. PRICING TIMELINE", data.pricingRange, cursorY);

  pdf.save(`pitchsnap-${data.clientName.replace(/\s+/g, '-').toLowerCase()}-proposal.pdf`);
}
