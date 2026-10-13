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
      kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, "#FFFFFF", noszirom);      
    }

    for (const noszirom of noszirmok) {
        kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, szine[noszirom.tipus], noszirom);
    }
});

let szine = {
    'Iris-setosa': '#ff000080',
    'Iris-versicolor': '#0000ff80',
    'Iris-virginica': '#00900080',
}

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
    let sepal_length = a.X / 200 + 4; // vö. a beolvasgomb addeventlistenerjével!
    let sepal_width  = a.Y / 200 + 1; // vö. a beolvasgomb addeventlistenerjével!
    console.log([sepal_length, sepal_width]);
    let nsz_t = k_nearest_neighbours(noszirmok, sepal_length, sepal_width, 5);
    
    console.log(nsz_t);
}

vaszon.addEventListener('click', katt);

let kategoriaszaminput = document.getElementById('kategoriaszam_input');
let iteracioszaminput = document.getElementById('iteracioszam_input');
let kategorizalasgomb = document.getElementById('kategorizalasgomb');
let beolvasgomb2 = document.getElementById('beolvasgomb2');


beolvasgomb2.addEventListener('click', (x) => {
    noszirmok = Iris.Beolvas_csv(adatok.value);

    for (const noszirom of noszirmok) {
      kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, "#FFFFFF", noszirom);      
    }
    
    for (const noszirom of noszirmok) {
      kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, "#00000080", noszirom);
    }
});

kategorizalasgomb.addEventListener('click', (e) => {
  let K = Number(kategoriaszaminput.value);
  let I = Number(iteracioszaminput.value);
  let [legeslegjobb_centroidok_listája, legeslegjobb_csoportok] = k_means_clustering(noszirmok, K, I);

  for (let i = 0; i < legeslegjobb_centroidok_listája.length; i++) {  
      console.log(`--------- ${i}. iteráció ------------`)
      for (let j = 0; j < legeslegjobb_centroidok_listája[i].length; j++) {
        let [x,y] = legeslegjobb_centroidok_listája[i][j];
        console.log(`${j+1}. centroid a ${i+1}. iterációban: (${x},${y})`);
        kereszt([(x-4)*200, (y-1)*200], 10, szinek[j]);
        console.log('---------------------')
      }    
      console.log('---------------------')
  }

  // Törlés egyszer: minden pontot fehérre rajzolunk.
  for (const noszirom of noszirmok) {
    kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, 'white', noszirom);
  }

  // Az utolsó (konvergens) klaszterezés eredményét színezzük.
  const utolsoKlasztercsoport = legeslegjobb_csoportok[legeslegjobb_csoportok.length - 1] || [];
  for (let j = 0; j < utolsoKlasztercsoport.length; j++) {
    for (const noszirom of utolsoKlasztercsoport[j]) {
      kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, szinek[j], noszirom);
    }
  }


});

let szinek = ['red', 'blue', 'green', 'magenta', 'cyan', 'yellow', 'khaki', 'brown', 'pink', 'purple', 'violet'];

