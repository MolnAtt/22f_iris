
/**
 * Egy megadott zárt intervallumból véletlenszerűen kiválaszt egy egész számot.
 * @param {number} start mettől
 * @param {number} end meddig
 * @returns {number}
 */
function veletlen_egesz(start, end){

}

/**
 * Megcseréli egy t tömb i-edik és j-edik elemét.
 * @param {Array} t 
 * @param {number} i 
 * @param {number} j 
 */
function csere(t, i, j){
}

/**
 * Megkeveri a t tömb elemeit. Fisher-Yates-Knuth algoritmus. Felhasználja a csere és véletlen egész függvényeket!
 * @param {Array} t
 */
function kever(t){

}

/**
 * Lemásolja a megadott tömböt.
 * @param {Array} t 
 * @returns {Array}
 */
function masolat(t){

}

/**
 * Kiválaszt K darab véletlenszerű elemet a mintából, visszatevés nélkül. Felhasználja a keverést!
 * @param {number} K 
 * @param {Array<Noszirom>} adatok
 * @returns {Array<Noszirom>}
 */
function visszateves_nelkuli_mintavetel(K, adatok){

}

/**
 * visszaad K darab (x,y) koordinátájú pontot. Ezek a centroidok.
 * @param {number} K 
 * @param {Array<Noszirom>} adatok 
 * @returns {Array<Noszirom>}
 */
function centroidok_kivalasztasa(K, adatok){
    result = [];
    for (let i = 0; i < K; i++) {
        result[i] = [adatok[i].petal_length, adatok[i].petal_width];
    }
    return result;
} 


/**
 * Minden adatot a hozzá legközelebb eső centroid csoportjába sorol.
 * @param {Noszirom} adat 
 * @param {Array} csoportok 
 * @param {Array} centroid 
 */
function csoportba_besorolas(adat, csoportok, centroidok){

} // -> az adott adatot beleteszi a megfelelő csoportba


/**
 * Az adott adathoz hozzárendeli a hozzá legközelebb eső centroid indexét.
 * @param {Noszirom} adat 
 * @param {Array<Noszirom>} centroidok 
 * @returns {number}
 */
function legkozelebbi_centroid(adat, centroidok){

}


/**
 * visszaadja a legjobb centroidokat.
 * @param {Array<Array<Noszirom>>} osszes_centroidok_listaja 
 * @param {Array<Noszirom>} adatok 
 * @returns {Array<Noszirom>}
 */
function legjobb_centroidok(osszes_centroidok_listaja, adatok){

}//-> visszaadja a legjobb centroidokat.


/**
 * A K-means clustering algoritmus. A centroidok kiválasztása véletlenszerűen történik, majd a centroidokhoz való hozzárendelés és a centroidok újraszámítása iteratívan történik.
 * @param {Array<Noszirom>} adatok 
 * @param {number} K a végleges klaszterek száma
 * @param {number} iteraciok_szama hányszor ismételjük a centroidok újraszámítását
 */
function k_means_clustering(adatok, K, iteraciok_szama){

// 1. választunk véletlenszerűen K db adatpontot a mintából, legyenek ők a kezdeti centroidok.

        // 2. Hozzunk létre egy-egy halmazt/listát, mindegyik centroidhoz egyet.
        // 3. Menjünk végig minden más adaton, és tegyük bele a hozzá legközelebb eső (Euklideszi metrika!) centroid halmazába/listájába
        // 4. Legyenek az új centroidok a kialakult halmazok súlypontjai.
        // 5. Ürítsük ki a halmazokat és kezdjük újra a 2-es ponttól a lépéseket. Ismételjük tehát a 2-5 lépéseket addig, amíg ugyanazok a centroidok nem jönnek ki (valamilyen kis tizedesjegyre való kerekített értékre! Floatok esetén teljesen pontos egyezést ne várjunk! Legyenek montjuk 1 ezredre kerekítve egyenlők. )

    // 6. Ha készen vagyunk, akkor mentsük el a centroidokat egy listába.

// 7. Ismételjük az 1-6. lépéseket nagyon sokszor (ezerszer, milliószor, stb.)
// 8. Válasszuk ki azokat a centroidokat nyertesnek, amikre az igaz, hogy minden pont tőle való távolságainak összege a lehető legkisebb.

}
