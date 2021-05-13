const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    const { name, health, power, defense } = req.body
    fighter.name = name;
    fighter.health = health;
    fighter.power = power;
    fighter.defense = defense;

    if (fighter.name && fighter.health && fighter.power && fighter.defense) {
        const powerIsNumber = typeof fighter.power === 'number';
        const defenceIsNumber = typeof fighter.defense === 'number';
        if(!powerIsNumber && !defenceIsNumber){
            res.body = res.status(400).json({
                error: true,
                message: "Power or defence is not a number"
            })
            next(res.body);
        }
        const powerMoreThan = fighter.power < 100;
        const powerLessThan = fighter.power > 0;
        const defenceMoreThan = fighter.defense < 10;
        const defenceLessThan = fighter.defense > 1;
        const powerValid = powerLessThan && powerMoreThan;
        const defenceValid = defenceMoreThan && defenceLessThan;
        if (powerValid && defenceValid) {
            req.body = {     
                name : fighter.name,
                health : fighter.health,
                power : fighter.power,
                defense : fighter.defense,
                }
            next();
        } else {
            res.body = res.status(400).json({
                error: true,
                message: "Power or defence is too high"
            })
            next(res.body);
        }
    }else{
        res.body = res.status(400).json({
            error: true,
            message: "Fighter entity to create is not valid"
        })
        next(res.body);
    }
}

const updateFighterValid = (req, res, next) => {
    const { name, health, power, defense } = req.body
    fighter.name = name;
    fighter.health = health;
    fighter.power = power;
    fighter.defense = defense;

    if (fighter.name && fighter.health && fighter.power && fighter.defense) {
        const powerIsNumber = typeof fighter.power === 'number';
        const defenceIsNumber = typeof fighter.defense === 'number';
        if(!powerIsNumber && !defenceIsNumber){
            res.body = res.status(400).json({
                error: true,
                message: "Power or defence is not a number"
            })
            next(res.body);
        }
        const powerMoreThan = fighter.power < 100;
        const powerLessThan = fighter.power > 0;
        const defenceMoreThan = fighter.defense < 10;
        const defenceLessThan = fighter.defense > 1;
        const powerValid = powerLessThan && powerMoreThan;
        const defenceValid = defenceMoreThan && defenceLessThan;
        if (powerValid && defenceValid) {
            res.body = {     
                name : fighter.name,
                health : fighter.health,
                power : fighter.power,
                defense : fighter.defense,
                }
            next();
        } else {
            res.body = res.status(400).json({
                error: true,
                message: "Power or defence is too high"
            })
            next(res.body);
        }
    }else{
        res.body = res.status(400).json({
            error: true,
            message: "Fighter entity to create is not valid"
        })
        next(res.body);
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;