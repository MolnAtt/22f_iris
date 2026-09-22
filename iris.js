class Iris {
  constructor(sl, sw, pl, pw, tipus, id) {
    this.id = id;
    this.sl = sl;
    this.sw = sw;
    this.pl = pl;
    this.pw = pw;
    this.tipus = tipus;
  }

  static Beolvas_sor_alapjan(sor, i) {
    const [sl, sw, pl, pw, tipus] = sor.split(",");
    return new Iris(parseFloat(sl), parseFloat(sw), parseFloat(pl), parseFloat(pw), tipus, i);
  }

  static Beolvas_csv(csvstring){
    let noszirmok = [];
    let sorok = csvstring.split('\n');
    for (let i = 1; i < sorok.length; i++) {
        let sor = sorok[i];
        let noszirom = this.Beolvas_sor_alapjan(sor, i);
        noszirmok.push(noszirom);
    }

    console.log(`Nőszirmok beolvasva: ${noszirmok.length} db`);
    return noszirmok;
  }

  toString() {
    return `Iris(id=${this.id}, sl=${this.sl}, sw=${this.sw}, tipus=${this.tipus})`;
  }
}


let beolvasgomb = document.getElementById('beolvasgomb');
let adatok = document.getElementById('adatok');
let noszirmok = []

beolvasgomb.addEventListener('click', (x) => {
    noszirmok = Iris.Beolvas_csv(adatok.value);

    for (const noszirom of noszirmok) {
        kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, szine[noszirom.tipus], noszirom);
    }
});

let szine = {
    'Iris-setosa': '#ff000080',
    'Iris-versicolor': '#0000ff80',
    'Iris-virginica': '#00900080',
}


let mertekx = 100;
let merteky = 100;

/**
 * Ha valaki rákattint a képre, akkor megmondja, hogy az alapján ott egy pont milyen nőszirom lenne
 * @param {MouseEvent} e 
 */
function katt(e){
    e.preventDefault();
    let br = vaszon.getBoundingClientRect();
    console.log(br);
    console.log([e.clientX, e.clientY]);
    let a = {
        "X": e.clientX - br.x, 
        "Y": e.clientY - br.y,
    };
    console.log(a);
    let sepal_length = a.X/mertekx;
    let sepal_width  = a.Y/merteky;
    console.log([sepal_length, sepal_width]);
    let nsz_t = k_nearest_neighbours(noszirmok, sepal_length, sepal_width, 5);
    
    console.log(nsz_t);
}

vaszon.addEventListener('click', katt);
