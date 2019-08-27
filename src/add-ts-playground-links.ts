const createAnchorForString = (text: string, onclick?: any) => {
  const link = document.createElement("a");
  if (text) {
    link.href = "https://www.typescriptlang.org/play/#src=" + encodeURI(text);
  }
  link.text = "TS";
  link.style.position = "absolute";
  link.style.textAlign = "right";
  link.style.color = "white";
  link.style.backgroundColor = "#187ABF";
  link.style.width = "30px";
  link.style.height = "30px";
  link.style.lineHeight = "44px";
  link.style.paddingRight = "2px";
  link.style.right = "4px";
  link.style.bottom = "4px";
  link.style.borderRadius = "2px";

  if (onclick) {
    link.onclick = onclick;
  }
  return link;
};

const addLinkToFile = (allMainBlocks: HTMLCollectionOf<Element>) => {
  for (const block of allMainBlocks) {
    // @ts-ignore
    // This exists for sure at runtime
    block.style.position = "relative";

    const a = createAnchorForString(undefined, () => {
      // https://github.com/danger/danger-js/blob/master/dangerfile.ts
      // to
      // https://raw.githubusercontent.com/danger/danger-js/master/dangerfile.ts
      // then grab the raw text content
      const paths = document.location.pathname.split("/");
      const pathComponents = paths.slice(4).join("/");
      const newPath = `https://raw.githubusercontent.com${paths[0]}/${paths[1]}/${paths[2]}/${pathComponents}`;
      fetch(newPath)
        .then(res => res.text())
        .then(text => {
          //   debugger
          window.location.href = "https://www.typescriptlang.org/play/#src=" + encodeURI(text);
        });
    });
    block.parentNode.appendChild(a);
  }
};

const addLinkToCodeblocks = (allCodeBlocks: HTMLCollectionOf<Element>) => {
  for (const block of allCodeBlocks) {
    // @ts-ignore
    // This exists for sure at runtime
    block.style.position = "relative";

    const a = createAnchorForString(block.textContent);
    block.appendChild(a);
  }
};

const observer =
  new MutationObserver((mutations: MutationRecord[]) => {
    addLinkToCodeblocksInMarkdown()
  });

const addLinkToCodeblocksInMarkdown = () => {
  const allInlineCodeBlocks = document.getElementsByClassName("highlight-source-ts");
  if (allInlineCodeBlocks.length) {
    addLinkToCodeblocks(allInlineCodeBlocks);
  }
}

setTimeout(() => {
  const mainTSFiles = document.getElementsByClassName("type-typescript");
  if (mainTSFiles.length) {
    addLinkToFile(mainTSFiles);
  }

  addLinkToCodeblocksInMarkdown();

  // This will be triggered every time a new comment is added, allowing us
  // to link new TypeScript blocks as they are created.
  observer.observe(document.getElementsByClassName("js-discussion")[0] as Node, {
    attributes: false,
    childList: true,
  });
}, 300);
