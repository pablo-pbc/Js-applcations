let btnBuildHtml = document.getElementById("buildButton");
let btnCopyhtml = document.getElementById("copyHtmlButton");
let currentUlrPathname = new URL(window.location.href).pathname.substring(5);
let pdvName = currentUlrPathname.substring(0, currentUlrPathname.lastIndexOf('.'));
let querySelector = "";
let pdvComment = "";
let nodeList = null;

switch (pdvName) {
    case 'hoover':
        querySelector = '.item.selected .box-hoover a';
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

//Function to feed the textarea element
function loopTxtArea() { 
    const txtArea = document.getElementById("codigo");
     
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
    link.download = `backup_${today}_${hours}h-${min}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    btnBuildHtml.disabled = false;
};

//Function to copy the HTML after input's insertions
function copyHtml() {
    // Selecting the content inside the textarea
    loopTxtArea().select();
    // Selecting the content inside the textarea for mobile devices
    loopTxtArea().setSelectionRange(0, 99999);
    // Copy the text inside the textarea field
    navigator.clipboard.writeText(loopTxtArea().value);  
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

            const element = document.querySelectorAll("#HooverForm section");

            items.forEach(function (item) {
                item.classList.remove("selected");
            });            

            selectedItems.forEach(function (item) {
                item.classList.add("selected");
            });            

            for (i = 0; i < element.length; i++) {
                element[i].remove();
            };

            btnBuildHtml.disabled = true;
            btnCopyhtml.disabled = true;

            setTimeout(() => {
                window.onload();
            }, 1000);
        });
    };
}, 1000);