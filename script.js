function submitForm() {
    const formData = new FormData(document.getElementById('jobApp'));
    const object = {};
    formData.forEach((value, key) => { object[key] = value; });

    // Basic validation
    if (!object.name || !object.discord) {
        alert('Please fill in all required fields.');
        return;
    }

    // Constructing the message
    let messageContent = `**New Job Application**\n`;
    for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== '') {
            messageContent += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${object[key]}\n`;
        }
    }

    // Send the data to Discord
    fetch('https://discord.com/api/webhooks/1230204645989814364/CLdFj2GMNxTU_f3Cs25Z636zhVQmEaRYKAMAxLr7Z6VlxH2nx8OyxGROOlHcO9_Ozwsy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: messageContent
        })
    })
    .then(response => response.json())
    .then(data => alert('Application submitted successfully!'))
    .catch((error) => alert('Failed to submit application: ' + error));
}
