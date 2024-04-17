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
    var message = {
        content: 'New job application submitted!',
        embeds: [{
            title: 'Job Application Details',
            fields: Object.keys(object).filter(key => object[key] !== '').map(key => {
                return {
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: object[key],
                    inline: true
                };
            })
        }]
    };

    // Discord webhook integration
    var discordWebhookURL = 'https://discord.com/api/webhooks/1229932797750284400/z2X-9PHxqaJ7H-mHEP55Lf234eduw34XOq7jFbDsudYPyj5csxkCRAheCOWtAstJ7BRl';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', discordWebhookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 204) {
            alert('Application submitted successfully!');
        } else if (xhr.readyState === 4) {
            alert('Failed to submit application: ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify(message));
}

