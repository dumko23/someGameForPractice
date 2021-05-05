//здесь инициируем героев
function DueList (image, name, health, healthInit, attackMax, attackMin, missChance, critChance, critMod) {
    this.image = image;
    this.name = name;
    this.health = health;
    this.healthInitial = healthInit;
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
let Clark = new DueList('Clark.png', "Clark", 55, 55,2,1,13,17,1.5),
    John = new DueList('John.png', "John", 45, 45,3, 2, 19, 22,2),
    Irene = new DueList('Irene.png', "Irene", 40, 40,3, 3, 27, 18,3),
    Bart = new DueList('Bart.png', "Bart", 35, 35, 5, 4, 34, 30, 4),
    Joker = new DueList('Joker.png', "Joker", 100, 100, 1, 0, 60, 10, 100);


let heroPickList = [Clark, John, Irene, Bart, Joker];
function random0N (N){
    return Math.floor(Math.random() * N);
}
let enemy;
function enemyPick(){
    do {
        enemy = heroPickList[random0N(heroPickList.length)];
    } while (enemy === player);
    return enemy;
}

function heroPick(hero){
    return player = hero;
}


function onHeroClick(hero, nameId, healthId, hLeftId, damageId, imageId) {

    heroList(hero, nameId, healthId, hLeftId, damageId, imageId);
    document.getElementById('heroStats').style.display = "block";
    document.getElementById('pickButton').hidden = false;
}
function heroList(hero, nameId, healthId, hLeftId, damageId, imageId){
    if (document.getElementById(nameId).hasChildNodes()){
        document.getElementById(nameId).removeChild(document.getElementById(nameId).lastChild);
    }
    let heroName = document.createElement('span');
    heroName.textContent = `Имя героя: ${hero.name}`;
    document.getElementById(nameId).appendChild(heroName);

    if (document.getElementById(healthId).hasChildNodes()){
        document.getElementById(healthId).removeChild(document.getElementById(healthId).lastChild);
    }
    const heroHealth = `Изначальное здоровье: ${hero.healthInitial}`;
    document.getElementById(healthId).append(heroHealth);

    if (document.getElementById(hLeftId).hasChildNodes()){
        document.getElementById(hLeftId).removeChild(document.getElementById(hLeftId).lastChild);
    }
    let heroHealthLeft = `Текущее здоровье: ${hero.healthInitial}`;
    document.getElementById(hLeftId).append(heroHealthLeft);

    if (document.getElementById(damageId).hasChildNodes()){
        document.getElementById(damageId).removeChild(document.getElementById(damageId).lastChild);
    }
    let heroDamage = `Урон: ${hero.attackMin} - ${hero.attackMax}`;
    document.getElementById(damageId).append(heroDamage);
    addHeroImage(hero, imageId);
}

function addHeroImage(hero, imageId) {
    if (document.getElementById(imageId).hasChildNodes()){
        document.getElementById(imageId).removeChild(document.getElementById(imageId).lastChild);
    }
    let heroImage = document.createElement('img');
    heroImage.src = hero.image;
    heroImage.style.paddingLeft = "20px";
    /*heroImage.style.width = "250px";
    heroImage.style.height = "312px";*/
    document.getElementById(imageId).appendChild(heroImage);
}


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
    document.getElementById('log').appendChild(turnLog);
}
function roundActions(fighter1, fighter2) {
    if (dice() < fighter1.missChance) {
        let roundLog = document.createElement('p');
        roundLog.textContent = `${fighter1.name} промахнулся!\n `;
        document.getElementById('log').appendChild(roundLog);
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
        document.getElementById('log').appendChild(victorLog);
        //roundEnd(player, enemy);
        healthLeft(player, 'pickedHeroHealthLeft');
        healthLeft(enemy, 'pickedEnemyHealthLeft');
    } else {
        player.health = 0;
        victor = enemy;
        player.alive = false;
        let victorLog = document.createElement('p');
        victorLog.textContent =  `Победитель - ${victor.name} \n `;
        document.getElementById('log').appendChild(victorLog);
        //roundEnd(enemy, player);
        healthLeft(player, 'pickedHeroHealthLeft');
        healthLeft(enemy, 'pickedEnemyHealthLeft');
        document.getElementById('heroLoses').hidden = false;
    }
}

function healthLeft(hero, hLeftId){
    if (document.getElementById(hLeftId).hasChildNodes()){
        document.getElementById(hLeftId).removeChild(document.getElementById(hLeftId).lastChild);
    }
    let heroHealthLeft = `Текущее здоровье: ${hero.health}`;
    document.getElementById(hLeftId).append(heroHealthLeft);
}