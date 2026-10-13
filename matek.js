
/**
 * Két pont euklideszi távolsága (pitagorasz-tétel)
 * @param {Array<number>} P 
 * @param {Array<number>} Q 
 * @returns {number}
 */
function Euklideszi_tavolsag(P, Q){
    return Math.sqrt(Euklideszi_tavolsagnegyzet(P,Q));
}

/**
 * Két pont euklideszi távolságnégyzete (pitagorasz-tétel)
 * @param {Array<number>} P 
 * @param {Array<number>} Q 
 * @returns {number}
 */
function Euklideszi_tavolsagnegyzet(P, Q){
    let dim = P.length;
    let sum = 0;
    for (let i = 0; i < dim; i++) {
        let diff = Q[i]-P[i];
        sum += diff * diff;
    }
    return sum;
}

/**
 * Két pont Manhattan távolsága (eltérésösszegek)
 * @param {Array<number>} P 
 * @param {Array<number>} Q 
 * @returns {number}
 */
function Manhattan_tavolsag(P, Q){
    return Math.abs(Q[0]-P[0]) + Math.abs(Q[1]-P[1]);
}


/**
 * Egy megadott zárt intervallumból véletlenszerűen kiválaszt egy egész számot.
 * @param {number} start mettől
 * @param {number} end meddig
 * @returns {number}
 */
function veletlen_egesz(start, end){
    return Math.floor(Math.random() * (end - start + 1)) + start;
}


/**
 * Megcseréli egy t tömb i-edik és j-edik elemét.
 * @param {Array} t 
 * @param {number} i 
 * @param {number} j 
 */
function csere(t, i, j) {
    let temp = t[i];
    t[i] = t[j];
    t[j] = temp;
}

/**
 * Megkeveri a t tömb elemeit. Fisher-Yates-Knuth algoritmus. Felhasználja a csere és véletlen egész függvényeket!
 * @param {Array} t
 */
function kever(t){
    for (let i = 0; i < t.length-1; i++) {    
        let kivel_cserélek = veletlen_egesz(i,t.length-1);
        csere(t,i,kivel_cserélek);
    }
}



/**
 * Lemásolja a megadott tömböt.
 * @param {Array} t 
 * @returns {Array}
 */
function masolat(t) 
{
  return [...t];
}

/**
 * Kiválaszt K darab véletlenszerű elemet a mintából, visszatevés nélkül. Felhasználja a keverést!
 * @param {number} K 
 * @param {Array<Noszirom>} adatok
 * @returns {Array<Noszirom>}
 */
function visszateves_nelkuli_mintavetel(K, adatok){
    let kevert = masolat(adatok);
    kever(kevert);
    return kevert.slice(0,K);
}

/**
 * Visszaadja egy nősziromlista súlypontját.
 * @param {Array<number>} noszirmok 
 * @returns Array<number>
 */
function sulypont(pontok){
    if(pontok.length === 0){
        throw new Error("A súlypontot üres halmazra nem lehet kiszámolni!");
    }
    let sulypont = [0,0];
    for (const pont of pontok) {
        sulypont[0] += pont[0];
        sulypont[1] += pont[1];
    }
    sulypont[0] /= pontok.length;
    sulypont[1] /= pontok.length;
    return sulypont;
}

function AAE(pontok){
    if(pontok.length === 0){
        throw new Error("Az AAE-t üres halmazra nem lehet kiszámolni!");
    }
    let S = sulypont(pontok);

    let súlyponttól_való_távolságösszeg = 0;
    for (const pont of pontok) {
        súlyponttól_való_távolságösszeg += Euklideszi_tavolsag(S,pont);
    }
    return súlyponttól_való_távolságösszeg/pontok.length;
}

