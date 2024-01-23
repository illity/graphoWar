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


function setAttributes(element, obj) {
    for (const [key, value] of Object.entries(obj)) {
        element.setAttribute(key, value)
    }
}

class Country {
    constructor(obj) {
        this.x = 5 * (Math.random() - .5)
        this.y = 5 * (Math.random() - .5)
        this.name = obj.name
        this.continent = obj.continent
    }
}

class Game {
    constructor(names, adjacencyList) {
        this.adjacencyList = adjacencyList
        this.countriesNames = names
        this.countries = []
    }
    draw() {
        function drawCircle(element, x, y, options = {}) {
            const circle = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
            setAttributes(circle, {
                'cx': x,
                'cy': y,
                'r': radius,
                'fill': 'none',
                'stroke-width': strokeWidth,
                'stroke': 'lightgreen'
            })
            setAttributes(circle, options)
        }
        function drawText(element, x, y, content, options = {}) {
            const text = element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'))
            setAttributes(text, {
                'x': x,
                'y': y,
                'text-anchor': 'middle',
                'fill': 'white',
                'alignment-baseline': 'middle',
                'font-size': strokeWidth * 16,
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
        function drawSvg(svg, countries, adjacencyList) {
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

            strokeWidth = ((xmax - xmin) * (ymax - ymin)) ** .5 / 600
            radius = ((xmax - xmin) * (ymax - ymin)) ** .5  /25

            setAttributes(svg,
                {
                    'width': '100%',
                    'height': '100%',
                    'viewBox': `${xmin - radius} ${ymin - radius} ${xmax - xmin + radius} ${ymax - ymin + radius}`
                }
            )
            svg.style.backgroundColor = 'black'


            for (let i = 0; i < countries.length; i++) {
                for (const j of adjacencyList[i]) {
                    drawLine(svg, countries[i].x, countries[i].y,
                        countries[j].x, countries[j].y)
                }
            }
            for (const country of countries) {
                drawCircle(svg, country.x, country.y, { 'stroke': `hsl(${60 * continents[country['name']]},50%,50%)` })
                drawText(svg, country.x, country.y, country.name)
            }
        }
        const svg = document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
            
        for (const name of this.countriesNames) this.countries.push(new Country({ 'name': name, 'continent': continents[name]}))
        var c1 = .02 //Hooke's Law
        var c2 = .1 //Repulsion
        var c3 = .01 //Attracts towards center
        const comprimento = 1
        setInterval(() => {            
            drawSvg(svg, this.countries, this.adjacencyList)
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
        },10)
    }
}

button = document.body.appendChild(document.createElement('button'))
button.innerHTML = 'start'
button.style.position = 'absolute'
button.style.left = '50%'
button.style.top = '50%'
button.style.transform = 'translate(-50%,-50%)'
button.style.height = 100
button.style.width = 100
button.onclick = () => {
    const game = new Game(alphabeticNames, adjacencyList)
    game.draw()
    button.remove()
}
