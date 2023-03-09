
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