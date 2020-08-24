const eventsInfo = [
  {
    _id: '5f42c4b914b927068cd8523d',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Evento Vue',
    description: 'Esto es un super evento de Vue.',
    talks: [],
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    theme: 'omnitrix',
    broadcast: [],
    sponsors: [],
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4',
    createdAt: '2020-08-23T19:34:17.885Z',
    updatedAt: '2020-08-23T19:34:17.885Z'
  },
  {
    _id: '5f42c4b914b927068cd8523d',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Evento Angular',
    description: 'Esto es un super evento de Angular.',
    talks: [],
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    theme: 'omnitrix',
    broadcast: [],
    sponsors: [],
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4',
    createdAt: '2020-08-23T19:34:17.885Z',
    updatedAt: '2020-08-23T19:34:17.885Z'
  },
  {
    _id: '5f42c4b914b927068cd8523d',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Eventos React',
    description: 'Esto es un super evento de React.',
    talks: [],
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    theme: 'omnitrix',
    broadcast: [],
    sponsors: [],
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4',
    createdAt: '2020-08-23T19:34:17.885Z',
    updatedAt: '2020-08-23T19:34:17.885Z'
  }
]

class Events {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return eventsInfo
  }

  findById(id) {
    return eventsInfo.filter(item => item._id == id)[0];
  }

  save() {
    eventsInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Events,
  eventsInfo
}