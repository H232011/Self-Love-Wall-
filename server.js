// Replace the backend URL with your Render URL
const backendUrl = 'https://your-service-name.onrender.com';

// Load notes from the backend
async function loadNotes() {
    try {
        const response = await fetch(`${backendUrl}/api/notes`);
        const notes = await response.json();
        notes.forEach(note => {
            addNoteToDOM(note);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

// Publish a new note
async function publishNote() {
    const noteText = userNote.value.trim();
    if (noteText === '' || noteText.length > 279) return;

    const noteData = {
        text: noteText,
        color: userNote.style.backgroundColor || '#C7C5D1',
    };

    try {
        const response = await fetch(`${backendUrl}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        if (response.ok) {
            const newNote = await response.json();
            addNoteToDOM(newNote);
            userNote.value = '';
            userNote.style.backgroundColor = '#C7C5D1';
        }
    } catch (error) {
        console.error('Error publishing note:', error);
    }
}
