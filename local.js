// Fetch the first YAML file
fetch('/Policies/policies_l_english.yml')
    .then(response => response.text())
    .then(yamlText => {
        // Parse the YAML text into a JavaScript object
        var data1 = jsyaml.load(yamlText);

        // Fetch the second YAML file
        return fetch('/Policies/powers_and_ideas_l_english.yml');
    })
    .then(response => response.text())
    .then(yamlText => {
        // Parse the YAML text into a JavaScript object
        var data2 = jsyaml.load(yamlText);

        // Combine the data from the two files
        window.replacements = Object.assign({}, data1, data2);
    })
    .catch(error => console.error('Error:', error));

// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");

  // Replace other strings based on the data from the YAML files
  for (var key in window.replacements) {
    var value = window.replacements[key];
    var regex = new RegExp('\\b' + key + '\\b', 'g');
    text = text.replace(regex, value);
  }

  return text;
}
