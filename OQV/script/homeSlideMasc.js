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
        let linkBannerMasc = document.getElementById(`linkBannerMasc${bannerPositonId}`).value
        let bannerDeskMasc = document.getElementById(`bannerDeskMasc${bannerPositonId}`).value
        let bannerMobileMasc = document.getElementById(`bannerMobileMasc${bannerPositonId}`).value
        let altBannerMasc = document.getElementById(`altBannerMasc${bannerPositonId}`).value

        //Choosing HTML element
        let resultLinkBannerMasc = document.querySelector(`#pbc-banner-masc-${bannerPositonId} > a`)
        let resultBannerDeskMasc = document.querySelector(`#pbc-banner-masc-${bannerPositonId} > a > picture > img`)
        let resultBannerMobileMasc = document.querySelector(`#pbc-banner-masc-${bannerPositonId} > a > picture > source`)

        if (linkBannerMasc.length < 3 && bannerDeskMasc.length < 3 && bannerMobileMasc.length < 3 && altBannerMasc.length < 3) {
            flag = 1
            alert('Favor preencher todos os campos corretamente');         
        } else {
            resultLinkBannerMasc.href = linkBannerMasc
            resultBannerDeskMasc.src = bannerDeskMasc
            resultBannerDeskMasc.alt = altBannerMasc
            resultBannerMobileMasc.srcset = bannerMobileMasc
        }        
        i++
    }      
}

//Function to create form following banner's quantity
window.onload = function buildHomeSlideForms() {
    const homeSlideList = document.getElementsByClassName("box-banner")
    const appendFormReference = document.querySelector('#homeSlideForm')

    for (let i = 0; i < homeSlideList.length; i++) {
        let attributesLinkBannerMasc = document.querySelector(`#pbc-banner-masc-${i+1} > a`)
        let attributesBannerDeskMasc = document.querySelector(`#pbc-banner-masc-${i+1} > a > picture > img`)
        let attributesBannerMobileMasc = document.querySelector(`#pbc-banner-masc-${i+1} > a > picture > source`)
        let inputHtmlSection = `
            <section>
            <h2>Banner 0${i+1}</h2>        
            <div>
                <label for='linkBannerMasc${i+1}'>Link:</label>
                <input id='linkBannerMasc${i+1}' type='text' value="${attributesLinkBannerMasc.href}" required></input>
            </div>
        
            <div>
                <label for='bannerDeskMasc${i+1}'>Imagem Desk:</label>
                <input id='bannerDeskMasc${i+1}' type='text' value="${attributesBannerDeskMasc.src}" required></input>
            </div>
        
            <div>
                <label for='bannerMobileMasc${i+1}'>Imagem Mobile:</label>
                <input id='bannerMobileMasc${i+1}' type='text' value="${attributesBannerMobileMasc.srcset}" required></input>
            </div>
        
            <div>
                <label for='altBannerMasc${i+1}'>Alt:</label>
                <input id='altBannerMasc${i+1}' type='text' value="${attributesBannerDeskMasc.alt}" required></input>
            </div>
            </section>
        `
        appendFormReference.innerHTML += `${inputHtmlSection}\n`
    }
}