const faker = require('faker')
faker.locale = 'zh_CN'

const notes = {
  getIndex(count = 20) {
    let data = localStorage.getItem('/notes')
    try {
      data = JSON.parse(data)
    } catch (e) {
    }

    if (!data || data.length != count) {
      data = []

      for (let i = 0; i < count; i++) {
        data.push({
          id: i,
          title: (Math.random() > 0.7) ? faker.lorem.sentence() : null,
          desc: faker.lorem.sentence(),
          book: (Math.random() > 0.3)
            ? {
              id: i,
              title: faker.lorem.words(),
            }
            : null,
          page: faker.random.number(999),
        })
      }

      localStorage.setItem('/notes', JSON.stringify(data))
    }

    return data
  },
}

module.exports = { notes }
