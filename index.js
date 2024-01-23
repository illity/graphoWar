warAdjacencyList = {
    'Argentina': ['Brasil', 'Peru'],
    'Peru': ['Brasil', 'Venezuela', 'Argentina'],
    'Brasil': ['Argentina', 'Peru', 'Venezuela', 'Argélia'],
    'Venezuela': ['Peru', 'Brasil', 'México'],
    'México': ['Venezuela', 'Nova York', 'Califórnia'],
    'Nova York': ['México', 'Califórnia', 'Labrador', 'Ottawa'],
    'Califórnia': ['México', 'Nova York', 'Ottawa', 'Vancouver'],
    'Vancouver': ['Califórnia', 'Ottawa', 'Mackenzie', 'Alasca'],
    'Ottawa': ['Califórnia', 'Nova York', 'Labrador', 'Vancouver', 'Mackenzie'],
    'Labrador': ['Ottawa', 'Groelândia', 'Nova York'],
    'Alasca': ['Vladivostok', 'Mackenzie', 'Vancouver'],
    'Mackenzie': ['Alasca', 'Vancouver', 'Ottawa', 'Groelândia'],
    'Groelândia': ['Mackenzie', 'Labrador', 'Islândia'],
    'Islândia': ['Groelândia', 'Inglaterra'],
    'Inglaterra': ['Islândia', 'França', 'Alemanha', 'Suécia'],
    'França': ['Argélia', 'Alemanha', 'Polônia', 'Inglaterra', 'Egito'],
    'Alemanha': ['França', 'Polônia', 'Inglaterra'],
    'Polônia': ['Alemanha', 'França', 'Moscou', 'Egito'],
    'Moscou': ['Polônia', 'Suécia', 'Omsk', 'Aral', 'Oriente Médio'],
    'Suécia': ['Inglaterra', 'Moscou'],
    'Argélia': ['Brasil', 'França', 'Egito', 'Sudão', 'Congo'],
    'Egito': ['Argélia', 'França', 'Polônia', 'Sudão'],
    'Sudão': ['Egito', 'Argélia', 'Congo', 'Madagascar'],
    'Congo': ['Argélia', 'Sudão', 'África do Sul'],
    'África do Sul': ['Congo', 'Madagascar'],
    'Madagascar': ['África do Sul', 'Sudão'],
    'Oriente Médio': ['Moscou', 'Aral', 'Índia'],
    'Índia': ['Oriente Médio', 'Aral', 'Sumatra', 'Vietnã', 'China'],
    'Vietnã': ['Bornéu', 'Índia', 'China'],
    'China': ['Índia', 'Vietnã', 'Aral', 'Omsk', 'Mongólia', 'Tchita', 'Japão', 'Vladivostok'],
    'Aral': ['Omsk', 'China', 'Oriente Médio', 'Índia', 'Moscou'],
    'Omsk': ['Moscou', 'Dudinka', 'Mongólia', 'China', 'Aral'],
    'Mongólia': ['Tchita', 'China', 'Omsk', 'Dudinka'],
    'Tchita': ['Mongólia', 'Dudinka', 'Sibéria', 'Vladivostok', 'China'],
    'Dudinka': ['Omsk', 'Tchita', 'Mongólia', 'Sibéria'],
    'Sibéria': ['Dudinka', 'Tchita', 'Vladivostok'],
    'Vladivostok': ['Sibéria', 'Tchita', 'Alasca', 'China', 'Japão'],
    'Japão': ['China', 'Vladivostok'],
    'Sumatra': ['Índia', 'Austrália'],
    'Bornéu': ['Vietnã', 'Austrália', 'Nova Guiné'],
    'Nova Guiné': ['Austrália', 'Bornéu'],
    'Austrália': ['Sumatra', 'Bornéu', 'Nova Guiné']
}

div = [4, 9, 7, 6, 12, 4]
continents = {}
let i = 0, j = 0
for (const key of Object.keys(warAdjacencyList)) {
    continents[key] = i
    j++
    if (div[i] == j) {
        i += 1
        j = 0
    }
}

//Conferir faltantes
for (const [key, val] of Object.entries(warAdjacencyList)) {
    for (el of val) {
        if (!warAdjacencyList[el].includes(key)) {
            console.log(key)
            console.log(el)
        }
    }
}

var selected = -1

var radius, strokeWidth

adjacencyList = []
const alphabeticNames = Object.keys(warAdjacencyList).sort()


for (const name of alphabeticNames) {
    const m = []
    for (countryName of warAdjacencyList[name]) {
        m.push(alphabeticNames.indexOf(countryName))
    }
    adjacencyList.push(m)
}

function log(message) {
    document.getElementById('log').innerHTML+=message+'<br>'
}

function setAttributes(element, obj) {
    for (const [key, value] of Object.entries(obj)) {
        element.setAttribute(key, value)
    }
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


class Country {
    constructor(obj) {
        this.x = 5 * (Math.random() - .5)
        this.y = 5 * (Math.random() - .5)
        this.name = obj.name
        this.continent = obj.continent
        this.troops = 1
    }
    setPlayer(player) {
        this.player = player
    }
}  


class Game {
    constructor(names, adjacencyList) {

        this.players = 2
        this.turn = 0

        this.adjacencyList = adjacencyList
        this.countriesNames = names
        this.countries = []
        for (const name of this.countriesNames) this.countries.push(new Country({ 'name': name, 'continent': continents[name]}))
        
        //Escolhendo países para os jogadores
        const x = Array(names.length).fill(0).map((el, index)=>index)
        for (let i=0; i<names.length; i++){
            this.countries[x.pop()].setPlayer(i%this.players)
        }
        
    }
    invade(originCountry, targetCountry) {
        log(`O país ${this.countriesNames[originCountry]} vai invadir o país ${this.countriesNames[targetCountry]}`)
        console.log()
        console.log()
        const atkDices = Array(this.countries[originCountry].troops).fill(0).map(()=>randint(1,6)).sort((a,b)=>(b-a))
        const defDices = Array(this.countries[targetCountry].troops).fill(0).map(()=>randint(1,6)).sort((a,b)=>(b-a))
        log(atkDices+'; '+defDices)
        for (let i =0; i<atkDices.length; i++) {
            log(''+(atkDices[i]>defDices[i]))
        }


    }
    drawSvg(svg, countries, adjacencyList) {
        
        function drawCircle(element, x, y, options = {}) {
            const circle = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
            setAttributes(circle, {
                'cx': x,
                'cy': y,
                'r': radius,
                'fill': 'transparent',
                'stroke-width': strokeWidth*1.5,
                'stroke': 'lightgreen'
            })
            setAttributes(circle, options)
            return circle
        }
        function drawText(element, x, y, content, options = {}) {
            const text = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'))
            setAttributes(text, {
                'x': x,
                'y': y,
                'text-anchor': 'middle',
                'fill': 'black',
                'alignment-baseline': 'middle',
                'font-size': radius/2,
                'font-family': 'Arial, Helvetica, sans-serif'

            })
            text.innerHTML = content
            setAttributes(text, options)

        }
        function drawLine(element, x1, y1, x2, y2, options = {}) {
            const line = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'line'))
            const d = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
            setAttributes(line, {
                'x1': x1 + (x2 - x1) * radius / d,
                'y1': y1 + (y2 - y1) * radius / d,
                'x2': x2 + (x1 - x2) * radius / d,
                'y2': y2 + (y1 - y2) * radius / d,
                'fill': 'none',
                'stroke-width': strokeWidth,
                'stroke': 'rgba(100,100,100,1)'
            })
            setAttributes(line, options)
        }
        
        svg.innerHTML = ''
        var xmin = 100000000
        var xmax = -100000000
        var ymin = 100000000
        var ymax = -100000000


        for (const country of countries) {
            if (country.x < xmin) xmin = country.x
            if (country.y < ymin) ymin = country.y
            if (country.x > xmax) xmax = country.x
            if (country.y > ymax) ymax = country.y
        }

        strokeWidth = ((xmax - xmin) * (ymax - ymin)) ** .5 / 600 * 1.2
        radius = ((xmax - xmin) * (ymax - ymin)) ** .5  /25

        setAttributes(svg,
            {
                'width': '50%',
                'height': document.body.clientHeight,
                'viewBox': `${xmin - radius} ${ymin - radius} ${xmax - xmin + 2*radius} ${ymax - ymin + 2*radius}`
            }
        )

        for (let i = 0; i < countries.length; i++) {
            for (const j of adjacencyList[i]) {
                drawLine(svg, countries[i].x, countries[i].y,
                    countries[j].x, countries[j].y)
            }
        }
        for (let i = 0; i<countries.length; i++) {
            const country = countries[i]
            drawText(svg, country.x, country.y-radius/3, country.name)
            drawCircle(svg, country.x, country.y+radius/2, { 'stroke': 'black', 'r': radius/2, 'fill': `hsl(${180 * country['player']},50%,80%)`}) 
            drawText(svg, country.x, country.y+radius/2, country['troops'])
            const circle = drawCircle(svg, country.x, country.y, { 'stroke': `hsl(${80 + 60 * continents[country['name']]},50%,50%)` })
            circle.onclick = () => {
                if (selected == -1) {
                    selected = i
                } else {
                    this.invade(selected, i)
                    selected = -1
                }
                this.drawSvg(svg, countries, adjacencyList)                    
            }
            if (selected == i) {                    
                circle.setAttribute('stroke', 'black')
                circle.setAttribute('fill',`hsl(${80 + 60 * continents[country['name']]},50%,50%)`)
                drawText(svg, country.x, country.y-radius/3, country.name)
                drawCircle(svg, country.x, country.y+radius/2, { 'stroke': 'black', 'r': radius/2, 'fill': `hsl(${180 * country['player']},50%,80%)`}) 
                drawText(svg, country.x, country.y+radius/2, country['troops'])
            }
            
        }
    }
    draw() {
        const root = document.body.appendChild(document.createElement('div'))
        root.style.display = 'flex'
        const svg = root.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
            
        
        var c1 = .02 //Hooke's Law
        var c2 = .1 //Repulsion
        var c3 = .01 //Attracts towards center
        const comprimento = 1
        // setInterval(() => {   
        for(let it = 0; it < 10000; it++) {  
            if (it == 10000-1)
            this.drawSvg(svg, this.countries, this.adjacencyList)
            for (let i = 0; i < this.countries.length; i++) {
                const center = { 'x': 0, 'y': 0 }
                const dCenter = ((center.x - this.countries[i].x) ** 2 + (center.y - this.countries[i].y) ** 2) ** .5
                this.countries[i].x += c3 * dCenter * (center.x - this.countries[i].x)
                this.countries[i].y += c3 * dCenter * (center.y - this.countries[i].y)
                for (const j of this.adjacencyList[i]) {
                    const d = ((this.countries[j].x - this.countries[i].x) ** 2 + (this.countries[j].y - this.countries[i].y) ** 2) ** .5 - comprimento
                    const Fx = c1 * d * (this.countries[j].x - this.countries[i].x)
                    const Fy = c1 * d * (this.countries[j].y - this.countries[i].y)
                    this.countries[i].x += Fx
                    this.countries[i].y += Fy
                }
            }
            for (let i = 0; i < this.countries.length; i++) {
                for (let j = 0; j < this.countries.length; j++) {
                    if (i==j) continue
                    const d = ((this.countries[j].x - this.countries[i].x) ** 2 + (this.countries[j].y - this.countries[i].y) ** 2)
                    const Fx = - c2 / d * (this.countries[j].x - this.countries[i].x)
                    const Fy = - c2 / d * (this.countries[j].y - this.countries[i].y)
                    this.countries[i].x += Fx
                    this.countries[i].y += Fy
                }
            }
        }
        // },100)

        const game = root.appendChild(document.createElement('div'))
        const menuTitle = game.appendChild(document.createElement('div'))
        const log = game.appendChild(document.createElement('div'))
        log.id = 'log'
        log.style.height = '40%'
        log.style.overflow = 'auto'
        menuTitle.innerHTML = '<h1>WAR</h1>'
        game.style.width = '50%'
        game.style.backgroundColor = 'black'
        game.style.textAlign = 'center'
        game.style.color = 'white'
    }
}

const game = new Game(alphabeticNames, adjacencyList)
game.draw()