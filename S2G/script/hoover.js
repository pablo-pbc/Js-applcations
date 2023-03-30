//Function to create form following pdv's quantity
window.onload = function buildForm() {    
    const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
    const appendFormReference = document.querySelector("#pdvForm");    

    for (let i = 0; i < nodeList.length; i++) {
        let attributeslinkHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1})`);
        let attributesimgHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1}) > img`);

        let inputHtmlSection = `
                <section class='pbcForm ar_form' draggable="true" data-index="${i}">
                <h2>Hoover 0${i + 1}</h2>        
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

                <div class="input_checkbox">
                    <label>Marque aqui, caso queira remover essa imagem!</label>
                    <input type="checkbox">                  
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
};

//Function to add the Banner's informations
function buildHtml() {
    const nodeList = document.querySelectorAll(`div.item.selected > div > div > a`);
    const prefix = "https://dpmhyxrn33nxe.cloudfront.net";
    let flag = 0;
    let i = 0;   

    while (i < nodeList.length && flag < 1) {
        //Importing the input's values
        let linkHoover = document.querySelector(`#pdvForm > section:nth-child(${i + 1}) > div:nth-child(2) > input[type=text]`).value;
        let imgHoover = document.querySelector(`#pdvForm > section:nth-child(${i + 1}) > div:nth-child(3) > input[type=text]`).value;
        let altHoover = document.querySelector(`#pdvForm > section:nth-child(${i + 1}) > div:nth-child(4) > input[type=text]`).value;  
        let checkBox =  document.querySelector(`#pdvForm > section:nth-child(${i + 1}) > div:nth-child(5) > input[type=checkbox]`).checked;
        
        //Choosing HTML element
        let resultlinkHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${i + 1})`);

        if (linkHoover.length < 3 || imgHoover.length < 3 || altHoover.length < 3) {
            flag = 1;
            alert("Favor preencher todos os campos corretamente");
        } else if (checkBox) {
            // Quando o primeiro checkbox é marcado, desmarca o segundo checkbox
            resultlinkHoover.style.display = 'none'
        } else {
            resultlinkHoover.removeAttribute('style')

            let originUrl = new URL(imgHoover).origin;
            let pathNameUrl = new URL(imgHoover).pathname.substring(1)
            let pathNameUrlS3 = new URL(imgHoover).pathname.substring(26)
            let finalUrl = null

            if (originUrl == prefix) {
                finalUrl = prefix + "/" + pathNameUrl
            } else {
                finalUrl = prefix + "/" + pathNameUrlS3
            }                      

            resultlinkHoover.href = linkHoover;
            resultlinkHoover.innerHTML =`<img src=${finalUrl} alt=${altHoover} border="0" />${altHoover}` ;
        }
        i++;        
    }
    copyBtnDisabledFalse();
    
    btnBuildHtml.innerText = 'Código montado com sucesso!';
    btnBuildHtml.style.color = '#38b000';
    btnBuildHtml.style.border = "2px solid #38b000";
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
  