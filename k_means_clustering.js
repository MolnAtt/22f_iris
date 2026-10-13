
/**
 * visszaad K darab (x,y) koordinátájú pontot. Ezek a centroidok.
 * @param {number} K 
 * @param {Array<Noszirom>} adatok 
 * @returns {Array<Noszirom>}
 */
function centroidok_kivalasztasa(K, adatok){
    return visszateves_nelkuli_mintavetel(K, adatok).map(noszirom => [noszirom.sl, noszirom.sw]);
} 


/**
 * Minden adatot a hozzá legközelebb eső centroid csoportjába sorol.
 * @param {Iris} noszirom 
 * @param {Dictionary<Array<number>, Array<Iris>>} csoportok 
 * @param {Array<Array<number>>} centroidok 
 */
function csoportba_besorolas(noszirom, csoportok, centroidok){
    let c = legkozelebbi_centroid_index([noszirom.sl,noszirom.sw], centroidok);
    csoportok[c].push(noszirom);
}


/**
 * Az adott adathoz hozzárendeli a hozzá legközelebb eső centroidot.
 * @param {Array<number>} pont 
 * @param {Array<Noszirom>} centroidok 
 * @returns {Array<number>}
 */
function legkozelebbi_centroid(pont, centroidok){
    let min_tav = Euklideszi_tavolsagnegyzet(pont, centroidok[0])
    let min_i = 0;
    for(let i = 1; i< centroidok.length; i++){
        let akt_tav = Euklideszi_tavolsagnegyzet(pont,centroidok[i]);
        if(min_tav > akt_tav){
            min_tav = akt_tav;
            min_i = i;
        }
    }
    return centroidok[min_i];
}

function legkozelebbi_centroid_index(pont, centroidok){
    let min_tav = Euklideszi_tavolsagnegyzet(pont, centroidok[0])
    let min_i = 0;
    for(let i = 1; i< centroidok.length; i++){
        let akt_tav = Euklideszi_tavolsagnegyzet(pont,centroidok[i]);
        if(min_tav > akt_tav){
            min_tav = akt_tav;
            min_i = i;
        }
    }
    return min_i;
}

/**
 * visszaadja a legjobb centroidokat.
 * @param {Array<Array<Iris>>} osszes_centroidok_listaja 
 * @param {Array<Iris>} adatok 
 * @returns {Array<Iris>}
 */
function legjobb_centroidok(osszes_centroidok_listaja, adatok){
    if(osszes_centroidok_listaja.length === 0){
        return [[], []];
    }

    let legjobb_centroidok = osszes_centroidok_listaja[0];
    let legjobb_csoportok = csoportok_inicializalasa(legjobb_centroidok);
    for (const noszirom of adatok) {
        csoportba_besorolas(noszirom, legjobb_csoportok, legjobb_centroidok);
    }

    let eddigi_legjobb_AAE_osszeg = csoportok_AAE_osszege(legjobb_csoportok, legjobb_centroidok);

    for (let i = 1; i < osszes_centroidok_listaja.length; i++) {
        const centroidok = osszes_centroidok_listaja[i];
        let csoportok = csoportok_inicializalasa(centroidok);
        for (const noszirom of adatok) {
            csoportba_besorolas(noszirom, csoportok, centroidok);
        }

        let adatok_AAE_osszege = csoportok_AAE_osszege(csoportok, centroidok);

        if(adatok_AAE_osszege < eddigi_legjobb_AAE_osszeg){
            legjobb_centroidok = centroidok;
            legjobb_csoportok = csoportok;
            eddigi_legjobb_AAE_osszeg = adatok_AAE_osszege;
        }
    }

    return [legjobb_centroidok, legjobb_csoportok];
}//-> visszaadja a legjobb centroidokat.

/**
 * 
 * @param {Array<Array<number>>} centroidok 
 * @returns Dictionary<Array<number>, Array<Iris>>
 */
function csoportok_inicializalasa(centroidok){
    return centroidok.map(() => []);
}

/**
 * Visszaadja egy nősziromlista súlypontját.
 * @param {Array<Iris>} noszirmok 
 * @returns Array<number>
 */
function nosziromhalmaz_sulypontja(noszirmok){
    let sulypont = [0,0];
    for (const noszirom of noszirmok) {
        sulypont[0] += noszirom.sl;
        sulypont[1] += noszirom.sw;
    }
    sulypont[0] /= noszirmok.length;
    sulypont[1] /= noszirmok.length;
    return sulypont;
}


// /**
//  * Ez nem tudom minek csináltuk
//  * @param {Array} tomb 
//  * @param {Function} selector 
//  * @returns {*}
//  */
// function legkisebb(tomb, selector){
//     let min_ertek = selector(tomb[0]);
//     let min_i = 0;
//     for(let i = 1; i < tomb.length; i++){
//         let akt_ertek = selector(tomb[i]);
//         if(min_ertek > akt_ertek){
//             min_ertek = akt_ertek;
//             min_i = i;
//         }
//     }
//     return tomb[min_i];
// }

/**
 * 
 * @param {Dictionary<Array<number>, Array<Iris>>} csoportok 
 * @param {Array<Array<number>>} centroidok 
 */
function uj_centroidok_kialakitasa(csoportok, centroidok){
    let uj_centroidok = centroidok.map((centroid, i) => {
        if(csoportok[i].length === 0){
            return centroid;
        }
        return nosziromhalmaz_sulypontja(csoportok[i]);
    });
    

    // lett-e valójában új centroid?
    
    let tortent_e_valtozas = false;
    for (const uj_centroid of uj_centroidok) {
        let uj_centroidhoz_legkozelebb_eso_regi_centroid = legkozelebbi_centroid(uj_centroid,centroidok);
        if(Euklideszi_tavolsag(uj_centroidhoz_legkozelebb_eso_regi_centroid, uj_centroid)>0.01){
            tortent_e_valtozas = true;
        }
    }

    return [uj_centroidok, tortent_e_valtozas];
}

/**
 * A K-means clustering algoritmus. A centroidok kiválasztása véletlenszerűen történik, majd a centroidokhoz való hozzárendelés és a centroidok újraszámítása iteratívan történik.
 * @param {Array<Noszirom>} adatok 
 * @param {number} K a végleges klaszterek száma
 * @param {number} iteraciok_szama hányszor ismételjük a centroidok újraszámítását
 */
function k_means_clustering(adatok, K, iteraciok_szama){

    let legjobb_centroidok = [];
    let legjobb_klasztercsoportok = [];

    for (let i = 0; i < iteraciok_szama; i++) {
        // 1. választunk véletlenszerűen K db adatpontot a mintából, legyenek ők a kezdeti centroidok.
        let centroidok = centroidok_kivalasztasa(K, adatok);
            
        // 2. Hozzunk létre egy-egy listát, mindegyik centroidhoz egyet.
        // 3. Menjünk végig minden más adaton, és tegyük bele a hozzá legközelebb eső (Euklideszi metrika!) centroid halmazába/listájába
        let klasztercsoport = csoportok_inicializalasa(centroidok);
        for (const noszirom of adatok) {
            csoportba_besorolas(noszirom, klasztercsoport, centroidok);        
        }

        // 4. Legyenek az új centroidok a kialakult halmazok súlypontjai.

        let tortent_e_valtozas = true;

        while(tortent_e_valtozas){
            [centroidok, tortent_e_valtozas] = uj_centroidok_kialakitasa(klasztercsoport, centroidok);
            if(tortent_e_valtozas){
                klasztercsoport = csoportok_inicializalasa(centroidok);
                for (const noszirom of adatok) {
                    csoportba_besorolas(noszirom, klasztercsoport, centroidok);
                }
            }
        }


        legjobb_centroidok.push(centroidok);
        legjobb_klasztercsoportok.push(klasztercsoport);
    }

    return [legjobb_centroidok, legjobb_klasztercsoportok];
}

function csoportok_AAE_osszege(csoportok, centroidok){
    let AAE_sum = 0;
    for (let i = 0; i < centroidok.length; i++) {
        if(csoportok[i].length === 0){ // Amennyioen üres egy klaszter, akkor ez nem felel meg annak, hogy K klaszter van: Büntessük végtelennel!
            return Infinity;
        }
        AAE_sum += AAE(csoportok[i].map(noszirom => [noszirom.sl, noszirom.sw]));
    }
    return AAE_sum;
}



