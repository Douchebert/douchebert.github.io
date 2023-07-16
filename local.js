// Replace specific case-sensitive words with their replacements
function replaceWords(text) {
  text = text.replace(/\bADM\b/g, "Administrative");
  text = text.replace(/\bDIP\b/g, "Diplomatic");
  text = text.replace(/\bMIL\b/g, "Military");
  return text;
}

// Usage example
var originalText = "This is an example using ADM, DIP, and MIL.";
var replacedText = replaceWords(originalText);
console.log(replacedText);