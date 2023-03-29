
//Function to add the pdv informations
function buildHtml() {
  const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
  const prefix = "https://dybvctjo56z4b.cloudfront.net";
  let flag = 0;

  for (i = 0; i < nodeList.length && flag < 1; i++) {
    
    //Importing the input's values
    let linkDropDown = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(2) > input[type=text]`).value;
    let imgDropDown = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(3) > input[type=text]`).value;
    let altDropDown = document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(4) > input[type=text]`).value;
    let checkBox =  document.querySelector(`#pdvForm > section:nth-child(${i+1}) > div:nth-child(5) > input[type=checkbox]`).checked;

    //Choosing HTML element
    let resultDropDown = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i+1})`);

    if (linkDropDown.length < 3 || imgDropDown.length < 3 || altDropDown.length < 3) {
      flag = 1;
      alert("Favor preencher todos os campos corretamente");
    } else if (checkBox) {
      // Quando o primeiro checkbox é marcado, desmarca o segundo checkbox
      resultDropDown.style.display = 'none'
    } else {
      resultDropDown.removeAttribute("style");

      let originUrl = new URL(imgDropDown).origin;
      let pathNameUrl = new URL(imgDropDown).pathname.substring(1)
      let pathNameUrlS3 = new URL(imgDropDown).pathname.substring(26)
      let finalUrl = null

      if (originUrl == prefix) {
          finalUrl = prefix + "/" + pathNameUrl
      } else {
          finalUrl = prefix + "/" + pathNameUrlS3
      }                     

      resultDropDown.href = linkDropDown;
      resultDropDown.innerHTML =`<img src=${finalUrl} alt=${altDropDown} border="0" />${altDropDown}` ;
    }
  };
  copyBtnDisabledFalse();

  btnBuildHtml.innerText = 'Código montado com sucesso!';
  btnBuildHtml.style.color = '#38b000';
  btnBuildHtml.style.border = "2px solid #38b000";
};

//Function to create form following pdv quantity
window.onload = function buildHtmlForm() {
  const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
  const appendFormReference = document.getElementById("pdvForm");

  for (let i = 0; i < nodeList.length; i++) {
      let attributeslinkDropDown = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1})`);
      let attributesimgDropDown = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1}) > img`);

      let inputHtmlSection = `
              <section class='pbcForm ar_form' draggable="true" data-index="${i}">
              <h2>Dropdown 0${i+1}</h2>        
              <div>
                  <label>Link:</label>
                  <input type='text' value="${attributeslinkDropDown.href}" required></input>
              </div>
          
              <div>
                  <label>Imagem Desk:</label>
                  <input type='text' value="${attributesimgDropDown.src}" required></input>
              </div>
          
              <div>
                  <label>Alt:</label>
                  <input type='text' value="${attributesimgDropDown.alt}" required></input>
              </div>

              <div class='input_checkbox'>
                  <label>Marque aqui, caso queira remover este dropdown!</label>
                  <input type="checkbox">                  
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
};

function swapFormElementPositions() {
  const elements = document.querySelectorAll(".pbcForm");
  const elements2 = document.getElementById("pdvForm");
  let firstElement = null;

  elements.forEach((element) => {
    element.addEventListener("click", () => {
      if (firstElement === null) {
        firstElement = element;
        element.classList.add("selected");
        console.log("elements2", elements2.classList);
      } else {
        const container = element.parentNode;
        const firstIndex = parseInt(firstElement.dataset.index);
        const secondIndex = parseInt(element.dataset.index);

        if (
          firstIndex !== secondIndex &&
          elements2.classList == "grid-mob-position"
        ) {
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
}, 2000);  

/* Mobile */  
function toggleClass(elementId, className) {
  const element = document.getElementById("pdvForm");
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
