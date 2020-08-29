const organizatorsInfo = [
  {
    _id: '5f4754d764701a63b0484e84',
    name: 'Organizator 1',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  },
  {
    _id: '5f475c2827887752544b56d6',
    name: 'Organizator 2',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  },
  {
    _id: '5f475d786d07c52de4fdb577',
    name: 'Organizator 3',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  }
]

class Organizator {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return organizatorsInfo
  }

  static findOne({ _id }) {
    return organizatorsInfo.filter(item => item._id == _id)[0];
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
    return organizatorsInfo.filter(item => item._id == id)[0];
  }

  save() {
    organizatorsInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Organizator,
  organizatorsInfo
}