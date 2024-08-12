window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const objectId = urlParams.get('id');
    const theme = urlParams.get('theme');

    fetch(`http://192.168.49.2/script/${objectId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Script details:', data);
            displayScriptDetails(data);
            displayScriptTheme(theme);
        })
        .catch(error => {
            console.error('Error fetching script details:', error);
            displayErrorMessage('Failed to fetch script details.');
        });
};

function displayScriptDetails(script) {
    const scriptDetailsDiv = document.getElementById('scriptDetails');
    scriptDetailsDiv.textContent = JSON.stringify(script, null, 2);
}

function displayScriptTheme(theme) {
    const scriptThemeDiv = document.getElementById('scriptTheme');
    scriptThemeDiv.textContent = theme;
}


function goBack() {
    window.history.back();
}
