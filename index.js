const PDFExtract = require("pdf.js-extract").PDFExtract;
const docxConverter = require('docx-pdf');
const pdfExtract = new PDFExtract();
const fs = require("fs");
const buffer = fs.readFileSync("./demo_pdf.pdf");
const options = {};

const dataToSearch = ["Signature:", "Date:", "ARE YOU WEARING CONTACT LENSES?"];

//result

const result = {};

dataToSearch.forEach((data) => {
  result[data] = [];
});

const extractTextFromPdf = () => {
    pdfExtract.extractBuffer(buffer, options, (err, data) => {
        if (err) return console.log(err);
        //console.log(data);
        if (data.pages) {
          data.pages.forEach((pageData) => {
            const { pageInfo, content } = pageData;
            if (content) {
              //loop through the content
              content.forEach((textContent) => {
                dataToSearch.forEach((stringContentToSearch) => {
                  if (
                    textContent &&
                    textContent.str.indexOf(stringContentToSearch) > -1
                  ) {
                    result[stringContentToSearch].push({
                      //pageInfo, textContent
                      ...pageInfo,
                      ...textContent,
                    });
                  }
                });
              });
            }
          });
        }
        console.log(JSON.stringify(result));
      });
};


docxConverter('./xyz.doc','./Hi.pdf',function(err,result){
    if(err){
      console.log(err);
    }
    console.log('result'+result);
});

