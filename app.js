// Load Todo
// Add Todo
// Save Todo
// Delete
// Complete Todo

const form = document.querySelector('#new-item-form');
const itemInput = document.querySelector('#item-input');
const list = document.querySelector('#list');
const template = document.querySelector('#list-item-template')

const LOCAL_STORAGE_PREFIX = 'CHECKLIST-APP';
const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-items`;
let checklistItems = loadItems();
checklistItems.forEach(renderItem)


list.addEventListener('change', e => {
    if (!e.target.matches('[data-list-item-checkbox]')) return;

    const itemParent = e.target.closest('.list-item');
    const itemId = itemParent.dataset.itemId;
    const item = checklistItems.find(item => item.id === itemId);
    item.complete = e.target.checked;

    saveItems();
});

list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return;

    const itemParent = e.target.closest('.list-item');
    const itemId = itemParent.dataset.itemId;

    itemParent.remove();
    checklistItems = checklistItems.filter(item => item.id !== itemId)
    saveItems()

})

form.addEventListener('submit', e => {
    e.preventDefault()

    const itemName = itemInput.value;
    if (itemName === '') return;

    const newItem = {
        name: itemName,
        complete: false,
        id: new Date().valueOf().toString()
    }

    checklistItems.push(newItem);
    renderItem(newItem);
    saveItems();
    itemInput.value = '';
});


function renderItem(item) {
    const templateClone = template.content.cloneNode(true);
    const listItem = templateClone.querySelector('.list-item');
    listItem.dataset.itemId = item.id;
    const textElement = templateClone.querySelector('[data-list-item-text]');
    textElement.innerText = item.name;
    const checkbox = templateClone.querySelector('[data-list-item-checkbox]');
    checkbox.checked = item.complete
    list.appendChild(templateClone);
}

function loadItems() {
    const existingCheckListItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(existingCheckListItems) || [];
}

function saveItems() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checklistItems));
}