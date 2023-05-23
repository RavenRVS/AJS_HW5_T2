import Character from '../character';
import { CLASSES } from '../classes';

test.each([
  ['create class', 'Player1', CLASSES[0].className, {
    name: 'Player1',
    type: CLASSES[0].className,
    health: 100,
    level: 1,
    attack: CLASSES[0].attack,
    defence: CLASSES[0].defence,
  }],
])(
  ('should %s with name %s and type %s'),
  (option, name, type, expected) => {
    const result = new Character(name, type);
    expect(result).toEqual(expected);
  },
);

test.each([
  ['create class with error "name less than 2 letters"', 'P', CLASSES[0].className],
  ['create class with error "name more than 10 letters"', 'SuperPlayer', CLASSES[0].className],
  ['create class with error "name not string"', 777, CLASSES[0].className],
  ['create class with error "envalid type"', 'Player1', 'anyType'],
])(
  ('should %s by name %s and type %s'),
  (option, name, type) => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars,
      const result = new Character(name, type);
    }).toThrow();
  },
);

test('should run method "levelUP" with error "health = 0"', () => {
  const pers = new Character('Player1', CLASSES[0].className);
  pers.health = 0;
  expect(() => {
    pers.levelUp();
  }).toThrow();
});

test.each([
  ['with health value = 100', 'Player1', CLASSES[0].className, {
    name: 'Player1',
    type: CLASSES[0].className,
    health: 100,
    level: 2,
    attack: CLASSES[0].attack * 1.2,
    defence: CLASSES[0].defence * 1.2,
  }],
])(
  ('should run method levelUp %s and with name %s and type %s'),
  (option, name, type, expected) => {
    const result = new Character(name, type);
    result.levelUp();
    expect(result).toEqual(expected);
  },
);

test('should run method "damage" with error "health = 0"', () => {
  const pers = new Character('Player1', CLASSES[0].className);
  pers.health = 0;
  expect(() => {
    pers.damage(100);
  }).toThrow();
});

test.each([
  ['with health value = 100', 'Player1', CLASSES[0].className, 40, {
    name: 'Player1',
    type: CLASSES[0].className,
    health: 100 - 40 * (1 - CLASSES[0].defence / 100),
    level: 1,
    attack: CLASSES[0].attack,
    defence: CLASSES[0].defence,
  }],
])(
  ('should run method damage %s and with name %s and type %s'),
  (option, name, type, damageValue, expected) => {
    const result = new Character(name, type);
    result.damage(damageValue);
    expect(result).toEqual(expected);
  },
);
