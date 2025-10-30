async function copierMarkdown() {
    const textarea = document.getElementById("md_raw");
    try {
        await navigator.clipboard.writeText(textarea.value);
        alert("Markdown copié !");
    } catch (err) {
        console.error("Erreur lors de la copie : ", err);
    }
}


function telechargeMarkdown() {
    const textarea = document.getElementById("md_raw");
    const texte = textarea.value;

    // Créer un blob avec le texte
    const blob = new Blob([texte], { type: "text/plain" });

    // Créer un lien temporaire et déclencher le téléchargement
    const lien = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    lien.download = "rules.md"; // nom du fichier

    // Déclencher le téléchargement
    lien.dispatchEvent(new MouseEvent("click"));

    // Nettoyer
    URL.revokeObjectURL(lien.href);
}
