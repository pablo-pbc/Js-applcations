
//Function to add the pdv informations
function buildHtml() {
  const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
  const prefix = "https://dpmhyxrn33nxe.cloudfront.net";
  let flag = 0;

  for (i = 0; i < nodeList.length && flag < 1; i++) {
    //Importing the input's values
    let linkHoover = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(2) > input[type=text]`).value;
    let imgHoover = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(3) > input[type=text]`).value;
    let altHoover = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(4) > input[type=text]`).value;

    //Choosing HTML element
    let resultHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i+1})`);

    //Checking the input's length
    if (linkHoover.length < 3 || imgHoover.length < 3 || altHoover.length < 3) {

      flag = 1;
      alert("Favor preencher todos os campos corretamente");

    } else {

      resultHoover.removeAttribute("style");

      let originUrl = new URL(imgHoover).origin;
      let pathNameUrl = new URL(imgHoover).pathname.substring(1)
      let pathNameUrlS3 = new URL(imgHoover).pathname.substring(26)
      let finalUrl = null

      if (originUrl == prefix) {
        finalUrl = prefix + "/" + pathNameUrl
      } else {
        finalUrl = prefix + "/" + pathNameUrlS3
      }                     

      resultHoover.href = linkHoover;
      resultHoover.childNodes[0].src = finalUrl;
      resultHoover.childNodes[0].alt = altHoover;
      resultHoover.childNodes[0].border = 0;
      resultHoover.childNodes[1].textContent = altHoover;
    }
  };

  if (saveBtnCliked) {  
    copyBtnDisabledFalse();

    btnBuildHtml.innerText = 'Código montado com sucesso!';
    btnBuildHtml.style.color = '#38b000';
    btnBuildHtml.style.border = "2px solid #38b000";
  }
};
  
//Function to create form following pdv quantity
window.onload = function buildHtmlForm() {
  const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
  const appendFormReference = document.getElementById("pdvForm");
  
  for (let i = 0; i < nodeList.length; i++) {
      let attributeslinkHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1})`);
      let attributesimgHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1}) > img`);

      let inputHtmlSection = `
              <section class='pbcForm ar_form' draggable="true" data-index="${i}">
              <h2>Hoover 0${i+1}</h2>        
              <div>
                  <label>Link:</label>
                  <input type='text' value="${attributeslinkHoover.href}" required></input>
              </div>
          
              <div>
                  <label>Imagem Desk:</label>
                  <input type='text' value="${attributesimgHoover.src}" required></input>
              </div>
          
              <div>
                  <label>Alt:</label>
                  <input type='text' value="${attributesimgHoover.alt}" required></input>
              </div>
              </section>
          `;
      appendFormReference.innerHTML += `${inputHtmlSection}\n`;
  };

  var x = window.matchMedia("(max-width: 700px)");  

  if (x.matches) {
    // If media query matches
    swapFormElementPositions();
  } else {
    draggFormElement();
  };
  inputFocusOnOff();
};