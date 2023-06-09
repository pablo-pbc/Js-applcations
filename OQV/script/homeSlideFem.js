//Function to add the Banner's informations
function buildHtml() {
  const nodeList = document.querySelectorAll(`.box-banner`);
  const prefix = "https://dybvctjo56z4b.cloudfront.net";
  let flag = 0;

  for (i = 0 ; i < nodeList.length && flag < 1; i++) {

    //Importing the input's values
    let linkBannerFem = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(2) > input[type=text]`).value;
    let bannerDeskFem = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(3) > input[type=text]`).value;
    let bannerMobileFem = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(4) > input[type=text]`).value;
    let altBannerFem = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(5) > input[type=text]`).value;

    //Choosing HTML element
    let resultLinkBannerFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a`);
    let resultBannerDeskFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > img`);
    let resultBannerMobileFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > source`);

    if (linkBannerFem.length < 3 || bannerDeskFem.length < 3 || bannerMobileFem.length < 3 || altBannerFem.length < 3) {
        flag = 1;
        alert('Favor preencher todos os campos corretamente');         
    } else {
        let urlDesk = bannerDeskFem;
        let pathDesk = new URL(urlDesk).pathname.substring(1);
        let finalLinkDesk = prefix + "/" + pathDesk;
    
        let urlMobile = bannerMobileFem;
        let pathMobile = new URL(urlMobile).pathname.substring(1);
        let finalLinkMobile = prefix + "/" + pathMobile;

        resultLinkBannerFem.href = linkBannerFem;
        resultBannerDeskFem.src = finalLinkDesk;
        resultBannerDeskFem.alt = altBannerFem;
        resultBannerMobileFem.srcset = finalLinkMobile;
    };  
  }; 

  if (saveBtnCliked) {  
    copyBtnDisabledFalse();

    btnBuildHtml.innerText = 'Código montado com sucesso!';
    btnBuildHtml.style.color = '#38b000';
    btnBuildHtml.style.border = "2px solid #38b000";
  }
};

//Function to create form following banner's quantity
window.onload = function buildpdvForms() {
  const nodeList = document.querySelectorAll(`.box-banner`);
  const appendFormReference = document.querySelector('#pdvForm');

  for (let i = 0; i < nodeList.length; i++) {
    let attributesLinkBannerFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a`);
    let attributesBannerDeskFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > img`);
    let attributesBannerMobileFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > source`);
    let inputHtmlSection = `
        <section class='pbcForm ar_form' draggable="true" data-index="${i}">
        <h2>Banner 0${i+1}</h2>        
        <div>
            <label>Link:</label>
            <input type='text' value="${attributesLinkBannerFem.href}" required></input>
        </div>
    
        <div>
            <label>Imagem Desk:</label>
            <input type='text' value="${attributesBannerDeskFem.src}" required></input>
        </div>
    
        <div>
            <label>Imagem Mobile:</label>
            <input type='text' value="${attributesBannerMobileFem.srcset}" required></input>
        </div>
    
        <div>
            <label>Alt:</label>
            <input type='text' value="${attributesBannerDeskFem.alt}" required></input>
        </div>
        </section>
    `;
    appendFormReference.innerHTML += `${inputHtmlSection}\n`;       
  } 

  var x = window.matchMedia("(max-width: 700px)");  

  if (x.matches) {
    // If media query matches
    swapFormElementPositions();
  } else {
    draggFormElement();
  };
  inputFocusOnOff();
}