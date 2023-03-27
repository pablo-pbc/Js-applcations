
//Function to add the Banner's informations
function buildHomeSlide() {
  let flag = 0;
  let i = 0;

  while (i < nodeList.length && flag < 1) {

    //Importing the input's values
    let linkBannerMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${i+1}) > div:nth-child(2) > input[type=text]`
    ).value;
    let bannerDeskMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${i+1}) > div:nth-child(3) > input[type=text]`
    ).value;
    let bannerMobileMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${i+1}) > div:nth-child(4) > input[type=text]`
    ).value;
    let altBannerMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${i+1}) > div:nth-child(5) > input[type=text]`
    ).value;

    //Choosing HTML element
    let resultLinkBannerMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i+1}) > a`
    );
    let resultBannerDeskMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i+1}) > a > picture > img`
    );
    let resultBannerMobileMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i+1}) > a > picture > source`
    );

    if (
      linkBannerMasc.length < 3 &&
      bannerDeskMasc.length < 3 &&
      bannerMobileMasc.length < 3 &&
      altBannerMasc.length < 3
    ) {
      flag = 1;
      alert("Favor preencher todos os campos corretamente");
    } else {
      resultLinkBannerMasc.href = linkBannerMasc;
      resultBannerDeskMasc.src = bannerDeskMasc;
      resultBannerDeskMasc.alt = altBannerMasc;
      resultBannerMobileMasc.srcset = bannerMobileMasc;
    }
    i++;
  }
}

//Function to create form following banner's quantity
window.onload = function buildHomeSlideForms() {
  const formBackground = document.getElementsByClassName("pbcForm");
  const appendFormReference = document.querySelector("#homeSlideForm");
  const hexBgForm = [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#588157",
  ];

  for (let i = 0; i < nodeList.length; i++) {
    let attributesLinkBannerMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i + 1}) > a`
    );
    let attributesBannerDeskMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i + 1}) > a > picture > img`
    );
    let attributesBannerMobileMasc = document.querySelector(
      `.pdv-automation div:nth-child(${i + 1}) > a > picture > source`
    );
    let inputHtmlSection = `
          <section class='pbcForm' draggable="true" data-index="${i}">
          <h2>Banner 0${i + 1}</h2>        
          <div>
              <label>Link:</label>
              <input type='text' value="${
                attributesLinkBannerMasc.href
              }" required></input>
          </div>
      
          <div>
              <label>Imagem Desk:</label>
              <input type='text' value="${
                attributesBannerDeskMasc.src
              }" required></input>
          </div>
      
          <div>
              <label>Imagem Mobile:</label>
              <input type='text' value="${
                attributesBannerMobileMasc.srcset
              }" required></input>
          </div>
      
          <div>
              <label>Alt:</label>
              <input type='text' value="${
                attributesBannerDeskMasc.alt
              }" required></input>
          </div>
          </section>
      `;
    appendFormReference.innerHTML += `${inputHtmlSection}\n`;
  }

  for (let k = 0; k < formBackground.length; k++) {
    formBackground[k].style.backgroundColor = hexBgForm[k];
  }
  draggFormElement();
};

// focus input
setTimeout(() => {
  const nodeList = document.querySelectorAll("#homeSlideForm input");
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
