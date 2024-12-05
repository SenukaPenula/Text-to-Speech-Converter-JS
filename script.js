let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to populate voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voiceSelect.innerHTML = ''; // Clear existing options
        voices.forEach((voice, i) => {
            const option = new Option(`${voice.name} (${voice.lang})`, i);
            voiceSelect.add(option);
        });
        speech.voice = voices[0]; // Default voice
    } else {
        console.warn("No voices available.");
    }
}

// Handle voiceschanged event
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
} else {
    populateVoices();
}

// Update voice when selection changes
voiceSelect.addEventListener("change", () => {
    const selectedIndex = parseInt(voiceSelect.value, 10);
    speech.voice = voices[selectedIndex];
});

// Handle text-to-speech functionality
document.querySelector("button").addEventListener("click", () => {
    // Cancel ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const text = document.querySelector("textarea").value.trim();
    if (!text) {
        alert("Please enter some text to convert to speech!");
        return;
    }

    // Reinitialize the SpeechSynthesisUtterance object to avoid garbage collection issues
    speech = new SpeechSynthesisUtterance();
    speech.voice = voices[voiceSelect.value];
    speech.text = text;

    // Error handling
    speech.onerror = (e) => console.error("Speech synthesis error:", e);
    
    window.speechSynthesis.speak(speech);
});
