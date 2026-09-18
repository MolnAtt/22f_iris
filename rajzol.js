let vaszon = document.getElementById('vaszon');

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
    k.setAttribute("title", megj);
    return k;
}

for (let x = 0; x <= 800; x+=200) {
    vonal([x, 0],[x, 800], 2, "gray");
}

for (let y = 0; y <= 800; y+=200) {
    vonal([0, y],[800, y], 2, "gray");
}
