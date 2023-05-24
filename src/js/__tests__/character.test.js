import Character from '../character';
import Bowman from '../bowman';

test.each([
  ['create class', 'Player1', 'Bowman', {
    name: 'Player1',
    type: 'Bowman',
    health: 100,
    level: 1,
  }],
])(
  ('should %s with name %s and type %s'),
  (option, name, type, expected) => {
    const result = new Character(name, type);
    expect(result).toEqual(expected);
  },
);

test.each([
  ['create class with error "name less than 2 letters"', 'P', 'Daemon'],
  ['create class with error "name more than 10 letters"', 'SuperPlayer', 'Daemon'],
  ['create class with error "name not string"', 777, 'Daemon'],
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
  const bowman = new Bowman('Player1', 'Bowman');
  bowman.health = 0;
  expect(() => {
    bowman.levelUp();
  }).toThrow();
});

test.each([
  ['with health value = 100', 'Player1', 'Bowman', {
    name: 'Player1',
    type: 'Bowman',
    health: 100,
    level: 2,
    attack: 30,
    defence: 30,
  }],
])(
  ('should run method levelUp %s and with name %s and type %s'),
  (option, name, type, expected) => {
    const result = new Bowman(name, type);
    result.levelUp();
    expect(result).toEqual(expected);
  },
);

test('should run method "damage" with error "health = 0"', () => {
  const bowman = new Bowman('Player1', 'Bowman');
  bowman.health = 0;
  expect(() => {
    bowman.damage(100);
  }).toThrow();
});

test.each([
  ['with health value = 100', 'Player1', 'Bowman', 40, {
    name: 'Player1',
    type: 'Bowman',
    health: 100 - 40 * (1 - 25 / 100),
    level: 1,
    attack: 25,
    defence: 25,
  }],
])(
  ('should run method damage %s and with name %s and type %s'),
  (option, name, type, damageValue, expected) => {
    const result = new Bowman(name, type);
    result.damage(damageValue);
    expect(result).toEqual(expected);
  },
);
