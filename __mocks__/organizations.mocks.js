const organizationsInfo = [
  {
    _id: '5f42a2b78814a10955374ae4 ',
    name: 'VueConf',
    userId: '5f42a2b78814a10955374ae3',
    createdAt: '2020-08-23T17:09:12.014Z',
    updatedAt: '2020-08-23T17:09:12.014Z'
  },
  {
    _id: '5f42a5838814a10955374ae6 ',
    name: 'Angular Conf',
    userId: '5f42a2b78814a10955374ae3',
    createdAt: '2020-08-23T17:09:12.014Z',
    updatedAt: '2020-08-23T17:09:12.014Z'
  },
  {
    _id: '5f42a5ec4496161f1192bcec ',
    name: 'React Summit',
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
    return organizationsInfo[0]
  }

  findById(id) {
    return organizationsInfo.filter(item => item.id === id)[0];
  }

  save() {
    organizationsInfo.push(this.data)
    const item = this.findById(this.data.id)
    return item
  }
}

module.exports = {
  Organizations,
  organizationsInfo
}