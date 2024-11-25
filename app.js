const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();

    if (!inpWord) {
        result.innerHTML = `<h3 class="error">Please enter a word</h3>`;
        return;
    }

    fetch(`${url}${inpWord}`)
        .then((response) => {
            return response.json();
        })
        
        .then((data) => {

            // Ensure the data is valid and contains the expected structure
            const phonetic = data[0].phonetics?.[0]?.audio || "";
            const meaning = data[0].meanings?.[0];
            const partOfSpeech = meaning?.partOfSpeech || "N/A";
            const definition = meaning?.definitions?.[0]?.definition || "No definition available";
            const example = meaning?.definitions?.[0]?.example || "No example available";

            // Update the result HTML
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${partOfSpeech}</p>
            </div>
            <p class="word-meaning">
                ${definition}
            </p>
            <p class="word-example">
                ${example}
            </p>`;

            // Set the audio source
            if (phonetic) {
                sound.setAttribute("src", phonetic);
            } else {
                sound.setAttribute("src", "");
                alert("No audio available for this word.");
            }
        })
        .catch((error) => {
            console.error("Error fetching word data:", error);
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});

function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("No audio available.");
    }
}
