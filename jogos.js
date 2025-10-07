// Sistema de Jogos EduÚnica
let currentGame = null;
let gameScore = 0;
let gameTime = 0;
let gameTimer = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initGames();
});

function initGames() {
    // Filtros de categoria
    const categoryButtons = document.querySelectorAll('.category-btn');
    const gameWidgets = document.querySelectorAll('.game-widget');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Atualiza botão ativo
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtra jogos
            gameWidgets.forEach(widget => {
                if (category === 'all' || widget.getAttribute('data-category') === category) {
                    widget.style.display = 'flex';
                } else {
                    widget.style.display = 'none';
                }
            });
        });
    });
}

// Funções Principais
function loadGame(gameType) {
    currentGame = gameType;
    gameScore = 0;
    gameTime = 0;
    
    const activeGameContainer = document.getElementById('activeGameContainer');
    const gamesGrid = document.getElementById('gamesGrid');
    const gameArea = document.getElementById('gameArea');
    const gameStats = document.getElementById('gameStats');
    
    gamesGrid.style.display = 'none';
    activeGameContainer.style.display = 'block';
    gameArea.innerHTML = '';
    gameStats.innerHTML = '';
    
    // Inicia timer
    startGameTimer();
    
    // Carrega jogo específico
    switch(gameType) {
        case 'memory': loadMemoryGame(); break;
        case 'puzzle': loadPuzzleGame(); break;
        case 'sorting': loadSortingGame(); break;
        case 'matching': loadMatchingGame(); break;
        case 'addition': loadAdditionGame(); break;
        case 'shapes': loadShapesGame(); break;
        case 'sounds': loadSoundsGame(); break;
        case 'wordbuilder': loadWordBuilderGame(); break;
        case 'compare': loadCompareGame(); break;
        case 'rhythm': loadRhythmGame(); break;
        case 'patterns': loadPatternsGame(); break;
        case 'position': loadPositionGame(); break;
        case 'ordering': loadOrderingGame(); break;
        case 'letters': loadLettersGame(); break;
        case 'textures': loadTexturesGame(); break;
        case 'imagepuzzle': loadImagePuzzleGame(); break;
        case 'measurement': loadMeasurementGame(); break;
        case 'sequence': loadSequenceGame(); break;
        case 'stories': loadStoriesGame(); break;
        case 'colors': loadColorsGame(); break;
    }
    
    updateStats();
}

function backToGames() {
    const activeGameContainer = document.getElementById('activeGameContainer');
    const gamesGrid = document.getElementById('gamesGrid');
    
    activeGameContainer.style.display = 'none';
    gamesGrid.style.display = 'grid';
    
    // Para o timer
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function startGameTimer() {
    gameTime = 0;
    gameTimer = setInterval(() => {
        gameTime++;
        updateStats();
    }, 1000);
}

function updateStats() {
    const gameStats = document.getElementById('gameStats');
    gameStats.innerHTML = `
        <div class="stat">
            <div class="stat-value">${gameScore}</div>
            <div class="stat-label">Pontos</div>
        </div>
        <div class="stat">
            <div class="stat-value">${gameTime}s</div>
            <div class="stat-label">Tempo</div>
        </div>
        <div class="stat">
            <div class="stat-value">${currentGame}</div>
            <div class="stat-label">Jogo</div>
        </div>
    `;
}

function addScore(points) {
    gameScore += points;
    updateStats();
}

// Jogo 1: Memória Visual
function loadMemoryGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Memória Visual';
    gameInstructions.textContent = 'Encontre todos os pares de cartas correspondentes. Clique em duas cartas para virá-las.';
    
    const memoryGame = document.createElement('div');
    memoryGame.className = 'memory-game';
    
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🥝', '🍉'];
    let cards = [...symbols, ...symbols];
    cards = cards.sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-symbol', symbol);
        card.textContent = '?';
        
        card.addEventListener('click', function() {
            if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) return;
            
            this.textContent = symbol;
            this.classList.add('flipped');
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                const [card1, card2] = flippedCards;
                
                if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    addScore(10);
                    
                    if (matchedPairs === symbols.length) {
                        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
                    }
                } else {
                    setTimeout(() => {
                        card1.textContent = '?';
                        card2.textContent = '?';
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }, 1000);
                }
                flippedCards = [];
            }
        });
        
        memoryGame.appendChild(card);
    });
    
    gameArea.appendChild(memoryGame);
}

// Jogo 2: Quebra-Cabeça Numérico
function loadPuzzleGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Quebra-Cabeça Numérico';
    gameInstructions.textContent = 'Organize os números em ordem crescente de 1 a 8. Clique nos números para movê-los.';
    
    const puzzleContainer = document.createElement('div');
    puzzleContainer.innerHTML = `
        <div class="puzzle-game">
            <div class="puzzle-piece" onclick="movePuzzlePiece(1)">1</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(2)">2</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(3)">3</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(4)">4</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(5)">5</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(6)">6</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(7)">7</div>
            <div class="puzzle-piece" onclick="movePuzzlePiece(8)">8</div>
            <div class="puzzle-piece empty"></div>
        </div>
        <p style="margin-top: 20px; color: #666;">Em desenvolvimento - Versão completa em breve!</p>
    `;
    
    gameArea.appendChild(puzzleContainer);
}

// Jogo 3: Classificação por Cores
function loadSortingGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Classificação por Cores';
    gameInstructions.textContent = 'Arraste os objetos para as caixas da cor correspondente.';
    
    const sortingGame = document.createElement('div');
    sortingGame.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Classificação por Cores</h3>
            <div style="font-size: 3rem; margin: 20px 0;">
                🍎 🍌 🍇 🍊 🍓 🍋
            </div>
            <p>Arraste as frutas para as caixas coloridas correspondentes.</p>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <div style="background: #ff5252; padding: 15px; border-radius: 8px; color: white;">Vermelho</div>
                <div style="background: #ffeb3b; padding: 15px; border-radius: 8px;">Amarelo</div>
                <div style="background: #9c27b0; padding: 15px; border-radius: 8px; color: white;">Roxo</div>
                <div style="background: #ff9800; padding: 15px; border-radius: 8px; color: white;">Laranja</div>
            </div>
        </div>
    `;
    
    gameArea.appendChild(sortingGame);
}

// Jogo 4: Correspondência de Palavras
function loadMatchingGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Correspondência de Palavras';
    gameInstructions.textContent = 'Combine cada palavra com a imagem correspondente. Clique nas opções para fazer a correspondência.';
    
    const matchingGame = document.createElement('div');
    matchingGame.className = 'word-game';
    
    const pairs = [
        { word: 'CASA', image: '🏠' },
        { word: 'CARRO', image: '🚗' },
        { word: 'ÁRVORE', image: '🌳' },
        { word: 'SOL', image: '☀️' }
    ];
    
    pairs.forEach(pair => {
        const option = document.createElement('div');
        option.className = 'word-option';
        option.textContent = `${pair.word} - ?`;
        option.onclick = function() {
            this.textContent = `${pair.word} - ${pair.image}`;
            this.classList.add('correct');
            addScore(5);
        };
        matchingGame.appendChild(option);
    });
    
    gameArea.appendChild(matchingGame);
}

// Jogo 5: Soma Rápida
function loadAdditionGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Soma Rápida';
    gameInstructions.textContent = 'Resolva as operações de adição selecionando a resposta correta.';
    
    const mathGame = document.createElement('div');
    mathGame.className = 'math-game';
    
    // Gera números aleatórios
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    
    // Gera opções
    const options = [correctAnswer];
    while (options.length < 4) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 5) - 2;
        if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer) && wrongAnswer > 0) {
            options.push(wrongAnswer);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    const problem = document.createElement('div');
    problem.className = 'math-problem';
    problem.textContent = `${num1} + ${num2} = ?`;
    mathGame.appendChild(problem);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'math-options';
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'math-option';
        optionElement.textContent = option;
        optionElement.onclick = function() {
            if (parseInt(option) === correctAnswer) {
                this.classList.add('correct');
                addScore(10);
                setTimeout(() => loadAdditionGame(), 1000);
            } else {
                this.classList.add('incorrect');
            }
        };
        optionsContainer.appendChild(optionElement);
    });
    
    mathGame.appendChild(optionsContainer);
    gameArea.appendChild(mathGame);
}

// Jogo 6: Identificação de Formas
function loadShapesGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Identificação de Formas';
    gameInstructions.textContent = 'Selecione a forma geométrica solicitada.';
    
    const shapeGame = document.createElement('div');
    shapeGame.className = 'shape-game';
    
    const shapes = ['🔺', '🔵', '◼️', '❤️', '⭐', '🔶'];
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const question = document.createElement('div');
    question.style.fontSize = '1.5rem';
    question.style.marginBottom = '20px';
    question.textContent = `Encontre: ${targetShape}`;
    shapeGame.appendChild(question);
    
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'shape-game';
    
    shapes.sort(() => Math.random() - 0.5).forEach(shape => {
        const shapeElement = document.createElement('div');
        shapeElement.className = 'shape-option';
        shapeElement.textContent = shape;
        shapeElement.onclick = function() {
            if (shape === targetShape) {
                this.style.background = '#4CAF50';
                this.style.color = 'white';
                addScore(8);
                setTimeout(() => loadShapesGame(), 1000);
            } else {
                this.style.background = '#f44336';
                this.style.color = 'white';
            }
        };
        shapesContainer.appendChild(shapeElement);
    });
    
    shapeGame.appendChild(shapesContainer);
    gameArea.appendChild(shapeGame);
}

// Jogo 7: Sequência de Sons
function loadSoundsGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Sequência de Sons';
    gameInstructions.textContent = 'Memorize e repita a sequência de sons apresentada.';
    
    const soundGame = document.createElement('div');
    soundGame.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Sequência de Sons</h3>
            <div style="font-size: 4rem; margin: 20px 0;">🎵 🎶 🔊</div>
            <p>Em desenvolvimento - Em breve você poderá treinar sua memória auditiva!</p>
            <button class="game-button" onclick="addScore(5)">Simular Acerto</button>
        </div>
    `;
    
    gameArea.appendChild(soundGame);
}

// Jogo 8: Formação de Palavras
function loadWordBuilderGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Formação de Palavras';
    gameInstructions.textContent = 'Arraste as sílabas para formar palavras completas.';
    
    const wordGame = document.createElement('div');
    wordGame.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Formação de Palavras</h3>
            <div style="display: flex; gap: 10px; justify-content: center; margin: 20px 0; font-size: 1.5rem;">
                <div style="border: 2px solid #6a11cb; padding: 10px; border-radius: 5px;">CA</div>
                <div style="border: 2px solid #6a11cb; padding: 10px; border-radius: 5px;">SA</div>
                <div style="border: 2px solid #6a11cb; padding: 10px; border-radius: 5px;">SA</div>
            </div>
            <p>Arraste as sílabas para formar a palavra "CASA"</p>
            <div style="background: #f0f0ff; padding: 20px; border-radius: 8px; margin: 20px 0; min-height: 60px;"></div>
            <button class="game-button" onclick="addScore(7)">Verificar</button>
        </div>
    `;
    
    gameArea.appendChild(wordGame);
}

// Jogo 9: Igual ou Diferente
function loadCompareGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Igual ou Diferente';
    gameInstructions.textContent = 'Identifique se os conjuntos de objetos são iguais ou diferentes.';
    
    const compareGame = document.createElement('div');
    compareGame.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Igual ou Diferente?</h3>
            <div style="display: flex; justify-content: center; gap: 40px; margin: 30px 0;">
                <div style="font-size: 3rem;">🍎 🍎 🍎</div>
                <div style="font-size: 3rem;">🍎 🍌 🍎</div>
            </div>
            <div style="display: flex; gap: 20px; justify-content: center;">
                <button class="game-button" onclick="handleComparison(true)">Igual</button>
                <button class="game-button" onclick="handleComparison(false)">Diferente</button>
            </div>
        </div>
    `;
    
    gameArea.appendChild(compareGame);
}

function handleComparison(isEqual) {
    // No exemplo, os conjuntos são diferentes
    if (!isEqual) {
        addScore(6);
        alert('Correto! Os conjuntos são diferentes!');
        loadCompareGame();
    } else {
        alert('Tente novamente!');
    }
}

// Jogo 10: Ritmo Musical
function loadRhythmGame() {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = 'Ritmo Musical';
    gameInstructions.textContent = 'Siga o padrão rítmico apresentado.';
    
    const rhythmGame = document.createElement('div');
    rhythmGame.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Ritmo Musical</h3>
            <div style="font-size: 4rem; margin: 20px 0;">🥁 🎵 🎶</div>
            <p>Bata o ritmo: • • • • (4 tempos)</p>
            <div style="display: flex; gap: 10px; justify-content: center; margin: 20px 0;">
                <button class="game-button" style="font-size: 1.5rem;">👏</button>
                <button class="game-button" style="font-size: 1.5rem;">👏</button>
                <button class="game-button" style="font-size: 1.5rem;">👏</button>
                <button class="game-button" style="font-size: 1.5rem;">👏</button>
            </div>
            <button class="game-button" onclick="addScore(8)">Completei o Ritmo</button>
        </div>
    `;
    
    gameArea.appendChild(rhythmGame);
}

// Jogos 11-20 (padrão similar)
function loadPatternsGame() {
    setupBasicGame('Padrões e Sequências', 'Complete a sequência lógica.', '🔺 🔵 🔺 ?', 9);
}

function loadPositionGame() {
    setupBasicGame('Memória de Posições', 'Memorize a posição dos objetos.', 'Posição dos objetos', 7);
}

function loadOrderingGame() {
    setupBasicGame('Ordenação Numérica', 'Organize os números em ordem.', '3, 1, 4, 2 → 1, 2, 3, 4', 8);
}

function loadLettersGame() {
    setupBasicGame('Letras Iniciais', 'Identifique a letra inicial.', 'A de Apple', 6);
}

function loadTexturesGame() {
    setupBasicGame('Discriminação Tátil', 'Identifique texturas.', 'Texturas suave/áspera', 7);
}

function loadImagePuzzleGame() {
    setupBasicGame('Quebra-Cabeça de Imagens', 'Monte a imagem completa.', 'Quebra-cabeça visual', 10);
}

function loadMeasurementGame() {
    setupBasicGame('Conceitos de Medida', 'Compare tamanhos e quantidades.', 'Maior/Menor', 7);
}

function loadSequenceGame() {
    setupBasicGame('Memória de Sequência', 'Repita a sequência apresentada.', '🔴 🟢 🔵 → ?', 8);
}

function loadStoriesGame() {
    setupBasicGame('Histórias Sequenciais', 'Organize as imagens em ordem.', 'Sequência narrativa', 9);
}

function loadColorsGame() {
    setupBasicGame('Discriminação de Cores', 'Identifique tons de cores.', 'Cores similares', 8);
}

// Função auxiliar para jogos básicos
function setupBasicGame(title, instructions, content, points) {
    const activeGameTitle = document.getElementById('activeGameTitle');
    const gameInstructions = document.getElementById('gameInstructions');
    const gameArea = document.getElementById('gameArea');
    
    activeGameTitle.textContent = title;
    gameInstructions.textContent = instructions;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>${title}</h3>
            <div style="font-size: 2rem; margin: 20px 0; color: #6a11cb;">${content}</div>
            <p>Jogo em desenvolvimento - Versão completa em breve!</p>
            <button class="game-button" onclick="addScore(${points})">Simular Acerto (+${points})</button>
        </div>
    `;
    
    gameArea.appendChild(gameContainer);
}

// Função auxiliar para mover peças do quebra-cabeça
function movePuzzlePiece(number) {
    alert(`Movendo peça ${number} - Funcionalidade completa em desenvolvimento!`);
    addScore(2);
}
// Funções de Acessibilidade
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    panel.classList.toggle('show');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
}

function toggleReduceMotion() {
    document.body.classList.toggle('reduce-motion');
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text', 'reduce-motion');
    document.getElementById('highContrast').checked = false;
    document.getElementById('largeText').checked = false;
    document.getElementById('reduceMotion').checked = false;
}

// Detectar navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
});