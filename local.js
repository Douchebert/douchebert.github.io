// Standardized regex pattern for replacements
var replacePattern = /([a-zA-Z_]+):0\s+"([^"]+)"/gi;

// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");
  text = text.replace(replacePattern, "$2");
  return text;
}

// Function to load and process the policies file
function loadPoliciesFile() {
  var policiesUrl = 'Policies/policies_l_english.yml'; // Replace with the correct URL
  fetch(policiesUrl)
    .then(response => response.text())
    .then(text => {
      var processedText = replaceWords(text);
      console.log(processedText);
    })
    .catch(error => console.error('Error:', error));
}

// Function to load and process the powers and ideas file
function loadPowersAndIdeasFile() {
  var powersAndIdeasUrl = 'Policies/powers_and_ideas_l_english.yml'; // Replace with the correct URL
  fetch(powersAndIdeasUrl)
    .then(response => response.text())
    .then(text => {
      var processedText = replaceWords(text);
      console.log(processedText);
    })
    .catch(error => console.error('Error:', error));
}

// Call the function to load and process the policies file
loadPoliciesFile();

// Call the function to load and process the powers and ideas file
loadPowersAndIdeasFile();
