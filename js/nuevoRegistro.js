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

// ---------- Ejercicios de gimnasio ----------
// Cada ejercicio se numera según su posición (1, 2, 3…) y sus id/for
// terminan en ese número, así siempre son únicos.
const exercisesContainer = document.getElementById('exercises-container');
const addExerciseButton = document.getElementById('btn-add-exercise');

// El primer ejercicio sirve de molde para los nuevos.
const exerciseTemplate = exercisesContainer.querySelector('.exercise-item').cloneNode(true);

function createRemoveButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-remove-exercise';
  button.textContent = 'Quitar';
  return button;
}

function renumberExercises() {
  const items = exercisesContainer.querySelectorAll('.exercise-item');

  items.forEach((item, index) => {
    const number = index + 1;
    item.querySelector('.exercise-number').textContent = `Ejercicio ${number}`;

    // gym-sets-3 → gym-sets-<number>
    for (const input of item.querySelectorAll('input')) {
      const label = item.querySelector(`label[for="${input.id}"]`);
      input.id = input.id.replace(/-\d+$/, `-${number}`);
      label.htmlFor = input.id;
    }

    // Todos menos el primero tienen botón para quitarlo.
    let removeButton = item.querySelector('.btn-remove-exercise');
    if (number > 1 && !removeButton) {
      removeButton = createRemoveButton();
      item.querySelector('.exercise-header').append(removeButton);
    }
    if (removeButton) {
      removeButton.setAttribute('aria-label', `Quitar ejercicio ${number}`);
    }
  });
}

function addExercise() {
  const newItem = exerciseTemplate.cloneNode(true);
  for (const input of newItem.querySelectorAll('input')) {
    input.value = '';
  }
  exercisesContainer.append(newItem);
  renumberExercises();
  newItem.querySelector('input').focus();
}

function removeExercise(item) {
  const previousItem = item.previousElementSibling;
  item.remove();
  renumberExercises();
  // El foco pasa al ejercicio anterior para no perderlo al quitar el botón.
  previousItem.querySelector('input').focus();
}

addExerciseButton.addEventListener('click', addExercise);

exercisesContainer.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.btn-remove-exercise');
  if (removeButton) {
    removeExercise(removeButton.closest('.exercise-item'));
  }
});
