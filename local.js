// Global object to store the mappings
var replacements = {};

// Fetch the local.txt file and store the replacements in the global object
fetch('local.txt')
    .then(response => response.text())
    .then(text => {
        // Split the text into lines
        var lines = text.split('\n');
        
        // Process each line
        for (var line of lines) {
            // Split the line into the key and value
            var parts = line.split(':0 ');
            if (parts.length === 2) {
                // Store the replacement in the global object
                replacements[parts[0]] = parts[1].replace(/"/g, '');
            }
        }
    })
    .catch(error => console.error('Error:', error));

// Function to replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");

  // Go through each replacement
  for (var key in replacements) {
      // Replace all occurrences of the key with its corresponding value
      var regex = new RegExp('\\b' + key + '\\b', 'g');
      text = text.replace(regex, replacements[key]);
  }

  return text;
}
