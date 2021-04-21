//здесь инициируем героев
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
    firstRoundStats = [],
    exitGame = false,
    damage;
let round = 1;




//здесь выбираем героев и первого противника
function chooseClark() {
    player = player1;
    player.activePlayer = true;
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (player1.health <= 0){
        document.getElementById('clark').hidden = true;
    }
}
function chooseJohn() {
    player = player2;
    player.activePlayer = true;
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (player2.health <= 0){
        document.getElementById('john').hidden = true;
    }
}
function chooseIren() {
    player = player3;
    player.activePlayer = true;
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (player3.health <= 0){
        document.getElementById('iren').hidden = true;
    }
}
function chooseBork() {
    player = player4;
    player.activePlayer = true;
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (player4.health <= 0){
        document.getElementById('bork').hidden = true;
    }

}
function chooseJoker() {
    player = player5;
    player.activePlayer = true;
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (player5.health <= 0){
        document.getElementById('joker').hidden = true;
    }
}

/*function whatsYourHero(name, hero, id){
    name = hero;
    name.activePlayer = true;
    console.log(player);
    enemyInitiation();
    document.getElementById('selectHero').hidden = true;
    document.getElementById('battleDiv').hidden = false;
    document.getElementById('log').hidden = false;
    announcement();
    if (hero.health <= 0){
        document.getElementById(id).hidden = true;
    }
}*/

function enemyInitiation() {
    do {
        x = chooseEnemy();
        selectEnemy();
    } while (enemy.activePlayer === true  || enemy.wasChosen === true);
}



//выбор противника
function chooseEnemy() {
    return Math.floor(Math.random() * (5 - 1 + 1) + 1);
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

function announcement(){
    document.getElementById("playerLog").innerHTML = player.name;
    document.getElementById("playerDmg").innerHTML = `${player.attackMin} - ${player.attackMax}`;
    document.getElementById("playerHlth").innerHTML = player.health;
    document.getElementById("enemyLog").innerHTML = enemy.name;
    document.getElementById("enemyDmg").innerHTML = `${enemy.attackMin} - ${enemy.attackMax}`;
    document.getElementById("enemyHlth").innerHTML = enemy.health;
}



//расчет битвы
function attack(player){
    return (Math.floor(Math.random() * (player.attackMax - player.attackMin + 1)) + player.attackMin);
}
function dice() {
    return Math.floor(Math.random() * (100 + 1));
}
function critCheck(player, taker) {
    return (dice() <= player.critChance)? (critAttack(player, taker)): attack(player);
}
function critAttack(dealer, taker) {
    //trauma(taker, dealer);
    return (attack(dealer) * dealer.critMod);
}
function roundResult(fighter1, fighter2){
    let turnLog = document.createElement('p');
    turnLog.textContent = `Ход № ${turn}.${fighter1.name} наносит удар, причиняя ${damage} урона. У ${fighter2.name} осталось ${fighter2.health} здоровья!\n`;
    document.getElementById('battleLog').appendChild(turnLog);
}
function roundActions(fighter1, fighter2) {
    if (dice() < fighter1.missChance) {
        let roundLog = document.createElement('p');
        roundLog.textContent = `${fighter1.name} промахнулся!\n `;
        document.getElementById('battleLog').appendChild(roundLog);
    } else {
        damage = critCheck(fighter1, fighter2);
        fighter2.health -= damage;
        roundResult(fighter1, fighter2);
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
        enemy.health = 0;
        victor = player;
        enemy.alive = false;
        let victorLog = document.createElement('p');
        victorLog.textContent = `Победитель - ${victor.name} \n `;
        document.getElementById('battleLog').appendChild(victorLog);
        roundEnd(player, enemy);
    } else {
        player.health = 0;
        victor = enemy;
        player.alive = false;
        let victorLog = document.createElement('p');
        victorLog.textContent =  `Победитель - ${victor.name} \n `;
        document.getElementById('battleLog').appendChild(victorLog);
        roundEnd(enemy, player);
    }

}

function roundEnd(fighter1, fighter2) {
    fighter1.exp += 1;
    fighter1.winCount += 1;
    fighter2.alive = false;
    fighter2.wasChosen = true;
    let victoryCount = document.createElement('p');
    victoryCount.textContent = `Количество побед - ${fighter1.winCount}`;
    document.getElementById('battleLog').appendChild(victoryCount);
}

function announcement1(){
    console.log(player.name);
    document.getElementById("playerLog1").innerHTML = player.name;
    document.getElementById("playerDmg1").innerHTML = `${player.attackMin} - ${player.attackMax}`;
    document.getElementById("playerHlth1").innerHTML = player.health;
    document.getElementById("enemyLog1").innerHTML = enemy.name;
    document.getElementById("enemyDmg1").innerHTML = `${enemy.attackMin} - ${enemy.attackMax}`;
    document.getElementById("enemyHlth1").innerHTML = enemy.health;
}
function statistic(){
    document.getElementById('winCount').innerHTML = player.winCount;
    document.getElementById('enemyWinCount').innerHTML = enemy.winCount;
    document.getElementById('exp').innerHTML = player.exp;
    document.getElementById('enemyExp').innerHTML = enemy.exp;
}



