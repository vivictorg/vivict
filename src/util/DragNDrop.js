

export function setupDragAndDrop(sourceSelector) {
  // const dropArea = sourceSelector.dropArea;
  const selectorEl = sourceSelector.dropArea.parentNode;
  const dragArea = document.body;
  let dragging = false;

  // Setup drag n drop
  dragArea.addEventListener('dragover', event => {
    event.stopPropagation();
    event.preventDefault();
    console.log('dragover', event);

    if (event.dataTransfer?.types?.includes('Files')) {
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = 'copy';
    } else {
      // someone dragged text by mistake or something.
      resetDraggingUI();
    }
  });

  dragArea.addEventListener('drop', event => {
    event.stopPropagation();
    event.preventDefault();
    resetDraggingUI();
    sourceSelector.handleDrop(event);
  });

  // The mouseleave event is more reliable than dragleave when the user drops
  // the file outside the window.
  dragArea.addEventListener('mouseleave', _ => {
    if (!dragging) return;
    resetDraggingUI();
  });
  dragArea.addEventListener('dragenter', event => {
    const bbox = selectorEl.getBoundingClientRect();
    console.log('bbox', bbox);
  
    console.log('dragenter', event);
    // if (event.pageX < bbox.left || event.pageX > bbox.right) {
    //   // resetDraggingUI();
    //   return;
    // }
    
    // Only show "drop here" if there's files in the payload
    if (event.dataTransfer?.types?.includes('Files')) {

      dragArea.classList.add('dropping');
      dragging = true;
    }
  });

  function resetDraggingUI() {
    dragArea.classList.remove('dropping');
    dragging = false;
  }
}

