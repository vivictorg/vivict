

export function setupDragAndDrop(sourceSelector) {
  const dropArea = sourceSelector.dropArea;
  let dragging = false;

  // Setup drag n drop
  dropArea.addEventListener('dragover', event => {
    event.stopPropagation();
    event.preventDefault();

    if (event.dataTransfer?.types?.includes('Files')) {
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = 'copy';
    } else {
      // someone dragged text by mistake or something.
      resetDraggingUI();
    }
  });

  dropArea.addEventListener('drop', event => {
    event.stopPropagation();
    event.preventDefault();
    resetDraggingUI();
    sourceSelector.handleDrop(event);
  });

  // The mouseleave event is more reliable than dragleave when the user drops
  // the file outside the window.
  dropArea.addEventListener('mouseleave', _ => {
    if (!dragging) return;
    resetDraggingUI();
  });
  dropArea.addEventListener('dragenter', event => {
    // Don't trigger if someone (me) accidentally drags the demo link.
    if (event.dataTransfer?.types?.includes('Files')) {
      // 
      dropArea.classList.add('dropping');
      dragging = true;
    }
  });

  function resetDraggingUI() {
    dropArea.classList.remove('dropping');
    dragging = false;
  }
}

