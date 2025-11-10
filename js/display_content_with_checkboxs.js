// Sauvegarder l'état des checkboxes dans le localStorage
function saveCheckboxesToLocalStorage() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checked = {};
  checkboxes.forEach(checkbox => {
    checked[checkbox.id] = checkbox.checked;
  });
  localStorage.setItem('checkboxConfig', JSON.stringify(checked));
}

// Charger l'état des checkboxes depuis le localStorage
function loadCheckboxesFromLocalStorage() {
  const saved = localStorage.getItem('checkboxConfig');
  if (saved) {
    const ListCheckBoxs = JSON.parse(saved);
    for (const id in ListCheckBoxs) {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = ListCheckBoxs[id];
    }
  }
}

// Exporter en JSON
function exportToJSON() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checked = {};
  checkboxes.forEach(checkbox => {
    checked[checkbox.id] = checkbox.checked;
  });

  const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(checked));
  const a = document.createElement('a');
  a.href = data;
  a.download = 'checkbox_config.json';
  a.click();
}

// Importer depuis un fichier JSON
function importFromJSON() {
  const input = document.getElementById('importInput');
  const file = input.files[0];

  if (!file) {
    alert("Veuillez sélectionner un fichier JSON.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const checked = JSON.parse(e.target.result);
      for (const id in checked) {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = checked[id];
      }
      // Sauvegarder dans le localStorage après import
      saveCheckboxesToLocalStorage();
	  affichageStandard();
	  affichageMd();
      alert("Configuration importée avec succès !");
    } catch (error) {
      alert("Erreur : le fichier n'est pas un JSON valide.");
    }
  };
  reader.readAsText(file);

}




async function recupererFichier(url) {
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }
    return await reponse.text();
  } catch (erreur) {
    console.error("Erreur lors de la récupération du fichier :", erreur);
    return null;
  }
}


function affichageStandard(){

  sautDeLigne = `
`;

  summary = sessionStorage.getItem('enteteFirst.html');
  summaryEnd = sessionStorage.getItem('enteteLast.html');
  mdResult_toHTML = "";

  listeRegleString = sessionStorage.getItem('liste_de_regles');
  let listeObjetR = JSON.parse(listeRegleString);
  
  const checkboxStateSaved = localStorage.getItem('checkboxConfig');
  
  if (checkboxStateSaved) {   // récupere état des checkboxs depuis localstorage pour gérer l'affichage
      const ListCheckBoxs = JSON.parse(checkboxStateSaved);
      for (objetRegle of listeObjetR){
        if (ListCheckBoxs[objetRegle] == true) {
	      
          the_checkbox = document.getElementById(objetRegle);
          label = document.querySelector(`label[for="${the_checkbox.id}"]`);

          texteLabel = label.innerHTML;
          summary += "<li>" + texteLabel + "</li>" + sautDeLigne;
          mdResult_toHTML += sessionStorage.getItem(objetRegle + '.html');
	    }
      }  
  
  } else {      // si localstorage est vide, affiche tout par défaut (car les checkboxs sont cochés par défaut)
      for (objetRegle of listeObjetR){  

  	    the_checkbox = document.getElementById(objetRegle);
        label = document.querySelector(`label[for="${the_checkbox.id}"]`);
        
        texteLabel = label.innerHTML;
        summary += "<li>" + texteLabel + "</li>" + sautDeLigne;		
        mdResult_toHTML += sessionStorage.getItem(objetRegle + '.html'); 
	    	  
      }  
  }
	  

  mdResult_toHTML = summary + summaryEnd + mdResult_toHTML ;
  const div_md = document.getElementById("md_to_render");
  div_md.innerHTML = mdResult_toHTML;
}    




function affichageMd(){

  sautDeLigne = `
`;

  summaryMD = sessionStorage.getItem('enteteFirst.md');
  summaryMDEnd = sessionStorage.getItem('enteteLast.md');
  mdResult = "";

  listeRegleString = sessionStorage.getItem('liste_de_regles');
  let listeObjetR = JSON.parse(listeRegleString);
  
  const checkboxStateSaved = localStorage.getItem('checkboxConfig');
  
  if (checkboxStateSaved) {   // récupere état des checkboxs depuis localstorage pour gérer l'affichage
      const ListCheckBoxs = JSON.parse(checkboxStateSaved);
      for (objetRegle of listeObjetR){
        if (ListCheckBoxs[objetRegle] == true) {

          the_checkbox = document.getElementById(objetRegle);
          label = document.querySelector(`label[for="${the_checkbox.id}"]`);

          texteLabel = label.innerHTML;
          summaryMD += "  - " + texteLabel + sautDeLigne;
          mdResult += sessionStorage.getItem(objetRegle + '.md');
        }
      }  
  
  } else {      // si localstorage est vide, affiche tout par défaut (car les checkboxs sont cochés par défaut)
      for (objetRegle of listeObjetR){  

        the_checkbox = document.getElementById(objetRegle);
        label = document.querySelector(`label[for="${the_checkbox.id}"]`);

        texteLabel = label.innerHTML;
        summaryMD += "  - " + texteLabel + sautDeLigne;
        mdResult += sessionStorage.getItem(objetRegle + '.md'); 

      }
  }
  
  mdResult = summaryMD + summaryMDEnd + mdResult ;
  const div_md = document.getElementById("md_raw");
  div_md.innerHTML = mdResult;
}

  


async function chargeEnSessionToutHTMLandMD(listeRegle) {
  

  for (regle of listeRegle){
    mdResult_tocurrentFile = await recupererFichier("../code/html/" + regle + ".html") ; // recupere le html pour le fichier courant
	mdRaw_tocurrentFile = await recupererFichier("../code/md/" + regle + ".md") ;


    sessionStorage.setItem(regle + '.html', mdResult_tocurrentFile);
	sessionStorage.setItem(regle + '.md', mdRaw_tocurrentFile);

  }

  enTeteHTMLFirstPart = await recupererFichier("../code/html/enteteFirst.html");
  enTeteHTMLLastPart = await recupererFichier("../code/html/enteteLast.html");

  enTeteMDFirstPart = await recupererFichier("../code/md/enteteFirst.md");
  enTeteMDLastPart = await recupererFichier("../code/md/enteteLast.md");

  sessionStorage.setItem('enteteFirst.html', enTeteHTMLFirstPart);
  sessionStorage.setItem('enteteLast.html', enTeteHTMLLastPart);

  sessionStorage.setItem('enteteFirst.md', enTeteMDFirstPart);
  sessionStorage.setItem('enteteLast.md', enTeteMDLastPart);
  
  sessionStorage.setItem('liste_de_regles', JSON.stringify(listeRegle));

}








const listeRegle = ["modules", "espaces", "module-reboot", "module-template", "module-shell", "module-yum"];      // création de la liste de règles qui sera faites en fonction des règles ayant un checkbox



(async () => {
  await chargeEnSessionToutHTMLandMD(listeRegle);
  affichageStandard();
  affichageMd();
})();



let checkBoxsListe = document.querySelectorAll('.checkBoxs');

for (let i = 0; i < checkBoxsListe.length; i++) {
  checkBoxsListe[i].addEventListener('change', function() {
      
	
    saveCheckboxesToLocalStorage();
	affichageStandard();
	affichageMd();
	
});
}



// Charger les checkboxes au démarrage
window.onload = loadCheckboxesFromLocalStorage;
