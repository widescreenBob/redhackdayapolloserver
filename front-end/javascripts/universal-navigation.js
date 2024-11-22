// Close the Universal Nav dropdown when a user hits escape:
const handleUNavEsc = (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  const detailsElement = document.querySelector('.universal-nav-dropdown');
  const summaryElement = detailsElement.querySelector('summary');
  if (!detailsElement?.open) {
    return;
  }

  detailsElement.removeAttribute('open');
  summaryElement.focus();
};

document.addEventListener('keydown', handleUNavEsc);
