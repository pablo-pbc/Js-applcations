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
        let resultLinkBannerFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a`)
        let resultBannerDeskFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a > picture > img`)
        let resultBannerMobileFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a > picture > source`)

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
    const appendFormReference = document.querySelector('#homeSlideForm')

    for (let i = 0; i < homeSlideList.length; i++) {
        let attributesLinkBannerFem = document.querySelector(`#pbc-banner-fem-${i+1} > a`)
        let attributesBannerDeskFem = document.querySelector(`#pbc-banner-fem-${i+1} > a > picture > img`)
        let attributesBannerMobileFem = document.querySelector(`#pbc-banner-fem-${i+1} > a > picture > source`)
        let inputHtmlSection = `
            <section class='pbcForm' draggable="true">
            <h2>Banner 0${i+1}</h2>        
            <div>
                <label>Link:</label>
                <input type='text' value="${attributesLinkBannerFem.href}" required></input>
            </div>
        
            <div>
                <label>Imagem Desk:</label>
                <input type='text' value="${attributesBannerDeskFem.src}" required></input>
            </div>
        
            <div>
                <label>Imagem Mobile:</label>
                <input type='text' value="${attributesBannerMobileFem.srcset}" required></input>
            </div>
        
            <div>
                <label>Alt:</label>
                <input type='text' value="${attributesBannerDeskFem.alt}" required></input>
            </div>
            </section>
        `
        appendFormReference.innerHTML += `${inputHtmlSection}\n`
    }

    draggFormElement()
}

function draggFormElement() {
    const elements = document.querySelectorAll('.pbcForm');
    let draggingElement;

    elements.forEach(element => {
        element.addEventListener('dragstart', e => {
            draggingElement = e.target;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', null);
            element.classList.add('dragging');
        });
        
        element.addEventListener('dragend', e => {
            draggingElement = null;
            element.classList.remove('dragging');
        });
        
        element.addEventListener('dragover', e => {
            e.preventDefault();
        });
        
        element.addEventListener('drop', e => {
            e.preventDefault();
            
            if (draggingElement === element) {
            return;
            }
            
            const container = element.parentNode;
            const draggingIndex = Array.from(elements).indexOf(draggingElement);
            const targetIndex = Array.from(elements).indexOf(element);
            
            if (draggingIndex < targetIndex) {
            container.insertBefore(draggingElement, element.nextSibling);
            } else {
            container.insertBefore(draggingElement, element);
            }
        });
    });
}