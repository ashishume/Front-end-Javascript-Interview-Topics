const str = "zshaishdebnath";
function firstRepeatedCharacter(str) {
    const charCount = {};
    for (let char of str) {
        if (charCount[char]) {
            return char;
        } else {
            charCount[char] = 1;
        }
    }
    return null; // If no repeated character found
}
console.log(firstRepeatedCharacter(str));
