

/**
 * sorbarendezi egy adott ponthoz való közelség alapján a pontokat
 * @param {Array<Noszirom>} lista 
 * @param {number} X 
 * @param {number} Y 
 * @param {function} tavolsagfv 
 * @returns 
 */
function sorbarendezes(lista, X, Y, tavolsagfv ){
    lista.sort((a, b) => ?);
}

function csoportosit(lista){

}

/**
 * 
 * @param {dict<string,int>} szotar 
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
    // 1.2      Megnézed az első K db elemet.
    // 2. Megnézzük, hogy melyik milyen típus.
    // 2.1      Csoportosítás/dictionary...
    // 3. A legtöbb "szavazatot" kapó típusra tippelünk.
    // 3.1      Maximumkeresés a dictionary-n

}
