// Muestra solo el bloque del tipo de actividad elegido.
// El bloque oculto también se desactiva para que sus campos no se envíen.
const activityType = document.getElementById('activity-type');

const blocksByType = {
  gimnasio: document.querySelector('.group-gym'),
  basquet: document.querySelector('.group-basketball'),
};

function updateVisibleBlock() {
  for (const [type, block] of Object.entries(blocksByType)) {
    const isSelected = activityType.value === type;
    block.hidden = !isSelected;
    block.disabled = !isSelected;
  }
}

activityType.addEventListener('change', updateVisibleBlock);
updateVisibleBlock();
