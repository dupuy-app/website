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
      
	
    if (this.checked) {
        tableauObjetRegle.then(tableauObjet => {
		  let index = tableauObjet.findIndex(objetR => objetR.nomRegle === this.id); // trouve 1 obj de la liste qui son nom == id
		  tableauObjet[index].isDisplayed = 1; // Ajoute l'élément
		});  
    } else {
        tableauObjetRegle.then(tableauObjet => {
		  let index = tableauObjet.findIndex(objetR => objetR.nomRegle === this.id); // trouve 1 obj de la liste qui son nom == id
		  tableauObjet[index].isDisplayed = 0; // Enleve l'élément
		});
    }
	affichageStandard(tableauObjetRegle, enTeteHTML);
	affichageMd(tableauObjetRegle, enTeteMD);
	
});
}
