import React from 'react'

export const Obeserver = ({editor}) => {
    React.useEffect(()=>{
        const observer = new MutationObserver(
            function (mutations) {
      debugger
  mutations.forEach(({ type, target, attributeName }) => {
    // If the parent is a figure with an img target
    if (target.parentNode.tagName === 'FIGURE' || 
        target.nodeName === 'FIGURE')
    {
        debugger
      if (type === 'attributes') {
        switch(attributeName) {
          // If we have attribute width
          case 'width':
            // Remove attribute width
            target.removeAttribute('width');
            // Add img-fluid only once
            target.classList.add('img-fluid');
            break;

          // If we have attribute height
          case 'height':
            // Remove attribute height
            target.removeAttribute('height');
            break;
        }
      }

      // Render images HTML code
      renderHtmlOutput();
    }

  });
});
if(editor.current){
    observer.observe(editor.current, {
  attributes: true,
  childList: true,
  subtree: true
});
}
    })
    // Function to render every figure > img HTML code
function renderHtmlOutput() {
  const images = editor.querySelectorAll('figure > img');
  let output = '';

  for(const image of images) {
    output += image.outerHTML.replace(/ /g, "\n  ") + "\n";
  }

  document.getElementById('output-html').textContent = output;
}
  return (
    <div>Obeserver</div>
  )
}
