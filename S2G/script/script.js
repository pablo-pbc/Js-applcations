//Query selector for all buttons
const btnBuildHtml = document.getElementById("buildButton");
const btnCopyhtml = document.getElementById("copyHtmlButton");
const btnBackup = document.getElementById('backupButton');

const btnAdd = document.querySelector('.pbc-div-add')
const btnAddSpan = document.querySelector('div.pbc-div-add > span')
const btnAddSvg = document.getElementById('plus')

const btnRemove = document.querySelector('.pbc-div-remove')
const btnRemoveSpan = document.querySelector('div.pbc-div-remove > span')
const btnRemoveSvg = document.getElementById('minus')

//Query for current URL and its manipulation
const currentUlrPathname = new URL(window.location.href).pathname.substring(5);
const pdvName = currentUlrPathname.substring(0, currentUlrPathname.lastIndexOf('.'));

//Varible used for flag/alert and dynamic txt
let pdvComment = '';
let saveBtnCliked = false;
let clicks = 0;

//Global function to feed the textarea element
function loopTxtArea() {      
    const txtArea = document.getElementById("codigo");  
    let querySelector = "";    
    let nodeList = null;

    //Switch case that determine the query initial query selector considering the PDV name (name from URL)
    switch (pdvName) {
        case 'hoover':
            querySelector = 'div.item.selected > div > div > a';
            nodeList = document.querySelectorAll(`${querySelector}`);
            pdvComment = document.querySelectorAll(`div.item.selected > div > div`)[0].id;;
            break;
    
        case 'homeSlideFem':
            querySelector = '.box-banner';
            nodeList = document.querySelectorAll(`${querySelector}`);
            pdvComment = 'BannerFem';
            break;
    
        case 'homeSlideMasc':
            querySelector = '.box-banner';
            nodeList = document.querySelectorAll(`${querySelector}`);
            pdvComment = 'BannerMasc';
            break;
    
        default:
            break;
    };    
     
    txtArea.value = "";
  
    for (let i = 0; i < nodeList.length; i++) {
        
      let beginElementComment = `<!-- Inicio ${pdvComment} 0${i + 1} -->`;
      let endElementComment = `<!-- Final ${pdvComment} 0${i + 1} -->`;
      let copyHtml = nodeList[i].outerHTML;
  
      txtArea.value += `${beginElementComment}\n${copyHtml}\n${endElementComment}\n\n`;
    }

    if (pdvName == 'hoover') {
        const nodeStyle = document.querySelector('div.item.selected > div.pdv-automation > div.box-hoover > style');
        txtArea.value += nodeStyle.outerHTML; 
        return txtArea;
    } else {
        return txtArea;
    }
};
  
//Global function to save the backup file
function saveBackup() { 
    //Formanting the current date 
    const date = new Date();
    const hours = date.getHours("pt-br");
    const min = date.getMinutes("pt-br");
    const seg = date.getSeconds("pt-br");
    const today = date.toLocaleDateString("pt-br");

    const link = document.createElement("a");
    const file = new Blob([loopTxtArea().value], { type: "text/plain" });

    link.href = URL.createObjectURL(file);
    link.download = `bkp - ${pdvComment} - ${today} - ${hours}h-${min}min-${seg}s.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    //Flag alert
    saveBtnCliked = true;

    btnBackup.innerText = 'Backup Salvo!';
    btnBackup.disabled = true;
    btnBackup.style.cursor = 'not-allowed'
    btnBackup.style.color = '#38b000';
    btnBackup.style.border = "2px solid #38b000";

    buildBtnDisabledFalse();
};

//Global function to copy the HTML after input's insertions
function copyHtml() {    
    // Selecting the content inside the textarea
    loopTxtArea().select();
    // Selecting the content inside the textarea for mobile devices
    loopTxtArea().setSelectionRange(0, 99999);
    // Copy the text inside the textarea field
    navigator.clipboard.writeText(loopTxtArea().value);  
    
    btnCopyhtml.innerText = 'HTML copiado!';
    btnCopyhtml.style.color = '#38b000';
    btnCopyhtml.style.border = "2px solid #38b000";
};
  
//Global function to drag and drop the current Form
function draggFormElement() {
    //Selecting all forms
    const elements = document.querySelectorAll(".pbcForm");
    let draggingElement;

    elements.forEach((element) => {
        element.addEventListener("dragstart", (e) => {
            if (!saveBtnCliked) {
                saveBackup();
            }
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
            };

            const container = element.parentNode;
            const draggingIndex = parseInt(draggingElement.dataset.index);
            const targetIndex = parseInt(element.dataset.index);

            if (draggingIndex < targetIndex) {
                container.insertBefore(draggingElement, element.nextSibling);
            } else {
                container.insertBefore(draggingElement, element);
            };

            // Update the data-index attributes of all elements to reflect their new positions
            const updatedElements = document.querySelectorAll(".pbcForm");
            updatedElements.forEach((el, index) => {
                el.dataset.index = index;
            });

            buildHtml();
        });

        count = 0
    });
};

//Global function to change BUILD BUTTON style after some input modification
function inputChanging() {
    const inputChanging = document.querySelectorAll('#pdvForm > section > div > input');

    for (let i = 0; i < inputChanging.length; i++) {
        inputChanging[i].addEventListener("input", function () {

            if (!saveBtnCliked) {
                saveBackup();
            };

            btnBuildHtml.innerText = 'Montar HTML';
            btnBuildHtml.style.border = '1px solid #264653';
            btnBuildHtml.style.color = '#264653';
        });    
    };    
};

//Global function to disable the draggable attribute
function inputFocusOnOff() {
    const nodeList = document.querySelectorAll("#pdvForm input");
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener("focusout", (event) => {
        const button = document.querySelectorAll(".pbcForm");
        for (var i = 0; i < button.length; i++) {
            button[i].setAttribute("draggable", "true");
            inputChanging();
        }      
        });

        nodeList[i].addEventListener("focus", (event) => {
        const button = document.querySelectorAll(".pbcForm");
        for (var i = 0; i < button.length; i++) {
            button[i].setAttribute("draggable", "false");
            inputChanging();
        }
        });
    };
};

/* Mobile */  
function toggleClass(elementId, className) {
    const element = document.getElementById("pdvForm");
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    };
};

//Global function for change the element position when mobile
function swapFormElementPositions() {
    const elements = document.querySelectorAll(".pbcForm");
    const elements2 = document.getElementById("pdvForm");
    let firstElement = null;
  
    elements.forEach((element) => {
      element.addEventListener("click", () => {
  
        if (!saveBtnCliked) {
            saveBackup();   
        }          
  
        if (firstElement === null) {
          firstElement = element;
          element.classList.add("selected");
          console.log("elements2", elements2.classList);
  
          btnBuildHtml.style.border = '1px solid #264653'
          btnBuildHtml.style.color = '#264653'
          btnBuildHtml.innerText = 'Montar código';
          btnBuildHtml.disabled = true;
  
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
  
          buildHtml();
  
          firstElement.classList.remove("selected");
          firstElement = null;
        }
      });
    });
}; 
  
// Global function for the SELECT option change
setTimeout(() => {
    let selectOption = document.getElementById("select-option");
    if (selectOption) {
        selectOption.addEventListener("change", function () {
            let selectedOption = this.value;
            let items = document.querySelectorAll(".item");
            let selectedItems = document.querySelectorAll('.item[data-option="' + selectedOption + '"]');            

            const element = document.querySelectorAll("#pdvForm > section");

            //Setting false for backup button flag
            saveBtnCliked = false;
            //Enable button after select change
            btnBackup.disabled = false;

            items.forEach(function (item) {
                item.classList.remove("selected");
            });            

            selectedItems.forEach(function (item) {
                item.classList.add("selected");
            });            

            for (i = 0; i < element.length; i++) {
                element[i].remove();
            };

            btnAdd.removeAttribute("style")
            btnAddSvg.style.fill = '#A9BFB8'
            btnAddSpan.innerText = "Adicionar Imagens"

            btnBackup.removeAttribute('style');
            btnBackup.innerText = 'Salvar Backup';

            btnCopyhtml.removeAttribute('style');
            btnCopyhtml.innerText = 'Copiar código';
            btnCopyhtml.disabled = true;
            btnCopyhtml.removeEventListener('mouseover', function(){});
            btnCopyhtml.removeEventListener('mouseout', function(){});

            btnBuildHtml.removeAttribute('style')
            btnBuildHtml.innerText = 'Montar código';
            btnBuildHtml.disabled = true;
            btnBuildHtml.removeEventListener('mouseover', function(){});
            btnBuildHtml.removeEventListener('mouseout', function(){});

            setTimeout(() => {
                window.onload();
            }, 1000);            
        });
    };
}, 1000);

//Global function to add an new image DROPDOWN and HOOVER
function addNewElement() {
    const element = document.querySelectorAll("#pdvForm > section");
    const container = document.querySelector('div.item.selected > div > div.box-hoover'); 

    if (!saveBtnCliked) {
        saveBackup();
    }
    
    btnBuildHtml.removeAttribute('style')
    btnBuildHtml.innerText = 'Montar código'
    btnBuildHtml.style.color = '#264653';
    btnBuildHtml.style.border = '1px solid #264653';

    btnCopyhtml.removeAttribute('style')
    btnCopyhtml.innerText = 'Copiar código'
    btnCopyhtml.style.color = '#264653';
    btnCopyhtml.style.border = '1px solid #264653';

    if (element.length < 6) {
        const nodeList = document.querySelectorAll(`div.item.selected > div.pdv-automation > div.box-hoover a`);
        const nodeListLastValue = nodeList[nodeList.length - 1];
        const clonedElement = nodeListLastValue.cloneNode(true);

        container.insertBefore(clonedElement, nodeListLastValue);
        for (i = 0; i < element.length; i++) {
            element[i].remove();
        };
    
        setTimeout(() => {
            window.onload();
        }, 1000);
    } else {
        btnAdd.disabled = true;
        btnAdd.style.border = '2px solid red';
        btnAdd.style.color = 'red';
        btnAdd.style.cursor = 'not-allowed';
        btnAddSvg.style.fill = 'red';
        btnAddSpan.innerText = 'Máximo de imagens';
        btnAdd.removeEventListener('onmouseover', btnAddMouseOver);
        btnAdd.removeEventListener('onmouseout', btnAddMouseOut);
    }
}

//Global funciton to add mouseover on a image that will be removed
function mouseOverImgToRemove() {
    this.style.filter = 'grayscale(1)';
}

function mouseOutImgToRemove() {
    this.style.border = '2px solid green';
    this.style.filter = 'grayscale(0)';
}

function selectImgToRemove() {
    const confirmed = window.confirm("Tem certeza que deseja remover essa imagem?");
    const removeBoxImage = document.querySelectorAll('div.item.selected > div.pdv-automation > div.box-hoover a');
    const element = document.querySelectorAll("#pdvForm > section");    
    clicks = 0;

    if (confirmed) {
        event.preventDefault();
        this.remove();

        if (btnAddSpan.innerText == 'Máximo de imagens') {
            btnAddSpan.innerText = 'Adicionar imagens';
        }

        for (index = 0; index < element.length; index++) {
            element[index].remove();
    
            removeBoxImage[index].removeAttribute('style');
            removeBoxImage[index].removeEventListener('mouseover', mouseOverImgToRemove);
            removeBoxImage[index].removeEventListener('mouseout', mouseOutImgToRemove);
            removeBoxImage[index].removeEventListener('click', selectImgToRemove); 
        };       

        setTimeout(() => {
            window.onload();
            buildHtml();
        }, 1000);
    } else {
        event.preventDefault();

        for (index = 0; index < removeBoxImage.length; index++) {    
            removeBoxImage[index].removeAttribute('style');
            removeBoxImage[index].removeEventListener('mouseover', mouseOverImgToRemove);
            removeBoxImage[index].removeEventListener('mouseout', mouseOutImgToRemove);
            removeBoxImage[index].removeEventListener('click', selectImgToRemove); 
        };
    };     
    
    btnRemoveSpan.innerHTML = 'Remover Imagem';
}

//Global function to remove an image DROPDOWN and HOOVER
function removeNewElement() {
    const removeBoxImage = document.querySelectorAll('div.item.selected > div.pdv-automation > div.box-hoover a');    
    clicks++;  

    if (!saveBtnCliked) {
        saveBackup();
    }

    for (let index = 0; index < removeBoxImage.length; index++) {
        removeBoxImage[index].style.border = '2px solid green';   
        removeBoxImage[index].style.padding = '0.5rem';
        removeBoxImage[index].style.borderRadius = '10px';     
        removeBoxImage[index].addEventListener('mouseover', mouseOverImgToRemove);
        removeBoxImage[index].addEventListener('mouseout', mouseOutImgToRemove);  
        removeBoxImage[index].addEventListener('click', selectImgToRemove); 
    };

    btnRemoveSpan.innerHTML = 'Cancelar Seleção';

    btnBuildHtml.removeAttribute('style');
    btnBuildHtml.innerText = 'Montar código';
    btnBuildHtml.style.color = '#264653';
    btnBuildHtml.style.border = '1px solid #264653';

    if (clicks === 2) {
        clicks = 0;
        // Perform the action you want to take on single click here
        for (let index = 0; index < removeBoxImage.length; index++) {
            removeBoxImage[index].removeAttribute('style');
            removeBoxImage[index].removeAttribute('style');
            removeBoxImage[index].removeAttribute('style');
            removeBoxImage[index].removeEventListener('mouseover', mouseOverImgToRemove);
            removeBoxImage[index].removeEventListener('mouseout', mouseOutImgToRemove);  
            removeBoxImage[index].removeEventListener('click', selectImgToRemove); 
        };
        btnRemoveSpan.innerHTML = 'Remover Imagem';
    };
};

//Global function to disable the attribute "disable" for COPY BUTTON
function copyBtnDisabledFalse() {
    btnCopyhtml.disabled = false;
    btnCopyhtml.style.color = '#264653';
    btnCopyhtml.style.border = '1px solid #264653';

    btnCopyhtml.addEventListener("mouseover", function () {
        btnCopyhtml.style.backgroundColor = "#c7f9cc";        
        btnCopyhtml.style.cursor = "pointer";
    });
    btnCopyhtml.addEventListener("mouseout", function () {
        btnCopyhtml.style.backgroundColor = "#fff";
    }); 
};

//Global function to disable the attribute "disable" for BUILD BUTTON
function buildBtnDisabledFalse() {
    btnBuildHtml.disabled = false;
    btnBuildHtml.style.color = '#264653';
    btnBuildHtml.style.border = '1px solid #264653';

    btnBuildHtml.addEventListener("mouseover", function () {
        btnBuildHtml.style.backgroundColor = "#c7f9cc";        
        btnBuildHtml.style.cursor = "pointer";
    });
    btnBuildHtml.addEventListener("mouseout", function () {
        btnBuildHtml.style.backgroundColor = "#fff";
    }); 
};

//Global functions to mouseOver and mouseOut for ADD IMG BUTTON and REMOVE IMG BUTTON
function btnAddMouseOver() {
   btnAdd.style.border = '2px solid #008000';
   btnAdd.style.color = '#008000';
   btnAdd.style.cursor = 'pointer';
   btnAddSvg.style.fill = "#008000";
};

function btnAddMouseOut() {
    btnAdd.style.border = '2px solid #264653';
    btnAdd.style.color = '#264653';
    btnAdd.style.cursor = 'pointer';
    btnAddSvg.style.fill = "#264653";
 };

 function btnRemoveMouseOver() {
    btnRemove.style.border = '2px solid #e85d04';
    btnRemove.style.color = '#e85d04';
    btnRemove.style.cursor = 'pointer';
    btnRemoveSvg.style.fill = "#e85d04";
 };
 
function btnRemoveMouseOut() {
    btnRemove.style.border = '2px solid red';
    btnRemove.style.color = 'red';
    btnRemove.style.cursor = 'pointer';
    btnRemoveSvg.style.fill = "red";
};