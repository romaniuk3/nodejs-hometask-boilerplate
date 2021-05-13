const { FighterRepository } = require('../repositories/fighterRepository');
const validationError = require('../errors/validationError');

class FighterService {

    searchAll() {
        const items = FighterRepository.getAll();
        if (!items) {
            return null;
        }
        return items;
    }
    searchOne(id) {
        const item = FighterRepository.getOne({ id });
        if (!item) {
            return null;
        }
        return item;
    }
    createFighter(data) {
        const checkFighterName = FighterRepository.getOne({name: data.name});
        if(checkFighterName){
            throw new validationError('Fighter name already exists');
        }
        return FighterRepository.create(data);

    }
    deleteFighter(id) {
        const fighter = FighterRepository.delete(id);
        if (!fighter) {
            return null;
        }
        return fighter;
    }
    updateFighter(id, dataToUpdate) {
        const checkFighterName = FighterRepository.getOne({id});
        if(checkFighterName){
            throw Error('Fighter already exist')
        }
        return FighterRepository.update({id}, dataToUpdate);
    }
}

module.exports = new FighterService();