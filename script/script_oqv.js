//Function to save the backup file
const saveBackup = () => {
    const link = document.createElement("a");
    const nodeList = document.getElementsByClassName("box-banner");
    const txtArea = document.getElementById("codigo")
    const date = new Date()
    const today = date.toLocaleDateString('pt-br')
    const hours = date.getHours('pt-br')
    const min = date.getMinutes('pt-br')

    txtArea.value = ''

    for (let i = 0; i < nodeList.length; i++) {         
        let bannerNumComment = `<!-- 0${i+1} -->`
        let bannerComment = `<!-- BANNER -->`
        let copyHomeSlideHtml = nodeList[i].outerHTML
        
        document.getElementById("codigo").value += `${bannerNumComment}\n${bannerComment}\n${copyHomeSlideHtml}\n${bannerComment}\n\n`;
    }
    
    const file = new Blob([txtArea.value], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    link.download = `backupBanner_${today}_${hours}h-${min}min.txt`;
    link.click();
    URL.revokeObjectURL(link.href);

    document.getElementById('homeSlideBackup').display = 'none'
    document.getElementById('buildHomeSlide').display = 'block'
    document.getElementById('copyHomeSlideHtml').display = 'block'
 };

//Função para copiar o HTML após as inserções dentro dos inputs
function copy() {
    const nodeList = document.getElementsByClassName("box-banner");
    const txtArea = document.getElementById("codigo")

    txtArea.value = ''

    for (let i = 0; i < nodeList.length; i++) {         
        let bannerNumComment = `<!-- 0${i+1} -->`
        let bannerComment = `<!-- BANNER -->`
        let copyHomeSlideHtml = nodeList[i].outerHTML
        
        document.getElementById("codigo").value += `${bannerNumComment}\n${bannerComment}\n${copyHomeSlideHtml}\n${bannerComment}\n\n`;
    }

    // Selecting the content inside the textarea
    txtArea.select()
    // Selecting the content inside the textarea for mobile devices
    txtArea.setSelectionRange(0, 99999)
    // Copy the text inside the textarea field
    navigator.clipboard.writeText(txtArea.value)     
}

//Function to add the Banner's informations
function buildBannerFem() {
    const bannerPositionArray = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    const bannerPositonIdArray = ['1', '2', '3', '4', '5', '6']
    let flag = 0
    let i = 0

    //for (let i = 0; i < bannerPositionArray.length; i++) 
    while (i < bannerPositionArray.length && flag != 1) {
        
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
//usar select para mudanças de posiçao