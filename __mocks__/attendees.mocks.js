const attendeesInfo = [
  {
    id: '5f3c5f1d0c62e30b5c75a9af',
    email: 'raziel@gmail.com',
    eventId: '5f3c5f7944a4d553acb61740'
  },
  {
    id: '5f3c5f4ada6bed0ff0d506f7',
    email: 'walter@gmail.com',
    eventId: '5f3c5f7944a4d553acb61740'
  },
  {
    id: '5f3c5f66e9bcc052f0189fd4',
    email: 'alejandro@gmail.com',
    eventId: '5f3c5f7944a4d553acb61740'
  }
]

class Ateendees {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return attendeesInfo
  }

  findById(id) {
    return attendeesInfo.filter(item => item.id == id)[0];
  }

  save() {
    attendeesInfo.push(this.data)
    const item = this.findById(this.data.id)
    return item
  }
}

module.exports = {
  Ateendees,
  attendeesInfo
}