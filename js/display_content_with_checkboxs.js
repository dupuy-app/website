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
      alert("Configuration importée avec succès !");
    } catch (error) {
      alert("Erreur : le fichier n'est pas un JSON valide.");
    }
  };
  reader.readAsText(file);
  window.location.reload();
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


async function affichageStandard(listeOb, enTeteString){

  mdResult_toHTML = await enTeteString ;

  let listeObjetR = await listeOb ;
  
  const checkboxStateSaved = localStorage.getItem('checkboxConfig');
  
  if (checkboxStateSaved) {   // récupere état des checkboxs depuis localstorage pour gérer l'affichage
      const ListCheckBoxs = JSON.parse(checkboxStateSaved);
      for (objetRegle of listeObjetR){
        if (ListCheckBoxs[objetRegle.nomRegle] == true) {
	      mdResult_toHTML += objetRegle.codehtml;
	    }
      }  
  
  } else {      // si localstorage est vide, affiche tout par défaut (car les checkboxs sont cochés par défaut)
      for (objetRegle of listeObjetR){  

  	    		  
        mdResult_toHTML += objetRegle.codehtml; 
	    	  
      }  
  }
	  

  const div_md = document.getElementById("md_to_render");
  div_md.innerHTML = mdResult_toHTML;
}  




async function affichageMd(listeOb, enTeteStringMd){

  mdResult = await enTeteStringMd ;

  let listeObjetR = await listeOb ;

  const checkboxStateSaved = localStorage.getItem('checkboxConfig');
  
  if (checkboxStateSaved) {   // récupere état des checkboxs depuis localstorage pour gérer l'affichage
      const ListCheckBoxs = JSON.parse(checkboxStateSaved);
      for (objetRegle of listeObjetR){
        if (ListCheckBoxs[objetRegle.nomRegle] == true) {
	      mdResult += objetRegle.codemd;
	    }
      }  
  
  } else {      // si localstorage est vide, affiche tout par défaut (car les checkboxs sont cochés par défaut)
      for (objetRegle of listeObjetR){  

  	    		  
        mdResult += objetRegle.codemd; 
	    	  
      }  
  }
  
  const div_md = document.getElementById("md_raw");
  div_md.innerHTML = mdResult;
}

  


async function recupereToutHTMLandMD(listeRegle) {
  
  let liste_ObjetRegle = [];
  for (regle of listeRegle){
    mdResult_tocurrentFile = await recupererFichier("../code/html/" + regle + ".html") ; // recupere le html pour le fichier courant
	mdRaw_tocurrentFile = await recupererFichier("../code/md/" + regle + ".md") ;
    let regleObjet = new Object();
	regleObjet.nomRegle = regle;
    regleObjet.codehtml = mdResult_tocurrentFile;
	regleObjet.codemd = mdRaw_tocurrentFile;

    liste_ObjetRegle.push(regleObjet);
  }

  


	return liste_ObjetRegle;
}








const listeRegle = ["modules", "espaces", "module-reboot", "module-template", "module-shell", "module-yum"];      // création de la liste de règles qui sera faites en fonction des règles ayant un checkbox

let tableauObjetRegle = recupereToutHTMLandMD(listeRegle);

enTeteHTML = recupererFichier("../code/html/entete.html");

enTeteMD = recupererFichier("../code/md/entete.md");

affichageStandard(tableauObjetRegle, enTeteHTML);
affichageMd(tableauObjetRegle, enTeteMD);





let checkBoxsListe = document.querySelectorAll('.checkBoxs');

for (let i = 0; i < checkBoxsListe.length; i++) {
  checkBoxsListe[i].addEventListener('change', function() {
      
	
    saveCheckboxesToLocalStorage();
	affichageStandard(tableauObjetRegle, enTeteHTML);
	affichageMd(tableauObjetRegle, enTeteMD);
	
});
}



// Charger les checkboxes au démarrage
window.onload = loadCheckboxesFromLocalStorage;
