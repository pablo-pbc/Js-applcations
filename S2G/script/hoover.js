//Function to feed the textarea element
function loopTxtArea() {
    const nodeList = document.querySelectorAll(".item.selected .pdv-automation > div a");
    const txtArea = document.getElementById("codigo");
    let drop = 'dropDown'
  
    txtArea.value = "";
  
    for (let i = 0; i < nodeList.length; i++) {
      let beginElementComment = `<!-- Inicio ${drop} 0${i + 1} -->`;
      let endElementComment = `<!-- Final ${drop} 0${i + 1} -->`;
      let copyHtml = nodeList[i].outerHTML;
  
      document.getElementById("codigo").value += `${beginElementComment}\n${copyHtml}\n${endElementComment}\n\n`;
    }
    return txtArea;
}
  
//Function to save the backup file
function saveBackup() {
    const date = new Date();
    const hours = date.getHours("pt-br");
    const min = date.getMinutes("pt-br");
    const today = date.toLocaleDateString("pt-br");

    const link = document.createElement("a");
    const file = new Blob([loopTxtArea().value], { type: "text/plain" });

    link.href = URL.createObjectURL(file);
    link.download = `backup_${today}_${hours}h-${min}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    document.getElementById("buildButton").disabled = false;
}

//Function to copy the HTML after input's insertions
function copyHtml() {
    // Selecting the content inside the textarea
    loopTxtArea().select();
    // Selecting the content inside the textarea for mobile devices
    loopTxtArea().setSelectionRange(0, 99999);
    // Copy the text inside the textarea field
    navigator.clipboard.writeText(loopTxtArea().value);  
}
  
//Function to add the Banner's informations
function buildHtml() {
    const nodeList = document.querySelectorAll(".item.selected .pdv-automation > div a");
    const prefix = "https://dpmhyxrn33nxe.cloudfront.net";
    let flag = 0;
    let i = 0;   

    while (i < nodeList.length && flag < 1) {
        let HooverPosition = i + 1;
        //Importing the input's values
        let linkHoover = document.querySelector(`#HooverForm > section:nth-child(${HooverPosition}) > div:nth-child(2) > input[type=text]`).value;
        let imgHoover = document.querySelector(`#HooverForm > section:nth-child(${HooverPosition}) > div:nth-child(3) > input[type=text]`).value;
        let altHoover = document.querySelector(`#HooverForm > section:nth-child(${HooverPosition}) > div:nth-child(4) > input[type=text]`).value;  
        let checkBox =  document.querySelector(`#HooverForm > section:nth-child(${HooverPosition}) > div:nth-child(5) > input[type=checkbox]`).checked;
        
        //Choosing HTML element
        let resultlinkHoover = document.querySelector(`.item.selected > .pdv-automation > div > a:nth-child(${HooverPosition})`);

        if (linkHoover.length < 3 || imgHoover.length < 3 || altHoover.length < 3) {
            flag = 1;
            alert("Favor preencher todos os campos corretamente");
        } else if (checkBox) {
            // Quando o primeiro checkbox é marcado, desmarca o segundo checkbox
            resultlinkHoover.style.display = 'none'
        } else {
            resultlinkHoover.style.display = 'block'        

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
        console.log('ta no while')
        i++;        
    }
    console.log('saiu do while')
    document.getElementById("copyHtmlButton").disabled = false;
}
  
//Function to create form following pdv's quantity
window.onload = function buildHooverForms() {
    const homeSlideList = document.querySelectorAll(".item.selected .box-hoover a");
    const appendFormReference = document.querySelector("#HooverForm");

    for (let i = 0; i < homeSlideList.length; i++) {
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

                <div>
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
  
function swapFormElementPositions() {
    const elements = document.querySelectorAll(".pbcForm");
    const elements2 = document.getElementById("HooverForm");
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
  
function draggFormElement() {
    const elements = document.querySelectorAll(".pbcForm");
    let draggingElement;

    elements.forEach((element) => {
        element.addEventListener("dragstart", (e) => {
            draggingElement = e.target;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", null);
            element.classList.add("dragging");
        });

        element.addEventListener("dragend", (e) => {
            draggingElement = null;
            element.classList.remove("dragging");
        });

        element.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        element.addEventListener("drop", (e) => {
            e.preventDefault();

            if (draggingElement === element) {
                return;
            }

            const container = element.parentNode;
            const draggingIndex = parseInt(draggingElement.dataset.index);
            const targetIndex = parseInt(element.dataset.index);

            if (draggingIndex < targetIndex) {
                container.insertBefore(draggingElement, element.nextSibling);
            } else {
                container.insertBefore(draggingElement, element);
            }

            // Update the data-index attributes of all elements to reflect their new positions
            const updatedElements = document.querySelectorAll(".pbcForm");
            updatedElements.forEach((el, index) => {
                el.dataset.index = index;
            });
        });
    });
}
  
// focus input
setTimeout(() => {
    const nodeList = document.querySelectorAll("#HooverForm input");
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
  
// function select
setTimeout(() => {
    var selectOption = document.getElementById("select-option");
    if (selectOption) {
        selectOption.addEventListener("change", function () {
            var selectedOption = this.value;
            var items = document.querySelectorAll(".item");
            var selectedItems = document.querySelectorAll('.item[data-option="' + selectedOption + '"]');

            const element = document.querySelectorAll("#HooverForm section");

            items.forEach(function (item) {
                item.classList.remove("selected");
            });            

            selectedItems.forEach(function (item) {
                item.classList.add("selected");
            });            

            for (i = 0; i < element.length; i++) {
                element[i].remove();
            }

            setTimeout(() => {
                window.onload();
            }, 1000);
        });
    }
}, 1000);

/* Mobile */  
function toggleClass(elementId, className) {
    const element = document.getElementById("HooverForm");
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}
  