const { UserRepository } = require('../repositories/userRepository');
const validationError = require('../errors/validationError');
const notFoundError = require('../errors/notFoundError');

class UserService {

    createNewUser(data) {
        const isNotUniqEmail = UserRepository.getOne({ email: data.email });
        const isNotUniqPhoneNumber = UserRepository.getOne({ phoneNumber: data.phoneNumber });

        if (isNotUniqPhoneNumber) {
            throw new validationError('Phone number already exists');
        }
        if (isNotUniqEmail) {
            throw new validationError('Email already exists');
        }
        return UserRepository.create(data)
    }

    updateUserData(id, dataToUpdate) {
        const isEmailExist = UserRepository.getOne({ id });
        if (isEmailExist) {
            return UserRepository.update({id}, dataToUpdate)
        } else {
            throw new notFoundError('User does not exist')
        }
    }

    searchOne(id) {
        const item = UserRepository.getOne({ id });
        if (!item) {
            return null;
        }
        return item;
    }
    searchAll() {
        const items = UserRepository.getAll();
        if (!items) {
            return null;
        }
        return items;
    }
    delete(id) {
        const item = UserRepository.delete(id);
        if (!item) {
            throw Error('The user was not delete')
        }
        return item;
    }
}

module.exports = new UserService();