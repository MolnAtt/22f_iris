
/**
 * Két pont euklideszi távolsága (pitagorasz-tétel)
 * @param {Array<number>} P 
 * @param {Array<number>} Q 
 * @returns {number}
 */
function Euklideszi_tavolsag(P, Q){
    return Math.sqrt(Euklideszi_tavolsagnegyzet);
}

/**
 * Két pont euklideszi távolságnégyzete (pitagorasz-tétel)
 * @param {Array<number>} P 
 * @param {Array<number>} Q 
 * @returns {number}
 */
function Euklideszi_tavolsagnegyzet(P, Q){
    let x_tav = Q[0] - P[0]
    let y_tav = Q[1] - P[1]
    let tav = x_tav * x_tav + y_tav * y_tav
    return tav
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