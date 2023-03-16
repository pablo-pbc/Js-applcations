//Function to feed the textarea element
function loopTxtArea() {
  const nodeList = document.getElementsByClassName("box-banner")
  const txtArea = document.getElementById("codigo")

  txtArea.value = ''    

  for (let i = 0; i < nodeList.length; i++) {         
      let bannerNumComment = `<!-- 0${i+1} -->`
      let bannerComment = `<!-- BANNER -->`
      let copyHomeSlideHtml = nodeList[i].outerHTML
      
      document.getElementById("codigo").value += `${bannerNumComment}\n${bannerComment}\n${copyHomeSlideHtml}\n${bannerComment}\n\n`;
  }
  return txtArea
}

//Function to save the backup file
function saveHomeSlideBackup() {
  const date = new Date()    
  const hours = date.getHours('pt-br')
  const min = date.getMinutes('pt-br')
  const today = date.toLocaleDateString('pt-br')

  const link = document.createElement("a")  
  const file = new Blob([loopTxtArea().value], { type: 'text/plain' })

  link.href = URL.createObjectURL(file)
  link.download = `backupBanner_${today}_${hours}h-${min}.txt`
  link.click()
  URL.revokeObjectURL(link.href)
}

//Function to copy the HTML after input's insertions
function copyHomeSlideHtml() {
  // Selecting the content inside the textarea
  loopTxtArea().select()
  // Selecting the content inside the textarea for mobile devices
  loopTxtArea().setSelectionRange(0, 99999)
  // Copy the text inside the textarea field
  navigator.clipboard.writeText(loopTxtArea().value)     
}

//Function to add the Banner's informations
function buildHomeSlide() {
  const bannerPositonIdArray = ['1', '2', '3', '4', '5', '6']
  let flag = 0
  let i = 0

  while (i < bannerPositonIdArray.length && flag < 1) {
    let bannerPositonId = bannerPositonIdArray[i]

    //Importing the input's values
    let linkBannerFem = document.querySelector(`#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(2) > input[type=text]`).value
    let bannerDeskFem = document.querySelector(`#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(3) > input[type=text]`).value
    let bannerMobileFem = document.querySelector(`#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(4) > input[type=text]`).value
    let altBannerFem = document.querySelector(`#homeSlideForm > section:nth-child(${bannerPositonId}) > div:nth-child(5) > input[type=text]`).value

    //Choosing HTML element
    let resultLinkBannerFem = document.querySelector(`.pdv-automation div:nth-child(${bannerPositonId}) > a`)
    let resultBannerDeskFem = document.querySelector(`.pdv-automation div:nth-child(${bannerPositonId}) > a > picture > img`)
    let resultBannerMobileFem = document.querySelector(`.pdv-automation div:nth-child(${bannerPositonId}) > a > picture > source`)

    if (linkBannerFem.length < 3 && bannerDeskFem.length < 3 && bannerMobileFem.length < 3 && altBannerFem.length < 3) {
        flag = 1
        alert('Favor preencher todos os campos corretamente');         
    } else {
        resultLinkBannerFem.href = linkBannerFem
        resultBannerDeskFem.src = bannerDeskFem
        resultBannerDeskFem.alt = altBannerFem
        resultBannerMobileFem.srcset = bannerMobileFem
    }        
    i++
  }      
}

//Function to create form following banner's quantity
window.onload = function buildHomeSlideForms() {
  const homeSlideList = document.getElementsByClassName("box-banner")
  const formBackground = document.getElementsByClassName("pbcForm")
  const appendFormReference = document.querySelector('#homeSlideForm')
  const hexBgForm = ['#d9ed92', '#b5e48c', '#99d98c', '#76c893', '#52b69a', '#588157']

  for (let i = 0; i < homeSlideList.length; i++) {
    let attributesLinkBannerFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a`)
    let attributesBannerDeskFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > img`)
    let attributesBannerMobileFem = document.querySelector(`.pdv-automation div:nth-child(${i+1}) > a > picture > source`)
    let inputHtmlSection = `
        <section class='pbcForm' draggable="true" data-index="${i}">
        <h2>Banner 0${i+1}</h2>        
        <div>
            <label>Link:</label>
            <input type='text' value="${attributesLinkBannerFem.href}" required onFocus="teste()" onfocusout="teste1()"></input>
        </div>
    
        <div>
            <label>Imagem Desk:</label>
            <input type='text' value="${attributesBannerDeskFem.src}" required onFocus="teste()" onfocusout="teste1()"></input>
        </div>
    
        <div>
            <label>Imagem Mobile:</label>
            <input type='text' value="${attributesBannerMobileFem.srcset}" required onFocus="teste()" onfocusout="teste1()"></input>
        </div>
    
        <div>
            <label>Alt:</label>
            <input type='text' value="${attributesBannerDeskFem.alt}" required onFocus="teste()" onfocusout="teste1()"></input>
        </div>
        </section>
    `
    appendFormReference.innerHTML += `${inputHtmlSection}\n`        
  } 

  for (let k = 0; k < formBackground.length; k++) {
    formBackground[k].style.backgroundColor = hexBgForm[k]        
  }
  draggFormElement()
}

function draggFormElement() {
  const elements = document.querySelectorAll('.pbcForm')
  let draggingElement

  elements.forEach(element => {
    element.addEventListener('dragstart', e => {
      draggingElement = e.target
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', null)
      element.classList.add('dragging')
    })
    
    element.addEventListener('dragend', e => {
      draggingElement = null
      element.classList.remove('dragging')
    })
    
    element.addEventListener('dragover', e => {
      e.preventDefault()
    })
    
    element.addEventListener('drop', e => {
      e.preventDefault()
      
      if (draggingElement === element) {
        return
      }
      
      const container = element.parentNode;
      const draggingIndex = parseInt(draggingElement.dataset.index)
      const targetIndex = parseInt(element.dataset.index)
      
      if (draggingIndex < targetIndex) {
        container.insertBefore(draggingElement, element.nextSibling)
      } else {
        container.insertBefore(draggingElement, element)
      }
      
      // Update the data-index attributes of all elements to reflect their new positions
      const updatedElements = document.querySelectorAll('.pbcForm')
        updatedElements.forEach((el, index) => {
        el.dataset.index = index
      })
    })
  })
}

function teste() {
  const draggableElement = document.getElementById("homeSlideForm")

  for (let i = 0; i < 6; i++) {
    const draggableStatus = draggableElement.querySelector(`#homeSlideForm > section:nth-child(${i+1})`)
    draggableStatus.draggable = false  
  }
}

function teste1() {
  const draggableElement = document.getElementById("homeSlideForm")

  for (let i = 0; i < 6; i++) {
    const draggableStatus = draggableElement.querySelector(`#homeSlideForm > section:nth-child(${i+1})`)
    draggableStatus.draggable = true  
  }
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
}, 1000);