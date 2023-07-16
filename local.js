// Standardized regex pattern for replacements
var replacePattern = /([a-zA-Z_]+):0\s+"([^"]+)"/g;

// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");
  return text;
}

// Function to load and process the policies file
function loadPoliciesFile() {
  var policiesUrl = 'Policies/policies_l_english.yml'; // Replace with the correct URL
  fetch(policiesUrl)
    .then(response => response.text())
    .then(text => {
      var processedText = processPoliciesText(text);
      console.log(processedText);
    })
    .catch(error => console.error('Error:', error));
}

// Function to process the policies text
function processPoliciesText(text) {
  // Apply the standardized replacements
  text = text.replace(replacePattern, '$2');

  // Process the policies text here
  // You can apply any additional replacements or transformations to the text

  // Return the processed text
  return text;
}

// Function to load and process the powers and ideas file
function loadPowersAndIdeasFile() {
  var powersAndIdeasUrl = 'Policies/powers_and_ideas_l_english.yml'; // Replace with the correct URL
  fetch(powersAndIdeasUrl)
    .then(response => response.text())
    .then(text => {
      var processedText = processPowersAndIdeasText(text);
      console.log(processedText);
    })
    .catch(error => console.error('Error:', error));
}

// Function to process the powers and ideas text
function processPowersAndIdeasText(text) {
  // Apply the standardized replacements
  text = text.replace(replacePattern, '$2');

  // Process the powers and ideas text here
  // You can apply any additional replacements or transformations to the text

  // Return the processed text
  return text;
}

// Call the function to load and process the policies file
loadPoliciesFile();

// Call the function to load and process the powers and ideas file
loadPowersAndIdeasFile();
