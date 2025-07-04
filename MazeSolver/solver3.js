function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF('landscape'); // Create a PDF in landscape mode

    let canvas = document.getElementById('canvas');
    let imgData = canvas.toDataURL('image/png'); // Convert canvas to image

    let pageWidth = pdf.internal.pageSize.getWidth();
    let pageHeight = pdf.internal.pageSize.getHeight();

    let imgWidth = canvas.width;
    let imgHeight = canvas.height;

    // Scale the image to fit within the page
    let scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    let imgX = (pageWidth - imgWidth * scaleFactor) / 2;
    let imgY = (pageHeight - imgHeight * scaleFactor) / 2;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * scaleFactor, imgHeight * scaleFactor);
    pdf.save("solved_maze.pdf"); // Save PDF file
}
