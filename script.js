function generateFrontPage() {
  const name = document.getElementById("studentName").value;
  const usn = document.getElementById("usn").value;
  const section = document.getElementById("section").value;
  const assignmentNo = document.getElementById("assignmentNo").value;
  const topic = document.getElementById("topic").value;
  const subject = document.getElementById("subject").value;
  const teacherName = document.getElementById("teacherName").value;
  const topicType = document.getElementById("topicType").value;
  const department = document.getElementById("department").value;

  const frontHTML = `
    <div style="
      width: 210mm;
      min-height: 297mm;
      padding: 30mm 20mm;
      font-family: 'Times New Roman', Times, serif;
      box-sizing: border-box;
      text-align: center;
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: white;
    ">
      <div>
        <h3 style="margin: 0;">Srishyla Educational Trust ®</h3>
        <h1 style="margin: 5px 0 10px; font-size: 60px; font-weight: bold;">GM UNIVERSITY</h1>
        <p style="margin: 0;">(Established under the Karnataka State Act No. 19 of 2023)</p>
        <p style="margin: 0;">Post Box No. 4, Davanagere - 577006</p>
        <div style="margin: 25px 0;">
          <img src="https://i.postimg.cc/KvhJ6pCj/gm-logo.jpg"
               alt="GM University Logo"
               style="max-width: 200px; height: auto;" />
        </div>
      </div>

     <div style="margin: 10px 0;">
  <h3 style="margin: 0; font-size: 29px;">
    ${subject.split("(")[0].trim()}
  </h3>
  <h4 style="margin: 5px 0 0; font-size: 20px; font-weight: bold;">
    (${subject.split("(")[1]?.replace(")", "").trim()})
  </h4>
  <h4 style="margin: 10px 0; font-size: 22px;">Assignment - ${assignmentNo}</h4>

        <p style="margin: 15px 0; font-size: 25px;
 text-align:center  
 ;"><strong>${topicType}:</strong> ${topic}</p>
        <p style="margin: 20px 0 5px; font-size: 25px;"><strong>Section:</strong> '${section.toUpperCase()}'</p>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 14px; margin-top: 120px;">
        <div style="text-align: left; font-size: 20px;">
          <strong>Submitted By:</strong><br>
          <strong>${name}<br>${usn.toUpperCase()}</strong>
        </div>
        <div style="text-align: left; font-size: 20px;">
  <strong>Submitted To:</strong><br>
  <strong>${teacherName}</strong><br>
  Department of ${department.toUpperCase()}<br>
  GM University<br>
  Davanagere
</div>

    </div>
  `;

  const frontPage = document.getElementById("frontPage");
  frontPage.innerHTML = frontHTML;
  frontPage.style.display = "block";
  document.getElementById("downloadButton").style.display = "inline-block";
}

async function downloadPdf() {
  const { jsPDF } = window.jspdf;
  const element = document.getElementById("frontPage");

  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: 3,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const yPosition = (pageHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
  pdf.save("assignment_front_page.pdf");
}
