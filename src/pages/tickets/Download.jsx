import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const Download = ({ elementId, fileName }) => {
  const downloadFileDocument = () => {
    const input = document.getElementById(elementId);

    html2canvas(input).then((canva) => {
      // const imgData = canva.toDataURL('image/png')
      // const pdf = new jsPDF("landscape", "pt", "a1")
      // pdf.addImage(imgData, "JPEG", 60, 100)
      // pdf.save(`${fileName}`)

      let imgData = canva.toDataURL("image/jpeg");
      let imgWidth = 210;
      let pageHeight = 350;
      let imgHeight = (canva.height * imgWidth) / canva.width;
      let heightLeft = imgHeight;
      let pdf = new jsPDF("p", "mm");
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${fileName}`);
    });
  };

  return (
    <div>
      <p onClick={downloadFileDocument}>Download</p>
    </div>
  );
};

export default Download;
