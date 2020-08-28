const speakersInfo = [
  {
    _id: '5f4754d764701a63b0484e84',
    name: 'Speaker 1',
    twitter: '@speaker1',
    bio: 'Speaker Super Bio 1',
    rol: 'Speaker Super Rol 1',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  },
  {
    _id: '5f475c2827887752544b56d6',
    name: 'Speaker 2',
    twitter: '@speaker2',
    bio: 'Speaker Super Bio 2',
    rol: 'Speaker Super Rol 2',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  },
  {
    _id: '5f475d786d07c52de4fdb577',
    name: 'Speaker 3',
    twitter: '@speaker3',
    bio: 'Speaker Super Bio 3',
    rol: 'Speaker Super Rol 3',
    eventId: '5f3c5f7944a4d553acb61740',
    img: 'https://res.cloudinary.com/dnp43rl6a/image/upload/v1598510294/lccenafoj9zbu0ugqxej.png'
  }
]

class Speakers {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return speakersInfo
  }

  static findOne({ _id }) {
    return speakersInfo.filter(item => item._id == _id)[0];
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
    return speakersInfo.filter(item => item._id == id)[0];
  }

  save() {
    speakersInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Speakers,
  speakersInfo
}