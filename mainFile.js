function DueList (name, health, attackMax, attackMin, missChance, critChance, critMod) {
    this.name = name;
    this.health = health;
    this.attackMax = attackMax;
    this.attackMin = attackMin;
    this.missChance = missChance;
    this.critChance = critChance;
    this.critMod = critMod;
    this.head = 0;
    this.hand = {
        "right": 0,
        "left": 0
    };
    this.leg = {
        "right": 0,
        "left": 0
    };
    this.chest = 0;
    this.exp = 0;
    this.alive = true;
    this.activePlayer = false;
    this.wasChosen = false;
    this.winCount = 0;
}

let player1 = new DueList("Clark", 55,2,1,13,17,1.5),
    player2 = new DueList("John", 45, 3, 2, 19, 22,2),
    player3 = new DueList("Irene", 40, 3, 3, 27, 18,3),
    player4 = new DueList("Bork", 35, 5, 4, 34, 30, 4),
    player5 = new DueList("Joker", 100, 1, 1, 60, 10, 100);

let x,
    player,
    enemy;
let turn,
    victor,
    exitGame = false,
    damage;
let round = 1;


alert("Выбери бойца!");
chooseWisely();

while (x !== 1 &&
x !== 2 &&
x !== 3 &&
x !== 4 &&
x !== 5) {
    alert("Такого бойца нет, выбирай правильно!");
    chooseWisely();
}
selectPlayer();
console.log('Вы выбрали бойца ' +x, player.name);
player.activePlayer = true;
do {
    x = chooseEnemy();
    selectEnemy();
} while ( enemy.activePlayer === true );


function chooseWisely() {
    x = +prompt(`Укажи номер:
    1.Кларк 
    2.Джон 
    3.Ирен 
    4.Борк
    5.???`, );
    return (x);
}

function selectPlayer() {
    switch(x) {
        case 1:
            player = player1;
            break;
        case 2:
            player = player2;
            break;
        case 3:
            player = player3;
            break;
        case 4:
            player = player4;
            break;
        case 5:
            player = player5;
            break;
    }
    return (player);
}

function selectEnemy() {
    switch(x) {
        case 1:
            enemy = player1;
            break;
        case 2:
            enemy = player2;
            break;
        case 3:
            enemy = player3;
            break;
        case 4:
            enemy = player4;
            break;
        case 5:
            enemy = player5;
            break
    }
    return (enemy);
}

function announcement() {
    console.log(`Раунд ${round}! Сражается пара:  ${player.name}  vs  ${enemy.name}`);
    console.table(player);
    console.table(enemy);
}

function chooseEnemy() {
    return Math.floor(Math.random() * (5 - 1 + 1) + 1);
}

function trauma(target, dealer) {
    switch (dice5()) {
        case (1):
            target.hand.right += 1;
            target.missChance += 5;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует правую руку!
            Шанс промаха бойца ${target.name} увеличен на 5 и равен ${target.missChance}.<==`);
        case (2):
            target.hand.left += 1;
            target.missChance += 3;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует левую руку!
            Шанс промаха бойца ${target.name} увеличен на 3 и равен ${target.missChance}.<==`);
        case (3):
            target.leg.left += 1;
            target.critChance -= 2;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует левую ногу!
            Шанс критического удара бойца ${target.name} уменьшен на 5 и равен ${target.critChance}.<==`);
        case (4):
            target.leg.right += 1;
            target.critChance -= 2;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует правую ногу!
            Шанс критического удара бойца ${target.name} уменьшен на 5 и равен ${target.critChance}.<==`);
        case (5):
            target.chest += 1;
            target.critMod -= 0.5;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует торс!
            Модификатор критического удара бойца ${target.name} уменьшен на 0.5 и равен ${target.critMod}.<==`);
        case (0):
            target.head += 1;
            target.missChance += 5;
            target.health -= 5;
            return console.log(`==>Критический удар бойца ${dealer.name}! ${target.name} травмирует голову!
            Шанс промаха бойца ${target.name} увеличен на 7 и равен ${target.missChance}. Здоровье уменьшено на 5 и равно ${target.health}.<==`);
    }
}

function attack(player){
    return (Math.floor(Math.random() * (player.attackMax - player.attackMin + 1)) + player.attackMin);
}
function dice() {
    return Math.floor(Math.random() * (100 + 1));
}

function dice5() {
    return Math.floor(Math.random() * (5 + 1));
}

function critCheck(player, teker) {
    return (dice() <= player.critChance)? (critAttack(player, teker)): attack(player);
}

function critAttack(dealer, taker) {
    trauma(taker, dealer);
    return (attack(dealer) * dealer.critMod);
}

function roundEnd(fighter1, fighter2) {
    console.log(`Боец ${fighter1.name} победил!`);
    fighter1.exp += 1;
    fighter1.winCount += 1;
    fighter2.alive = false;
    fighter2.wasChosen = true;
    console.log(`Количество побед - ${fighter1.winCount}`);
}

function battleLog(fighter1, fighter2) {
    roundResult(fighter1, fighter2)
    heavyDamage();
    /*injuryCheck(fighter2);*/
}

function heavyDamage() {
    if (damage > 15) {
        console.log(`КРИТИЧЕСКИЙ УДАР! ВЫ НЕВЕРОЯТНЫ!`)
    }
}

function roundResult(fighter1, fighter2){
    console.log(`Ход № ${turn}.${fighter1.name} наносит удар, причиняя ${damage} урона. У ${fighter2.name} осталось ${fighter2.health} здоровья!`);
}

function rewards(winner) {
    winner.health += 5;
    winner.attackMin += 0.25;
    winner.attackMax += 0.5;
    winner.missChance -= 3;
    if (winner.hand.right > 0){
        winner.missChance -= 1;
        winner.hand.right--;
    } else {
        winner.missChance -= 0.5;
    }
    if (winner.hand.left > 0) {
        winner.missChance -= 1;
        winner.hand.left--;
    } else {
        winner.missChance -= 0.5;
    }
    if (winner.leg.right > 0) {
        winner.missChance -= 0.5;
        winner.leg.right--;
    } else {
        winner.missChance -= 0.25;
    }
    if ( winner.leg.left > 0){
        winner.missChance -= 0.5;
        winner.leg.left--;
    } else {
        winner.missChance -= 0.25;
    }
    if (winner.head > 0) {
        winner.missChance -= 2;
        winner.health += 1;
        winner.head--;
    } else {
        winner.missChance -= 2;
    }
    if (winner.chest > 0) {
        winner.critMod += 0.25;
        winner.chest--;
    } else {
        winner.critMod += 0.10;
    }
}

function roundActions(fighter1, fighter2) {
    if (dice() < fighter1.missChance) {
        console.log(`${fighter1.name} промахнулся!`);
    } else {
        damage = critCheck(fighter1, fighter2);
        fighter2.health -= damage;
        battleLog(fighter1, fighter2);
    }
}

function confirmation() {
    if (confirm("Начать бой?")) {
        fight();
    } else {
        exitGame = true;
        console.log("Как хочешь..");

    }
}
function nextRound() {
    if (exitGame === false) {
        nextFight();
    } else {
        console.log (`А какая была-бы драка...`)
    }
}
function fight() {
    turn = 1;
    while ((player.health > 0) && (enemy.health > 0)) {
        if (turn % 2 === 0) {
            roundActions(player, enemy);
            turn++;
        } else {
            roundActions(enemy, player);
            turn++;
        }
    }
    if (enemy.health <= 0) {
        roundEnd(player, enemy);
        rewards(player);
        victor = player;
    } else {
        roundEnd(enemy, player);
        rewards(enemy);
        victor = enemy;
    }
    console.table(victor);
}

    function nextFight() {
            while (player.alive === true) {
                if (confirm("Готов продолжить?")) {
                    console.log(`Следующий бой!`);
                    round++;
                    if (player.winCount > 3) {
                        break;
                    } else {
                        do {
                            x = chooseEnemy();
                            selectEnemy();
                        } while (enemy.activePlayer === true ||
                        enemy.wasChosen === true);
                        console.log(`Раунд ${round}! Сражается пара:  ${player.name}  vs  ${enemy.name}`);
                        console.table(player);
                        console.table(enemy);
                        confirmation();
                    }
                } else {
                    console.log("Зря!");
                    break;
                }
            }
        }

announcement();
confirmation();
nextRound()

    if (player.alive === false) {
        console.log(`${player.name} проиграл! Конец игры! ;(`)
    } else if (player.winCount < 4) {
        console.log(`Трус!`);
    } else {
        console.log(`Вау! Ваш боец победил всех! Поздравляю!`);
    }
