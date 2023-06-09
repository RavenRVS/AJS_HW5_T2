import { characterType } from './classes';

const validTypes = Object.values(characterType);

export default class Character {
  constructor(name, type) {
    if (typeof name !== 'string') {
      throw new Error('Имя должно иметь тип строка');
    }
    if (name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть от 2 до 10 символов');
    }
    if (!validTypes.includes(type)) {
      throw new Error('Некорректный тип персонажа');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
  }

  levelUp() {
    if (!this.health > 0) {
      throw new Error('health = 0');
    }
    this.level += 1;
    this.health = 100;
    this.attack *= 1.2;
    this.defence *= 1.2;
  }

  damage(points) {
    if (!this.health > 0) {
      throw new Error('health = 0');
    }
    this.health -= points * (1 - this.defence / 100);
  }
}
