// Global object to store the mappings
var replacements = {};

// Hardcoded replacements for special cases
var specialCases = {
    'brahmins_hindu_loyalty_modifier': 'Brahmins Hindu Loyalty Equilibrium',
	'category': 'Category',
    'brahmins_muslim_loyalty_modifier': 'Brahmins Muslim Loyalty Equilibrium',
    'church_loyalty_modifier': 'Church Loyalty Equilibrium',
    'maratha_loyalty_modifier': 'Maratha Loyalty Equilibrium',
    'nobles_loyalty_modifier': 'Nobles Loyalty Equilibrium',
    'nobles_influence_modifier': 'Nobles Influence',
    'burghers_loyalty_modifier': 'Burghers Loyalty Equilibrium',
    'burghers_influence_modifier': 'Burghers Influence',
    'rajput_loyalty_modifier': 'Rajput Loyalty Equilibrium',
    'cossacks_privilege_slots': 'Cossacks Max Privileges',
    'dhimmi_loyalty_modifier': 'Dhimmi Loyalty Equilibrium',
    'nomadic_tribes_loyalty_modifier': 'Nomadic Tribes Loyalty Equilibrium',
    'vaisyas_loyalty_modifier': 'Vaisyas Loyalty Equilibrium',
    'jains_loyalty_modifier': 'Jains Loyalty Equilibrium',
	'diplomats': 'Diplomats',
	'cav_to_inf_ratio': 'Cavalry To Infantry Ratio',
	'army_tradition_decay': 'Yearly Army Tradition Decay',
	'navy_tradition_decay': 'Yearly Navy Tradition Decay',
	'fabricate_claims_cost': 'Cost To Fabricate Claims',
	'global_autonomy': 'Monthly Autonomy Change',
	'merchants': 'Merchants',
};

// Fetch the local.txt file and store the replacements in the global object
fetch('local.txt')
    .then(response => response.text())
    .then(text => {
        // Split the text into lines
        var lines = text.split('\n');
        
        // Process each line
        for (var line of lines) {
            // Split the line into the key and value
            var parts = line.split(':');
            if (parts.length === 2) {
                var key = parts[0].trim();
                var value = parts[1].trim();

                // Extract the string between quotes
                var match = value.match(/"(.+)"/);
                if (match && match[1]) {
                    // Store the replacement in the global object
                    replacements[key] = match[1];
                }
            }
        }
    })
    .catch(error => console.error('Error:', error));


// Function to replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");

  // Replace special cases
  for (var key in specialCases) {
    var regex = new RegExp('\\b' + key + '\\b', 'gi');
    text = text.replace(regex, specialCases[key]);
  }

  // Go through each replacement
  for (var key in replacements) {
    if (!specialCases[key]) { // Check if the key is not a special case
      // Replace all occurrences of the key with its corresponding value
      var regex = new RegExp('\\b' + key + '\\b', 'gi');  // 'i' for case-insensitive
      text = text.replace(regex, replacements[key]);
    }
  }

  return text;
}