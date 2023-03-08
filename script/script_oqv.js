function getUserName() {
    const firstPartImgOne = document.getElementById('firstPartImgOne').value
    const secPartImgOne = document.getElementById('secPartImgOne').value
    const thirdPartImgThree = document.getElementById('thirdPartImgThree').value
    const altImgOne = document.getElementById('altImgOne').value
    const linkImgOneDesk = document.getElementById('linkImgOneDesk').value
    const linkImgOneMobile = document.getElementById('linkImgOneMobile').value
    const linkImgOne = document.getElementById('linkImgOne').value

    const resultFirstPartImgOne = document.querySelector('#mosaico-01-fem > a > div > div > p.pbc-hoover-title')
    const resultSecPartImgOne = document.querySelector('#mosaico-01-fem > a > div > div > p.pbc-hoover-subtitle')
    const resultThirdPartImgThree = document.querySelector('#mosaico-01-fem > a > div > div > p.pbc-hoover-text-bold')
    const resultAltImgOne = document.querySelector('#mosaico-01-fem > a > picture > img')
    const resultImgOneMobile = document.querySelector('#mosaico-01-fem > a > picture > source')
    const resultLinkImgOne = document.querySelector('#mosaico-01-fem > a')


    
    if (firstPartImgOne.length < 3 && secPartImgOne < 3 && thirdPartImgThree < 3) {
        alert('Favor preencher todos os campos corretamente');        
    } else {
        resultFirstPartImgOne.innerHTML = firstPartImgOne
        resultSecPartImgOne.innerHTML = secPartImgOne
        resultThirdPartImgThree.innerHTML = thirdPartImgThree
        resultAltImgOne.alt = altImgOne
        resultAltImgOne.src = linkImgOneDesk
        resultImgOneMobile.srcset = linkImgOneMobile
        resultLinkImgOne.href = linkImgOne
    }    
}

function copy() {
    var copyHtml = document.getElementById("mosaico-01-fem");
    var z = copyHtml.outerHTML;

    document.getElementById("codigo").innerHTML = z;
    document.getElementById("codigo").select();
    document.execCommand('copy');
}