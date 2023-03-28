//Function to add the Banner's informations
function buildHomeSlide() {
  const nodeList = document.querySelectorAll(`.box-banner`);
  const prefix = "https://dybvctjo56z4b.cloudfront.net";
  let flag = 0;
  let i = 0;  

  while (i < nodeList.length && flag < 1) {

    //Importing the input's values
    let linkBannerMasc = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(2) > input[type=text]`).value;
    let bannerDeskMasc = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(3) > input[type=text]`).value;
    let bannerMobileMasc = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(4) > input[type=text]`).value;
    let altBannerMasc = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(5) > input[type=text]`).value;

    //Choosing HTML element
    let resultLinkBannerMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a`);
    let resultBannerDeskMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > img`);
    let resultBannerMobileMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > source`);

    if (linkBannerMasc.length < 3 || bannerDeskMasc.length < 3 || bannerMobileMasc.length < 3 || altBannerMasc.length < 3) {
        flag = 1;
        alert('Favor preencher todos os campos corretamente');         
    } else {
        let urlDesk = bannerDeskMasc;
        let pathDesk = new URL(urlDesk).pathname.substring(1);
        let finalLinkDesk = prefix + "/" + pathDesk;
    
        let urlMobile = bannerMobileMasc;
        let pathMobile = new URL(urlMobile).pathname.substring(1);
        let finalLinkMobile = prefix + "/" + pathMobile;

        resultLinkBannerMasc.href = linkBannerMasc;
        resultBannerDeskMasc.src = finalLinkDesk;
        resultBannerDeskMasc.alt = altBannerMasc;
        resultBannerMobileMasc.srcset = finalLinkMobile;
    };        
    i++;
  } 
    
  btnCopyhtml.disabled = false;
  btnCopyhtml.style.color = '#264653'
  btnCopyhtml.style.border = '1px solid #264653'

  btnCopyhtml.addEventListener("mouseover", function() {
      btnCopyhtml.style.backgroundColor = "#c7f9cc";        
      btnCopyhtml.style.cursor = "pointer";
  });

  btnCopyhtml.addEventListener("mouseout", function() {
      btnCopyhtml.style.backgroundColor = "#fff";
  });
  alert('Código HTML montado com sucesso!');
};

//Function to create form following banner's quantity
window.onload = function buildpdvForms() {
  const nodeList = document.querySelectorAll(`.box-banner`);
  const appendFormReference = document.querySelector('#pdvForm');

  for (let i = 0; i < nodeList.length; i++) {
    let attributesLinkBannerMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a`);
    let attributesBannerDeskMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > img`);
    let attributesBannerMobileMasc = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > source`);
    let inputHtmlSection = `
        <section class='pbcForm ar_form' draggable="true" data-index="${i}">
        <h2>Banner 0${i+1}</h2>        
        <div>
            <label>Link:</label>
            <input type='text' value="${attributesLinkBannerMasc.href}" required></input>
        </div>
    
        <div>
            <label>Imagem Desk:</label>
            <input type='text' value="${attributesBannerDeskMasc.src}" required></input>
        </div>
    
        <div>
            <label>Imagem Mobile:</label>
            <input type='text' value="${attributesBannerMobileMasc.srcset}" required></input>
        </div>
    
        <div>
            <label>Alt:</label>
            <input type='text' value="${attributesBannerDeskMasc.alt}" required></input>
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
  }
}

function swapFormElementPositions() {
  const elements = document.querySelectorAll(".pbcForm");
  const elements2 = document.getElementById("pdvForm");
  let firstElement = null;

  elements.forEach((element) => {
      element.addEventListener("click", () => {
          if (firstElement === null) {
              firstElement = element;
              element.classList.add("selected");
          } else {

              const container = element.parentNode;
              const firstIndex = parseInt(firstElement.dataset.index);
              const secondIndex = parseInt(element.dataset.index);

              if (firstIndex !== secondIndex && elements2.classList == "grid-mob-position") {
                  const temp = document.createElement("div");
                  container.insertBefore(temp, element);
                  container.insertBefore(element, firstElement);
                  container.insertBefore(firstElement, temp);
                  temp.remove();
              }

              firstElement.classList.remove("selected");
              firstElement = null;
          }
      });
  });
}

// focus input
setTimeout(() => {
  const nodeList = document.querySelectorAll("#pdvForm input");
  for (var i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener("focusout", (event) => {
      const button = document.querySelectorAll(".pbcForm");
      for (var i = 0; i < button.length; i++) {
        button[i].setAttribute("draggable", "true");
      }
    });
    nodeList[i].addEventListener("focus", (event) => {
      const button = document.querySelectorAll(".pbcForm");
      for (var i = 0; i < button.length; i++) {
        button[i].setAttribute("draggable", "false");
      }
    });
  }
}, 1000);

/* Mobile */  
function toggleClass(elementId, className) {
  const element = document.getElementById("pdvForm");
  if (element.classList.contains(className)) {
      element.classList.remove(className);
  } else {
      element.classList.add(className);
  }
}