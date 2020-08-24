const organizationsInfo = [
  {
    _id: '5f42a2b78814a10955374ae4',
    name: 'Vue Conf',
    description: 'The Official Vue.js Conference in the US',
    logo: 'https://us.vuejs.org/_nuxt/img/3a1c375.png',
    userId: '5f42a2b78814a10955374ae3',
    createdAt: '2020-08-23T17:09:12.014Z',
    updatedAt: '2020-08-23T17:09:12.014Z'
  },
  {
    _id: '5f42a5838814a10955374ae6',
    name: 'NG CONF COLOMBIA',
    description: 'The first and most incredible Angular conference in Latin America',
    logo: 'https://ngconf.co/assets/logo-01.png',
    userId: '5f42a2b78814a10955374ae3',
    createdAt: '2020-08-23T17:09:12.014Z',
    updatedAt: '2020-08-23T17:09:12.014Z'
  },
  {
    _id: '5f42a5ec4496161f1192bcec',
    name: 'React Summit',
    description: 'The Biggest React Conference Worldwide',
    logo: 'https://reactsummit.com/img/logo.svg',
    userId: '5f42a2b78814a10955374ae3',
    createdAt: '2020-08-23T17:09:12.014Z',
    updatedAt: '2020-08-23T17:09:12.014Z'
  }
]

class Organizations {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return organizationsInfo
  }

  static findOne ({ _id }) {
    let res = false
    res = organizationsInfo.filter(item => item._id === _id)[0];
    return res
  }

  findById(id) {
    return organizationsInfo.filter(item => item._id === id)[0];
  }

  save() {
    organizationsInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Organizations,
  organizationsInfo
}