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
    const bannerPositionArray = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    const bannerPositonIdArray = ['1', '2', '3', '4', '5', '6']
    let flag = 0
    let i = 0

    while (i < bannerPositionArray.length && flag < 1) {        
        let bannerPosition = bannerPositionArray[i]
        let bannerPositonId = bannerPositonIdArray[i]

        //Importing the input's values
        let linkBannerFem = document.getElementById(`linkBanner${bannerPosition}Fem`).value
        let bannerDeskFem = document.getElementById(`bannerDesk${bannerPosition}Fem`).value
        let bannerMobileFem = document.getElementById(`bannerMobile${bannerPosition}Fem`).value
        let altBannerFem = document.getElementById(`altBanner${bannerPosition}Fem`).value

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