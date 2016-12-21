/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}

export function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
