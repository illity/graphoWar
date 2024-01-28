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

var selected = -1
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

var radius, strokeWidth, fontSize

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
    document.getElementById('log').innerHTML += message; 0
}

function setAttributes(element, obj) {
    for (const [key, value] of Object.entries(obj)) {
        element.setAttribute(key, value)
    }
}

randint = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min))

class Country {
    constructor(obj) {
        this.x = 5 * (Math.random() - .5)
        this.y = 5 * (Math.random() - .5)
        this.name = obj.name
        this.continent = obj.continent
        this.troops = 1
    }
    setPlayer(player) {
        this.player = player;
    }
}

class Game {
    constructor(names, adjacencyList) {
        this.players = [
            {'troops': 0},
            {'troops': 0},
        ]
        this.turn = 0
        this.selected = []

        this.adjacencyList = adjacencyList
        this.countriesNames = names
        this.countries = []
        for (const name of this.countriesNames) this.countries.push(new Country({ 'name': name, 'continent': continents[name] }))
        const x = Array(names.length).fill(0).map((el, index) => index)
        for (let i = 0; i < names.length; i++) {
            this.countries[x.pop()].setPlayer(i % this.players.length);
        }
    }
    invade(originCountry, targetCountry) {
        if (!this.adjacencyList[originCountry].includes(targetCountry)) return -1;

        log(`O país ${this.countriesNames[originCountry]} vai invadir o país ${this.countriesNames[targetCountry]}<br>`)
        const atkDices = Array(Math.min(this.countries[originCountry].troops-1,3)).fill(0).map(() => randint(1, 6)).sort((a, b) => (b - a))
        const defDices = Array(Math.min(this.countries[targetCountry].troops  ,3)).fill(0).map(() => randint(1, 6)).sort((a, b) => (b - a))
        log(`(${atkDices}) x (${defDices}) `)
        for (let i = 0; i < Math.min(atkDices.length, defDices.length); i++) {
            log((atkDices[i] > defDices[i]) ? 'Vitória ' : 'Derrota ')
            this.countries[originCountry].troops -= (atkDices[i] <= defDices[i])
            this.countries[targetCountry].troops -= (atkDices[i] > defDices[i])
        }
        if (!this.countries[targetCountry].troops) {
            log('Território conquistado!')
            this.countries[targetCountry].troops++;
            this.countries[originCountry].troops--;
            this.countries[targetCountry].player = this.countries[originCountry].player            
        }
        log('<br>')
        return false;
    }
    drawSvg(svg, countries, adjacencyList) {
        function drawCircle(element, x, y, options = {}) {
            const circle = (element.tagName == 'circle') ? element : element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
            setAttributes(circle, {
                'cx': x,
                'cy': y,
                'r': radius,
                'fill': 'transparent',
                'stroke-width': strokeWidth,
                'stroke': 'lightgreen'
            })
            setAttributes(circle, options)
            return circle
        }
        function drawText(element, x, y, content, options = {}) {
            const text = (element.tagName == 'text') ? element : element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'))
            setAttributes(text, {
                'x': x,
                'y': y,
                'text-anchor': 'middle',
                'alignment-baseline': 'middle',
                'font-size': fontSize,
                'font-family': 'Arial, Helvetica, sans-serif'

            })
            text.innerHTML = content
            element.onselectstart = () => false;
            text.style.MozUserSelect = 'none'
            text.onmousedown = () => false;
            setAttributes(text, options)
            return text

        }
        function drawLine(element, x1, y1, x2, y2, options = {}) {
            const line = (element.tagName == 'line') ? element : element.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'line'))
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
            return line
        }
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

        strokeWidth = ((xmax - xmin) * (ymax - ymin)) ** .5 / 300
        fontSize = ((xmax - xmin) * (ymax - ymin)) ** .5 / 50
        radius = ((xmax - xmin) * (ymax - ymin)) ** .5 / 25



        setAttributes(svg,
            {
                'width': '50%',
                'height': document.body.clientHeight,
                'viewBox': `${xmin - radius} ${ymin - radius} ${xmax - xmin + 2 * radius} ${ymax - ymin + 2 * radius}`
            }
        )
        for (let i = 0; i < countries.length; i++) {
            for (const j of adjacencyList[i]) {
                if (!adjacencyList[i].lines) adjacencyList[i].lines = []
                adjacencyList[i].lines[j] = drawLine(adjacencyList[i].lines[j] ? adjacencyList[i].lines[j] : svg, countries[i].x, countries[i].y, countries[j].x, countries[j].y)
            }
        }
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            country.text = drawText(country.text ? country.text : svg, country.x, country.y - radius / 3, country.name)
            country.troopCircle = drawCircle(country.troopCircle ? country.troopCircle : svg, country.x, country.y + radius / 2,
                { 'stroke': 'black', 'r': radius / 2, 'fill': `hsl(${360 / this.players.length * country['player']}, 50%, 80%)` })
            country.troopText = drawText(country.troopText ? country.troopText : svg, country.x, country.y + 2 * radius / 3, country['troops'])
            country.circle = drawCircle(country.circle ? country.circle : svg, country.x, country.y,
                { 'stroke': `hsl(${80 + 60 * continents[country['name']]}, 50%, 80%)` })
            country.circle.style.cursor = 'pointer'
            country.circle.onclick = (ev) => {
                this.selected.push(i)
                this.drawSvg(svg, countries, adjacencyList)
            }
            country.circle.oncontextmenu = (ev) => {
                ev.preventDefault();
                console.log(this.selected.indexOf(i))
                const index = this.selected.indexOf(i)
                if (index !== -1) {
                    this.selected.splice(index, 1);
                }
                this.drawSvg(svg, countries, adjacencyList)
            }
            if (this.selected.includes(i)) {
                var count = 0
                for (let j = 0; j < this.selected.length; j++) {
                    if (this.selected[j] == i) count+=1
                }
                if (count>1) country.troopText.innerHTML = country.troops +'+'+ count
                country.circle.setAttribute('stroke', 'black')
                country.circle.setAttribute('fill', `hsla(${80 + 60 * continents[country['name']]}, 50%, 80%, 0.3)`)
            }
        }
    }

    prepareAction() {
        if (!(this.turn%4)) {
            // No início de cada turno completo, calcula as tropas dos jogadores
            log('Calculando as tropas de cada jogador...<br>')
            this.countries.forEach(country=>{this.players[country.player].troops += 1/2})
            this.players.forEach((player,index)=>{
                player.troops = ~~player.troops
                log(`O jogador ${index} tem ${player.troops} tropas`)
                if (index<this.players.length-1) log(', ')
                else log('<br><br>')
            })
    
        }
        const actionBody = document.getElementById('actions')
        const actions = [`Alocar Tropas - Escolha em que país você deseja alocar suas tropas<br>Você possui ${this.players[this.turn%2].troops} tropas`,
                         'Atacar - Escolha que países deseja invadir']
        actionBody.innerHTML = `Vez do jogador ${(this.turn%4)>>1} - `
        actionBody.innerHTML += actions[this.turn%2] + '<br>'
        const button = actionBody.appendChild(document.createElement('button'))
        button.innerHTML = 'Pronto!'
        button.onclick = (ev)=>{
            ev.preventDefault();
            this.action()
        }
    }

    action() {
        //Fase de alocar tropas
        const nPlayer = ~~(this.turn%4/2)
        const player = this.players[nPlayer]
        if (this.turn%2 == 0) {
            if (this.selected.length <= player.troops) {
                for (i of this.selected) {
                    if (!(this.countries[i].player == nPlayer)) return;
                }
                log('Acrescida 1 tropa nos territórios: ')
                for (let i = 0; i < this.selected.length; i++) {
                    log(`${this.countries[this.selected[i]].name}${i<this.selected.length-1?", ":""}`)
                    this.countries[this.selected[i]].troops += 1
                }
                player.troops -= this.selected.length;
                log(`<br>Restam ${player.troops} tropas para o jogador ${nPlayer}<br>`)
                this.selected = [];
                this.turn++;
            } else {
                console.log('inválido!')
            }
        }
        else if (this.turn%2 == 1) {
            if (this.selected.length == 0) {
                log('Turno encerrado!<br><br>')
                this.turn++;
            }
            if (this.selected.length == 2) {
                if (this.countries[this.selected[0]].player != nPlayer) return;
                if (this.countries[this.selected[1]].player == nPlayer) return;

                if (!this.invade(this.selected[0], this.selected[1])) {
                    this.selected = [];
                }
            }
        }
        this.prepareAction();
    }
    firstDraw() {
        const root = document.body.appendChild(document.createElement('div'))
        root.style.display = 'flex'
        const svg = root.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        svg.id = 'svgGame'
        this.drawSvg(svg, this.countries, this.adjacencyList)

        const game = root.appendChild(document.createElement('div'))
        const menuTitle = game.appendChild(document.createElement('div'))
        const log = game.appendChild(document.createElement('div'))
        game.style.backgroundColor = 'black'
        game.style.color = 'white'
        game.style.textAlign = 'center'
        log.id = 'log'
        log.style.height = '40%'
        log.style.overflow = 'auto'
        const actions = game.appendChild(document.createElement('div'))
        actions.appendChild(document.createElement('div')).innerHTML = '<h4>Actions</h4>'
        const actionsBody = actions.appendChild(document.createElement('div'))
        actionsBody.id = 'actions'
        actionsBody.innerHTML = 'Escolha como alocar suas tropas'
        actions.style.border = '2px solid white'
        actions.style.margin = '32px'
        actions.style.height = '30%'
        menuTitle.innerHTML = '<h1>WAR</h1>'
        game.style.width = '50%'

    }
    draw() {
        var svg = document.getElementById('svgGame')
        if (!svg) {
            this.firstDraw()
            this.draw()
            svg = document.getElementById('svgGame')
            return
        }
        this.prepareAction()
        //com 2 jogadores ->

        var c1 = .02 //Hooke's Law
        var c2 = .1 //Repulsion
        var c3 = .01 //Attracts towards center
        const comprimento = 1

        setInterval(() => {
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
                    if (i == j) continue
                    const d = ((this.countries[j].x - this.countries[i].x) ** 2 + (this.countries[j].y - this.countries[i].y) ** 2)
                    const Fx = - c2 / d * (this.countries[j].x - this.countries[i].x)
                    const Fy = - c2 / d * (this.countries[j].y - this.countries[i].y)
                    this.countries[i].x += Fx
                    this.countries[i].y += Fy
                }
            }
            this.drawSvg(svg, this.countries, this.adjacencyList)
        }, 10)
    }
}


const game = new Game(alphabeticNames, adjacencyList)
game.draw()
