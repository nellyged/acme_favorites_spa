const { conn } = require('./db');
const { User, Thing, Favorite } = require('./Models');

//Relationships
Favorite.belongsTo(User);
Favorite.belongsTo(Thing);

const usernames = ['moe', 'larry', 'curly', 'shep'];
const things = ['foo', 'bar', 'bazz', 'quq', 'quip'];

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        Promise.all(usernames.map(name => User.create({ name }))).then(items =>
          items.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {})
        ),
        Promise.all(things.map(name => Thing.create({ name }))).then(items =>
          items.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {})
        ),
      ]);
    })
    .then(([userMap, thingMap]) => {
      return Promise.all([
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.foo.id,
          rank: 7,
        }),
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.bar.id,
          rank: 5,
        }),
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.bazz.id,
          rank: 1,
        }),
        Favorite.create(
          { userId: userMap.larry.id, thingId: thingMap.bazz.id, rank: 2 },
          Favorite.create({
            userId: userMap.larry.id,
            thingId: thingMap.bar.id,
            rank: 1,
          })
        ),
      ]);
    });
};

const getUsers = () => {
  return User.findAll().then(users => {
    const usersToReturn = Object.keys(users).map(key => {
      return users[key].get();
    });
    return usersToReturn;
  });
};

const getThings = () => {
  return Thing.findAll().then(things => {
    const thingsToReturn = Object.keys(things).map(key => {
      return things[key].get();
    });
    return thingsToReturn;
  });
};

const getFavs = () => {
  return Favorite.findAll({
    include: [{ all: true }],
  }).then(favs => {
    const favsToReturn = Object.keys(favs).map(key => {
      return favs[key].get();
    });
    return favsToReturn;
  });
};

const getNavTitles = async () => {
  const userLen = await getUsers().then(users => {
    return users.length;
  });
  const thingLen = await getThings().then(things => {
    return things.length;
  });
  return {
    users: userLen,
    things: thingLen,
  };
};

module.exports = {
  syncAndSeed,
  models: {
    User,
    Thing,
    Favorite,
  },
  getUsers,
  getThings,
  getFavs,
  getNavTitles,
};
