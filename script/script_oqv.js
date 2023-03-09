
function copy() {
    const nodeList = document.getElementsByClassName("box-banner");

    console.log(nodeList)

    let copyHtml = nodeList[0].outerHTML
    document.getElementById("codigo").innerHTML = copyHtml

    // for (let i = 0; i < nodeList.length; i++) {         
        
    //     let copyHtml = nodeList[i].outerHTML
    //     document.getElementById("codigo").innerHTML = copyHtml
    //     console.log(copyHtml)
       
    // }
    // document.getElementById("codigo").innerHTML = pastHtml[0];
    document.getElementById("codigo").select();
    document.execCommand('copy');
}