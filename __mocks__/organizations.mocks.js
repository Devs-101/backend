const organizationsInfo = [
  {
    _id: '5f42a2b78814a10955374ae4',
    name: 'Vue Conf',
    description: 'The Official Vue.js Conference in the US',
    logo: 'https://us.vuejs.org/_nuxt/img/3a1c375.png',
    userId: '5f489a94ec79ea2808e79e38',
    deleted_at: null
  },
  {
    _id: '5f42a5838814a10955374ae6',
    name: 'NG CONF COLOMBIA',
    description: 'The first and most incredible Angular conference in Latin America',
    logo: 'https://ngconf.co/assets/logo-01.png',
    userId: '5f42a2b78814a10955374ae3',
    deleted_at: null
  },
  {
    _id: '5f42a5ec4496161f1192bcec',
    name: 'React Summit',
    description: 'The Biggest React Conference Worldwide',
    logo: 'https://reactsummit.com/img/logo.svg',
    userId: '5f42a2b78814a10955374ae3',
    deleted_at: null
  }
]

class Organizations {
  constructor(data) {
    this.data = data || false
  }

  static find ({ userId }) {
    return organizationsInfo;
  }

  static findOneAndUpdate({ _id }, data) {
    return data
  }

  static findOne ({ _id }) {
    let res = false
    res = organizationsInfo.filter(item => item._id === _id)[0];
    if(res) res.deleted_at = '2020-08-23T19:34:17.885Z'
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