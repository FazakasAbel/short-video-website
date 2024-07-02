document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const theme = formData.get('theme');

    fetch(`http://localhost:5000/script?theme=${theme}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Response from Flask API:', data);
        addToObjectIDList(data.id, theme);
    })
    .catch(error => {
        console.error('Error sending message:', error);
        // Handle errors
    });
});

function addToObjectIDList(id, theme) {
    const objectIdList = document.getElementById('objectIdList');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = theme; // Display theme instead of ID
    link.href = `/details.html?id=${id}&theme=${theme}`; // Link to details page with theme
    listItem.appendChild(link);
    objectIdList.appendChild(listItem);
}
