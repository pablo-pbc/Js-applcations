
//Função para copiar o HTML após as inserções dentro dos inputs
function copy() {
    const nodeList = document.getElementsByClassName("box-banner");

    console.log(nodeList)

    for (let i = 0; i < nodeList.length; i++) {         
        let bannerNum = `<!-- 0${i+1} -->`
        let banner = `<!-- BANNER -->`

        let copyHtml = nodeList[i].outerHTML
        document.getElementById("codigo").innerHTML += `${bannerNum}\n${banner}\n${copyHtml}\n${banner}\n\n`;
    }

    document.getElementById("codigo").select();
    document.execCommand('copy');
}

//Função para preencher as informações do BANNER
const bannerPosition = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
const bannerPositonId = ['1', '2', '3', '4', '5', '6']

function buildBannerFem(bannerPosition, bannerPositonId) {
    //Importando o valor do input
    let linkBannerFem = document.getElementById(`linkBanner${bannerPosition}Fem`).value
    let bannerDeskFem = document.getElementById(`bannerDesk${bannerPosition}Fem`).value
    let bannerMobileFem = document.getElementById(`bannerMobile${bannerPosition}Fem`).value
    let altBannerFem = document.getElementById(`altBanner${bannerPosition}Fem`).value

    //Selecionando o elemento HTML
    let resultLinkBannerFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a`)
    let resultBannerDeskFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a > picture > img`)
    let resultBannerMobileFem = document.querySelector(`#pbc-banner-fem-${bannerPositonId} > a > picture > source`)

    if (linkBannerFem.length < 3 && bannerDeskFem.length < 3 && bannerMobileFem.length < 3 && altBannerFem.length < 3) {
        //alert('Favor preencher todos os campos corretamente');        
    } else {
        resultLinkBannerFem.href = linkBannerFem
        resultBannerDeskFem.src = bannerDeskFem
        resultBannerDeskFem.alt = altBannerFem
        resultBannerMobileFem.srcset = bannerMobileFem
    }  
}

//usar select para mudanças de posiçao