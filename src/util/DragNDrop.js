

export function setupDragAndDrop(sourceSelector) {
  // const dropArea = sourceSelector.dropArea;
  const selectorEl = sourceSelector.dropArea.parentNode;
  const side = sourceSelector.dropArea.parentNode.classList.contains('left-source-selector') ? 'left' : 'right';
  const dragArea = document.body;
  let bbox = selectorEl.getBoundingClientRect();
  let dragging = false;

  const isMouseOutsideThisHalf = event => event.pageX < bbox.left || event.pageX > (bbox.left + bbox.width);

  dragArea.addEventListener('dragover', event => {
    if (isMouseOutsideThisHalf(event)) {
      resetDraggingUI();
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer?.types?.includes('Files')) {
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = 'copy';

      document.body.classList.add(`dropping--body-${side}`);
      selectorEl.classList.add('dropping');
      dragging = true;
    } else {
      // someone dragged text by mistake or something.
      resetDraggingUI();
    }
  });

  dragArea.addEventListener('drop', event => {
    if (isMouseOutsideThisHalf(event)) { 
      return;
    }
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
    bbox = selectorEl.getBoundingClientRect();
  });


  function resetDraggingUI() {
    document.body.classList.remove(`dropping--body-${side}`);
    selectorEl.classList.remove('dropping');
    dragging = false;
  }
}

