const btnBuildHtml = document.getElementById("buildButton");
const btnCopyhtml = document.getElementById("copyHtmlButton");
const backupBtn = document.getElementById('buttonBackup');
const currentUlrPathname = new URL(window.location.href).pathname.substring(5);
const pdvName = currentUlrPathname.substring(0, currentUlrPathname.lastIndexOf('.'));
let pdvComment = '';

//Function to feed the textarea element
function loopTxtArea() {     
    const txtArea = document.getElementById("codigo");
    let querySelector = "";
    let nodeList = null;

    switch (pdvName) {
        case 'hoover':
            querySelector = 'div.item.selected > div.pdv-automation > div.box-hoover > a';       
            nodeList = document.querySelectorAll(`${querySelector}`);
            pdvComment = 'Hoover';
            break;

        case 'mosaicoFem':
            querySelector = 'box-banner'
            nodeList = document.querySelectorAll(`${querySelector}`)
            pdvComment = 'MOSAICO FEM'
            break;

        case 'mosaicoMasc':
            querySelector = 'box-banner'
            nodeList = document.querySelectorAll(`${querySelector}`)
            pdvComment = 'MOSAICO MASC'
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
    return txtArea;
};
  
//Function to save the backup file
function saveBackup() {
    const date = new Date();
    const hours = date.getHours("pt-br");
    const min = date.getMinutes("pt-br");
    const today = date.toLocaleDateString("pt-br");

    const link = document.createElement("a");
    const file = new Blob([loopTxtArea().value], { type: "text/plain" });

    link.href = URL.createObjectURL(file);
    link.download = `backup${pdvComment}_${today}_${hours}h-${min}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    backupBtn.innerText = 'Backup Salvo!';
    backupBtn.style.color = '#38b000';
    backupBtn.style.border = "2px solid #38b000";

    buildBtnDisabledFalse();
};

//Function to copy the HTML after input's insertions
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
        });
    });
};
  
// function select
setTimeout(() => {
    let selectOption = document.getElementById("select-option");
    if (selectOption) {
        selectOption.addEventListener("change", function () {
            let selectedOption = this.value;
            let items = document.querySelectorAll(".item");
            let selectedItems = document.querySelectorAll('.item[data-option="' + selectedOption + '"]');            

            const element = document.querySelectorAll("#pdvForm section");

            items.forEach(function (item) {
                item.classList.remove("selected");
            });            

            selectedItems.forEach(function (item) {
                item.classList.add("selected");
            });            

            for (i = 0; i < element.length; i++) {
                element[i].remove();
            };

            backupBtn.removeAttribute('style');
            backupBtn.innerText = 'Salvar Backup';

            btnCopyhtml.removeAttribute('style');
            btnCopyhtml.innerText = 'Copiar código';
            btnCopyhtml.disabled = true;
            btnCopyhtml.removeEventListener('mouseover', overOnBtnCopy);
            btnCopyhtml.removeEventListener('mouseout', overOffBtnCopy);

            btnBuildHtml.removeAttribute('style')
            btnBuildHtml.innerText = 'Montar código';
            btnBuildHtml.disabled = true;
            btnBuildHtml.removeEventListener('mouseover', overOnBtnBuild);
            btnBuildHtml.removeEventListener('mouseout', overOffBtnBuild);

            setTimeout(() => {
                window.onload();
            }, 1000);
        });
    };
}, 1000);

function overOnBtnCopy() {
    btnCopyhtml.style.backgroundColor = "#c7f9cc";        
    btnCopyhtml.style.cursor = "pointer";
};

function overOffBtnCopy() {
    btnCopyhtml.style.backgroundColor = "#fff";
};

function overOnBtnBuild() {
    btnBuildHtml.style.backgroundColor = "#c7f9cc";        
    btnBuildHtml.style.cursor = "pointer";
};

function overOffBtnBuild() {
    btnBuildHtml.style.backgroundColor = "#fff";
};

function copyBtnDisabledFalse() {
    btnCopyhtml.disabled = false;
    btnCopyhtml.style.color = '#264653';
    btnCopyhtml.style.border = '1px solid #264653';

    btnCopyhtml.addEventListener("mouseover", overOnBtnCopy);
    btnCopyhtml.addEventListener("mouseout", overOffBtnCopy); 
};

function buildBtnDisabledFalse() {
    btnBuildHtml.disabled = false;
    btnBuildHtml.style.color = '#264653';
    btnBuildHtml.style.border = '1px solid #264653';

    btnBuildHtml.addEventListener("mouseover", overOnBtnBuild);
    btnBuildHtml.addEventListener("mouseout", overOffBtnBuild); 
};