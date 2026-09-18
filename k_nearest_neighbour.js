

/**
 * sorbarendezi egy adott ponthoz való közelség alapján a pontokat
 * @param {Array<Iris>} lista 
 * @param {number} X 
 * @param {number} Y 
 * @param {function} tavolsagfv 
 * @returns 
 */
function sorbarendezes(lista, X, Y, tavolsagfv ){
    lista.sort((a, b) =>   tavolsagfv([X,Y],[a.sepal_length, a.sepal_width])
                         - tavolsagfv([X,Y],[b.sepal_length, b.sepal_width]));    
}


/**
 * Csoportosítjuk a nőszirmokat az alapján, hogy milyen fajtába tartoznak, és megnézzük, melyikből mennyi van ("ez a szavazás")
 * @param {Array<Iris>} lista a nőszirmok
 * @returns {dict<string, number>} a visszaadott szótár
 */
function csoportosit(lista){
    let szotar = {};
    for (const noszirom of lista) {
        if (noszirom.tipus in szotar) 
            szotar[noszirom.tipus] += 1;
        else 
            szotar[noszirom.tipus] = 1;
    }
    return szotar;
}

/**
 * 
 * @param {dict<string, number>} szotar 
 * @returns {string}
 */
function maximumkereses_dict(szotar){
    let max_kulcs = Object.keys(szotar)[0];
    let max_ertek = szotar[max_kulcs];
    for (const [kulcs, ertek] of Object.entries(szotar)) {
        if (ertek > max_ertek) {
            max_kulcs = kulcs;
            max_ertek = ertek;
        }
    }
    return max_kulcs;
}


function k_nearest_neighbours(lista, this_petal_length, this_petal_width, K){
    // supervised learning

    // 1. vesszük a K db legközelebbi pontot.
    // 1.1      sorbarendezed a távolságképlet alapján a pontokat
    let l = sorbarendezes(lista, this_petal_length, this_petal_width, Euklideszi_tavolsagnegyzet);
    // 1.2      Megnézed az első K db elemet.
    let elso_K = l.slice(K);  
    // 2. Megnézzük, hogy melyik milyen típus.
    // 2.1      Csoportosítás/dictionary...
    let csoportok = csoportosit(l);
    // 3. A legtöbb "szavazatot" kapó típusra tippelünk.
    // 3.1      Maximumkeresés a dictionary-n
    let tipp = maximumkereses_dict(csoportok);

    return tipp;
}
