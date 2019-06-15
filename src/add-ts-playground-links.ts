const createAnchorForString = (text: string, onclick?: any) => {
    const link = document.createElement("a")
    if (text){
        link.href = "https://www.typescriptlang.org/play/#src=" + encodeURI(text)
    }
    link.text = "TS"
    link.style.position = "absolute"
    link.style.textAlign = "right"
    link.style.color = "white"
    link.style.backgroundColor = "#187ABF"
    link.style.width = "30px"
    link.style.height = "30px"
    link.style.lineHeight = "44px"
    link.style.paddingRight = "2px"
    link.style.right = "4px"
    link.style.bottom = "4px"
    link.style.borderRadius = "2px"

    if (onclick) {
        link.onclick = onclick
    }
    return link
}

const addLinkToFile = (allMainBlocks: HTMLCollectionOf<Element>) => {
    for (const block of allMainBlocks) {
        // @ts-ignore
        // This exists for sure at runtime
        block.style.position = "relative"

        const a = createAnchorForString(undefined, () => {
            // https://github.com/danger/danger-js/blob/master/dangerfile.ts
            // to
            // https://raw.githubusercontent.com/danger/danger-js/master/dangerfile.ts
            // then grab the raw text content
            const paths = document.location.pathname.split("/")
            const newPath = `https://raw.githubusercontent.com${paths[0]}/${paths[1]}/${paths[2]}/${paths.slice(4).join("/")}`
            fetch(newPath)
              .then(res => res.text())
              .then(text => {
                //   debugger
                  window.location.href = "https://www.typescriptlang.org/play/#src=" + encodeURI(text)
              })
        })
        block.parentNode.appendChild(a)
    }
}

const addLinkToCodeblocksInMarkdown = (allCodeBlocks: HTMLCollectionOf<Element>) => {
    for (const block of allCodeBlocks) {
        // @ts-ignore
        // This exists for sure at runtime
        block.style.position = "relative"
        
        const a = createAnchorForString(block.textContent)
        block.appendChild(a)
    }
}

setTimeout(() => {
    const mainTSFiles = document.getElementsByClassName("type-typescript")
    if(mainTSFiles.length){
        addLinkToFile(mainTSFiles)
    
    }
    const allInlineCodeBlocks = document.getElementsByClassName("highlight-source-ts")
    if(allInlineCodeBlocks.length) {
        addLinkToCodeblocksInMarkdown(allInlineCodeBlocks)
    }
}, 300)
