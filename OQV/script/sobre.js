
//Function to add the pdv informations
function buildHtml() {
    const prefix = "https://dybvctjo56z4b.cloudfront.net";

    //Importing the input's values
    const linkSobre = document.querySelector(`#pdvForm > section > div:nth-child(2) > input[type=text]`).value;
    const imgSobre = document.querySelector(`#pdvForm > section > div:nth-child(3) > input[type=text]`).value;
    const altSobre = document.querySelector(`#pdvForm > section > div:nth-child(4) > input[type=text]`).value;
    const firstParaf = document.querySelector(`#pdvForm > section > div:nth-child(5) > input[type=text]`).value;
    const secParaf = document.querySelector(`#pdvForm > section > div:nth-child(6) > input[type=text]`).value;

    //Choosing HTML element
    const resultSobreImg = document.querySelector(`div.item.selected > div > div.box-sobre #col-dir > a > img`);
    const resultSobreFirstParaf = document.querySelector(`div.item.selected > div > div.box-sobre #col-esq > p:nth-child(2)`);
    const resultSobreSecParaf = document.querySelector(`div.item.selected > div > div.box-sobre #col-esq > p:nth-child(3)`);

    //Checking the input's length
    if (linkSobre.length < 3 || imgSobre.length < 3 || altSobre.length < 3) {
        alert("Favor preencher todos os campos corretamente");
    } else {
        //resultSobre.removeAttribute("style");

        let originUrl = new URL(imgSobre).origin;
        let pathNameUrl = new URL(imgSobre).pathname.substring(1);
        let pathNameUrlS3 = new URL(imgSobre).pathname.substring(1);
        let finalUrl = null;

        if (originUrl == prefix) {
            finalUrl = prefix + "/" + pathNameUrl;
        } else {
            finalUrl = prefix + "/" + pathNameUrlS3;
        };                     

        resultSobreImg.href = linkSobre;
        resultSobreImg.src = finalUrl;
        resultSobreImg.alt = altSobre;
        resultSobreFirstParaf.innerText = firstParaf;
        resultSobreSecParaf.innerText = secParaf;
    };
  
    if (saveBtnCliked) {  
      copyBtnDisabledFalse();
  
      btnBuildHtml.innerText = 'Código montado com sucesso!';
      btnBuildHtml.style.color = '#38b000';
      btnBuildHtml.style.border = "2px solid #38b000";
    };
  };
  
  //Function to create form following pdv quantity
  window.onload = function buildHtmlForm() {
    const attributeFirstParaf = document.querySelector(`div.item.selected > div > div.box-sobre #col-esq > p:nth-child(2)`);
    const attributeSecParaf = document.querySelector(`div.item.selected > div > div.box-sobre #col-esq > p:nth-child(3)`);
    const attributesimgSobre = document.querySelector(`div.item.selected > div > div.box-sobre #col-dir > a > img`);
    const attributeslinkSobre = document.querySelector(`div.item.selected > div > div.box-sobre #col-dir > a`);
    const appendFormReference = document.getElementById("pdvForm");    
    const selectElement = document.getElementById('select-option');
    const selectedOption = selectElement.options[selectElement.selectedIndex]; // Seleciona o option selecionado
    const selectedText = selectedOption.textContent; // Recupera o texto do option selecionado

    const inputHtmlSection = `
            <section class='pbcForm'>
                <h2>Sobre ${selectedText}</h2>        
                <div>
                    <label>Link:</label>
                    <input type='text' value="${attributeslinkSobre.href}" required></input>
                </div>
            
                <div>
                    <label>Imagem Desk:</label>
                    <input type='text' value="${attributesimgSobre.src}" required></input>
                </div>
            
                <div>
                    <label>Alt:</label>
                    <input type='text' value="${attributesimgSobre.alt}" required></input>
                </div>

                <div>
                    <label>Primeiro parágrafo:</label>
                    <input type='text' value="${attributeFirstParaf.innerText}" required></input>
                </div>

                <div>
                    <label>Segundo parágrafo:</label>
                    <input type='text' value="${attributeSecParaf.innerText}" required></input>
                </div> 
            </section>
        `;
    appendFormReference.innerHTML += `${inputHtmlSection}\n`;

    if (pdvName === 'sobreMascFem') {
        const gridForm = document.querySelector('form#pdvForm');
        const btnSection = document.querySelector('body > main.pbc-pdv-automation-form > section.pbc-btn-txtarea');
        let screenWidth = window.matchMedia("(max-width: 700px)");  

        gridForm.style.gridTemplateColumns = '1fr';

        if (screenWidth.matches) {
            gridForm.style.width = "100%";
            btnSection.style.width = "100%";             
        } else {
            gridForm.style.width = "60%";
            btnSection.style.width = "40%";            
        };
    };

    inputFocusOnOff();
  }; 