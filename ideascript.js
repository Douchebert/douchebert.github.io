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

            // New presentation
            var presentation = {};
            var splitDetails = details.split("{");
            
            // Get the title and category
            presentation.title = splitDetails[0].split('=')[0].trim();
            presentation.category = splitDetails[0].split('=')[1].trim();
            
            // Get the bonus and ideas
            var bonusAndIdeas = splitDetails[1].split('bonus = {')[1].split(' }');
            presentation.bonus = bonusAndIdeas[0];
            presentation.ideas = bonusAndIdeas.slice(1, -1);
            
            // Create HTML
            var html = `<h2>${presentation.title}</h2><p>Category = ${presentation.category}</p>`;
            
            html += '<h3>Bonus</h3>';
            html += `<p>${presentation.bonus}</p>`;
            
            for (var i = 0; i < presentation.ideas.length; i++) {
                var ideaName = presentation.ideas[i].split(' = {')[0].trim();
                var ideaDetails = presentation.ideas[i].split(' = {')[1].trim();
                
                html += `<h3>${ideaName}</h3>`;
                html += `<p>${ideaDetails}</p>`;
            }
            
            // Display the details
            document.getElementById('idea-group-details').innerHTML = html;
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
