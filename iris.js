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
}


//<line x1="200" y1="100" x2="200" y2="300" stroke="black" stroke-width="2"/>
function vonal(p,q,vastagsag,szin){
    let v = document.createElementNS('http://www.w3.org/2000/svg','line');  // <line>
    v.setAttribute("x1", p[0]);
    v.setAttribute("y1", p[1]);
    v.setAttribute("x2", q[0]);
    v.setAttribute("y2", q[1]);
    v.setAttribute("stroke-width", vastagsag);
    v.setAttribute("stroke", szin);
    vaszon.appendChild(v);
    return v;
}

function kor(kozeppont, sugar, szin, megj) {
    let k = document.createElementNS('http://www.w3.org/2000/svg','circle');  // <circle>
    k.setAttribute("cx", kozeppont[0]); // <circle cx="50">
    k.setAttribute("cy", kozeppont[1]); // <circle cx="50" cy="100">
    k.setAttribute("r", sugar); // <circle cx="50" cy="100" r="30">
    k.setAttribute("fill", szin); // <circle cx="50" cy="100" r="30" fill="red">
    vaszon.appendChild(k);
    if(megj.length>0)
        k.setAttribute("title", megj);
    return k;
}

let beolvasgomb = document.getElementById('beolvasgomb');
let adatok = document.getElementById('adatok');
let vaszon = document.getElementById('vaszon');
let noszirmok = []

beolvasgomb.addEventListener('click', (x) => {
    noszirmok = Iris.Beolvas_csv(adatok.value);



    for (const noszirom of noszirmok) {
        kor([(noszirom.sl-4)*200, (noszirom.sw-1)*200], 5, szine[noszirom.tipus], `id: ${noszirom.id}`);
    }
});

for (let x = 0; x <= 800; x+=200) {
    vonal([x, 0],[x, 800], 2, "gray");
}

for (let y = 0; y <= 800; y+=200) {
    vonal([0, y],[800, y], 2, "gray");
}

let szine = {
    'Iris-setosa': '#ff000080',
    'Iris-versicolor': '#0000ff80',
    'Iris-virginica': '#00900080',
}

