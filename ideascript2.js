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

            // Define sections to remove
            var sectionsToRemove = ["ai_will_do", "trigger"];

            // Remove the sections
            details = removeSections(details, sectionsToRemove);

            // Replace specific case-sensitive words with their replacements
            details = replaceWords(details);

            // Display the details
            document.getElementById('idea-group-details').textContent = details;

        })
        .catch(error => console.error('Error:', error));
}

// This function will remove a section starting from a keyword
function removeSections(text, sectionsToRemove) {
    // Process each section to remove
    for (var j = 0; j < sectionsToRemove.length; j++) {
        var sectionName = sectionsToRemove[j];

        // Find the start of the section
        var start = text.indexOf(sectionName + ' = {');

        while (start !== -1) {
            // Count the number of opening and closing curly braces
            var openingBraceCount = 0;
            var closingBraceCount = 0;
            var i = start + sectionName.length + 3; // Start after the section name and ' = {'

            while (i < text.length) {
                if (text[i] === '{') {
                    openingBraceCount++;
                } else if (text[i] === '}') {
                    closingBraceCount++;
                }

                // Check if the section has ended
                if (openingBraceCount > 0 && openingBraceCount === closingBraceCount) {
                    break;
                }

                i++;
            }

            // Remove the section
            text = text.slice(0, start) + text.slice(i + 1);
            
            // Find the next occurrence of the section
            start = text.indexOf(sectionName + ' = {');
        }
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
