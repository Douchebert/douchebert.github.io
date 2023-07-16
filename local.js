// Standardized regex pattern for replacements
var replacePattern = /([a-zA-Z_]+):0\s+"([^"]+)"/gi;

// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");
  return text;
}

// Function to process the idea group details and perform replacements
function processIdeaGroupDetails(details) {
  // Replace specific case-sensitive words with their replacements
  details = replaceWords(details);

  // Apply additional replacements or transformations to the details as needed

  return details;
}

// Function to handle the onchange event of the idea group select
function displayIdeaGroupDetails() {
  var select = document.getElementById('idea-group-select');
  var ideaGroupName = select.value;

  // Fetch the idea group details or retrieve them from your data source
  // ...

  // Simulating the fetched details for demonstration purposes
  var fetchedDetails = ideaGroupName + ":0 \"" + ideaGroupName + " Ideas\"";

  // Process the fetched details and perform replacements
  var processedDetails = processIdeaGroupDetails(fetchedDetails);

  // Display the processed details
  document.getElementById('idea-group-details').textContent = processedDetails;
}

// Call the function to load the idea group select options and set up the onchange event
loadIdeaGroupSelect();

// Call the function to display the idea group details initially
displayIdeaGroupDetails();