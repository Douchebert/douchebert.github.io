// URL of the ideas file
var url = 'https://douchebert.github.io/Ideas/00_basic_ideas.txt';  // Replace with the actual URL

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

            // Count the number of opening and closing curly braces
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
            var details = text.slice(start, i + 1);

            // Remove the "ai_will_do" part
            details = details.replace(/ai_will_do[\s\S]*/, '');

            // Remove curly brackets
            details = details.replace(/[\{\}]/g, '');

            // Replace specific case-sensitive words with their replacements
            details = replaceWords(details);

            // Display the details
            document.getElementById('idea-group-details').textContent = details;
			
			   // Replace specific case-sensitive words with their replacements
            details = replaceWords(details);
        })
        .catch(error => console.error('Error:', error));
}
