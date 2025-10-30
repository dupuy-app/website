function agrandirColonne1(){

    const elementColonne1 = document.getElementById("colonne-1");
    const elementColonne2 = document.getElementById("colonne-2");
    const elementColonne3 = document.getElementById("colonne-3");
    
    elementColonne3.style.flexBasis = "11.11%";
    elementColonne2.style.flexBasis = "11.11%";
    elementColonne1.style.flexBasis = "77.77%";
	
	//elementColonne3.style.whiteSpace = "nowrap";

}

function agrandirColonne2(){

    const elementColonne1 = document.getElementById("colonne-1");
    const elementColonne2 = document.getElementById("colonne-2");
    const elementColonne3 = document.getElementById("colonne-3");
    
    elementColonne1.style.flexBasis = "11.11%";
    elementColonne3.style.flexBasis = "11.11%";
    elementColonne2.style.flexBasis = "77.77%";
	
	//elementColonne3.style.whiteSpace = "nowrap";

}

function agrandirColonne3(){

    const elementColonne1 = document.getElementById("colonne-1");
    const elementColonne2 = document.getElementById("colonne-2");
    const elementColonne3 = document.getElementById("colonne-3");
    
    elementColonne1.style.flexBasis = "11.11%";
    elementColonne2.style.flexBasis = "11.11%";
    elementColonne3.style.flexBasis = "77.77%";
	
	//elementColonne3.style.whiteSpace = "none";

}

function defautAffichageColumn(){

    const elementColonne1 = document.getElementById("colonne-1");
    const elementColonne2 = document.getElementById("colonne-2");
    const elementColonne3 = document.getElementById("colonne-3");
    
    elementColonne1.style.flexBasis = "22.22%";
    elementColonne2.style.flexBasis = "33.33%";
    elementColonne3.style.flexBasis = "44.45%";
	
	//elementColonne3.style.whiteSpace = "none";

}	
