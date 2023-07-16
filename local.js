// Fetch the first text file
fetch('/Policies/policies_l_english.yml')
    .then(response => response.text())
    .then(text1 => {
        // Parse the text into a JavaScript object
        var data1 = parseYamlText(text1);

        // Fetch the second text file
        return fetch('/Policies/powers_and_ideas_l_english.yml')
            .then(response => response.text())
            .then(text2 => {
                // Parse the text into a JavaScript object
                var data2 = parseYamlText(text2);

                // Combine the data from the two files
                window.replacements = Object.assign({}, data1, data2);
            });
    })
    .catch(error => console.error('Error:', error));

// Parse YAML text into a JavaScript object
function parseYamlText(text) {
    var lines = text.split('\n');
    var data = {};

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var parts = line.split(':');
        var key = parts[0].trim();
        var value = parts[1] ? parts[1].trim() : '';

        data[key] = value;
    }

    return data;
}

// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");

  // Replace other strings based on the data from the YAML files
  for (var key in window.replacements) {
    var value = window.replacements[key];
    // Check if the value is a string
    if (typeof value === 'string') {
      var regex = new RegExp('\\b' + key + '\\b', 'g');
      text = text.replace(regex, value);
    }
  }

  return text;
}
