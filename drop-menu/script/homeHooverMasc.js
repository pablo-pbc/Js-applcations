//Function to feed the textarea element
function loopTxtArea() {
  const nodeList = document.querySelectorAll(
    ".item.selected .pdv-automation > div a"
  );
  const txtArea = document.getElementById("codigo");

  txtArea.value = "";

  for (let i = 0; i < nodeList.length; i++) {
    let bannerNumComment = `<!-- 0${i + 1} -->`;
    let bannerComment = `<!-- BANNER -->`;
    let copyHomeSlideHtml = nodeList[i].outerHTML;

    document.getElementById(
      "codigo"
    ).value += `${bannerNumComment}\n${bannerComment}\n${copyHomeSlideHtml}\n${bannerComment}\n\n`;
  }
  return txtArea;
}

//Function to save the backup file
function saveHomeSlideBackup() {
  const date = new Date();
  const hours = date.getHours("pt-br");
  const min = date.getMinutes("pt-br");
  const today = date.toLocaleDateString("pt-br");

  const link = document.createElement("a");
  const file = new Blob([loopTxtArea().value], { type: "text/plain" });

  link.href = URL.createObjectURL(file);
  link.download = `backupBanner_${today}_${hours}h-${min}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

//Function to copy the HTML after input's insertions
function copyHomeSlideHtml() {
  // Selecting the content inside the textarea
  loopTxtArea().select();
  // Selecting the content inside the textarea for mobile devices
  loopTxtArea().setSelectionRange(0, 99999);
  // Copy the text inside the textarea field
  navigator.clipboard.writeText(loopTxtArea().value);
}

//Function to add the Banner's informations
function buildHomeSlide() {
  let flag = 0;
  let i = 0;
  const nodeList = document.querySelectorAll(
    ".item.selected .pdv-automation > div a"
  );

  while (i < nodeList.length && flag < 1) {
    let bannerPositonId = i + 1;
    //Importing the input's values
    let linkBannerMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(2) > input[type=text]`
    ).value;
    let bannerDeskMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(3) > input[type=text]`
    ).value;
    let altBannerMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(4) > input[type=text]`
    ).value;

    let txtAltBannerMasc = document.querySelector(
      `#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(4) > input[type=text]`
    ).value;

    //Choosing HTML element
    let resultLinkBannerMasc = document.querySelector(
      `.item.selected > .pdv-automation > div > a:nth-child(${bannerPositonId})`
    );
    // let resultBannerDeskMasc = document.querySelector(
    //   `.pdv-automation > div > a:nth-child(${bannerPositonId}) > img`
    // );

    if (
      linkBannerMasc.length < 3 &&
      bannerDeskMasc.length < 3 &&
      altBannerMasc.length < 3
    ) {
      flag = 1;
      alert("Favor preencher todos os campos corretamente");
    } else {
      resultLinkBannerMasc.href = linkBannerMasc;
      resultLinkBannerMasc.innerHTML =
        `<img src="${bannerDeskMasc}" Alt="altBannerMasc" border="0" />` +
        altBannerMasc;
      // resultBannerDeskMasc.src = bannerDeskMasc;
      // resultBannerDeskMasc.alt = altBannerMasc;
    }
    i++;
  }
}

//Function to create form following banner's quantity
window.onload = function buildHomeSlideForms() {
  const homeSlideList = document.querySelectorAll(
    ".item.selected .box-hoover a"
  );
  const formBackground = document.getElementsByClassName("pbcForm");
  const appendFormReference = document.querySelector("#homeSlideForm");
  const hexBgForm = ["#", "#", "#", "#", "#", "#"];

  for (let i = 0; i < homeSlideList.length; i++) {
    let attributesLinkBannerMasc = document.querySelector(
      `.item.selected > .pdv-automation > div > a:nth-child(${i + 1})`
    );
    let attributesBannerDeskMasc = document.querySelector(
      `.item.selected > .pdv-automation > div > a:nth-child(${i + 1}) > img`
    );

    let inputHtmlSection = `
          <section class='pbcForm ar_form' draggable="true" data-index="${i}">
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
  const elements2 = document.getElementById("homeSlideForm");
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
}, 2000);

// function select

var selectOption = document.getElementById("select-option");

selectOption.addEventListener("change", function () {
  var selectedOption = this.value;

  var items = document.querySelectorAll(".item");
  items.forEach(function (item) {
    item.classList.remove("selected");
  });

  var selectedItems = document.querySelectorAll(
    '.item[data-option="' + selectedOption + '"]'
  );
  selectedItems.forEach(function (item) {
    item.classList.add("selected");
  });

  const element = document.querySelectorAll("#homeSlideForm section");
  for (i = 0; i < element.length; i++) {
    element[i].remove();
  }

  setTimeout(() => {
    window.onload();
  }, 2000);
});

/* Mobile */

function toggleClass(elementId, className) {
  const element = document.getElementById("homeSlideForm");
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
