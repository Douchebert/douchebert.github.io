// URL of the ideas file
var url = '00_basic_ideas.txt';

// Fetch the file
fetch(url)
    .then(response => response.text())
    .then(text => {
        // Split the text into lines
        var lines = text.split('\n');

        // Filter the lines to get the idea group names
        var ideaGroups = lines.filter(line => line.includes('_ideas = {')).map(line => line.replace(' = {', ''));

        // Get the select element
        var select = document.getElementById('idea-group-select');

        // Add an option for each idea group
        for (var i = 0; i < ideaGroups.length; i++) {
            var option = document.createElement('option');
            option.value = ideaGroups[i];
            option.text = ideaGroups[i];
            select.appendChild(option);
        }

        // Call the displayIdeaGroupDetails function after the ideas are loaded
        displayIdeaGroupDetails();
    })
    .catch(error => console.error('Error:', error));

function displayIdeaGroupDetails() {
    var select = document.getElementById('idea-group-select');
    var ideaGroupName = select.value;

    // Fetch the file again
    fetch(url)
        .then(response => response.text())
        .then(text => {
            // Find the start of the selected idea group's details
            var start = text.indexOf(ideaGroupName + ' = {');

            // Extract the idea group's details
            var details = extractDetails(text, start);

            // Manual removes.
            details = removeSection(details, "ai_will_do");
            details = removeSection(details, "trigger");

            // Replace specific case-sensitive words with their replacements
            details = replaceWords(details);

            // Display the details
            document.getElementById('idea-group-details').textContent = details;

        })
        .catch(error => console.error('Error:', error));
}

// This function will remove a section starting from a keyword
function removeSection(text, keyword) {
    var start = text.indexOf(keyword);
    if (start !== -1) {
        var end = start;
        var openBraces = 0;
        var closeBraces = 0;

        while (end < text.length) {
            if (text[end] === '{') {
                openBraces++;
            } else if (text[end] === '}') {
                closeBraces++;
            }

            // Check if we've reached the end of the section
            if (openBraces > 0 && openBraces === closeBraces) {
                break;
            }

            end++;
        }

        text = text.substring(0, start) + text.substring(end + 1);
    }

    return text;
}


// This function extracts the idea group's details
function extractDetails(text, start) {
    var openingBraceCount = 0;
    var closingBraceCount = 0;
    var i = start;

    while (i < text.length) {
        if (text[i] === '{') {
            openingBraceCount++;
        } else if (text[i] === '}') {
            closingBraceCount++;
        }

        // Check if the idea group's details have ended
        if (openingBraceCount > 0 && openingBraceCount === closingBraceCount) {
            break;
        }

        i++;
    }

    // Extract the idea group's details
    return text.slice(start, i + 1);
}
