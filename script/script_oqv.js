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
        let linkBannerFem = document.getElementById(`linkBannerFem${bannerPositonId}`).value
        let bannerDeskFem = document.getElementById(`bannerDeskFem${bannerPositonId}`).value
        let bannerMobileFem = document.getElementById(`bannerMobileFem${bannerPositonId}`).value
        let altBannerFem = document.getElementById(`altBannerFem${bannerPositonId}`).value

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
            <section>
            <h2>Banner 0${i+1}</h2>
            <div>
                <label for="bannerPositions${i+1}">Aproveitar posição:</label>
                <select name="bannerPositions${i+1}" id="bannerPositions${i+1}">
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        
            <div>
                <label for='linkBannerFem${i+1}'>Link:</label>
                <input id='linkBannerFem${i+1}' type='text' value="${attributesLinkBannerFem.href}" required></input>
            </div>
        
            <div>
                <label for='bannerDeskFem${i+1}'>Imagem Desk:</label>
                <input id='bannerDeskFem${i+1}' type='text' value="${attributesBannerDeskFem.src}" required></input>
            </div>
        
            <div>
                <label for='bannerMobileFem${i+1}'>Imagem Mobile:</label>
                <input id='bannerMobileFem${i+1}' type='text' value="${attributesBannerMobileFem.srcset}" required></input>
            </div>
        
            <div>
                <label for='altBannerFem${i+1}'>Alt:</label>
                <input id='altBannerFem${i+1}' type='text' value="${attributesBannerDeskFem.alt}" required></input>
            </div>
            </section>
        `
        appendFormReference.innerHTML += `${inputHtmlSection}\n`
    }
}