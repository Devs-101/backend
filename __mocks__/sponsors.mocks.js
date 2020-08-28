const sponsorsInfo = [
  {
    _id: '5f448d646fd1395360789a9a',
    name: 'Platzi',
    url: 'www.platzi.com',
    logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
    eventId: '5f42c4b914b927068cd8523d'
  },
  {
    _id: '5f448e10e3fc356f643254c9',
    name: 'Facebook',
    url: 'www.facebook.com',
    logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
    eventId: '5f42c4b914b927068cd8523d'
  },
  {
    _id: '5f476effcb9f083124cece61',
    name: 'Blizard',
    url: 'www.blizzard.com',
    logo: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598328165/zcaxj2eo2havpj0tbwbk.png',
    eventId: '5f447c4ca2c42d5fa8300eac'
  }
]

class Sponsors {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return sponsorsInfo
  }

  static findOne({ _id }) {
    return sponsorsInfo.filter(item => item._id == _id)[0];
  }

  static findOneAndUpdate({ _id }, data) {
    return data
  }

  static deleteOne({ _id }) {
    return {
      deletedCount: 1
    }
  }

  findById(id) {
    return sponsorsInfo.filter(item => item._id == id)[0];
  }

  save() {
    sponsorsInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Sponsors,
  sponsorsInfo
}