const apiUrl = 'http://localhost:3000/entities';

// Fetch names and display them
const fetchEntities = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const entityList = document.getElementById('entity-list');
        entityList.innerHTML = '';
        data.forEach(entity => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${entity.name}
                <button class="btn btn-danger btn-sm" onclick="deleteEntity(${entity.id})">Delete</button>
            `;
            entityList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching entities:', error);
    }
};

// Add a new name
const addEntity = async (event) => {
    event.preventDefault();
    const input = document.getElementById('new-entity-input');
    const newEntity = input.value;
    if (!newEntity) return;
    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newEntity })
        });
        input.value = '';
        fetchEntities();
    } catch (error) {
        console.error('Error adding entity:', error);
    }
};

// Delete a name
const deleteEntity = async (id) => {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchEntities();
    } catch (error) {
        console.error('Error deleting entity:', error);
    }
};

document.getElementById('add-entity-form').addEventListener('submit', addEntity);
window.onload = fetchEntities;
