const eventsInfo = [
  {
    _id: '5f3c5f7944a4d553acb61740',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Evento Vue',
    description: 'Esto es un super evento de Vue.',
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    deleted_at: null,
    theme: 'omnitrix',
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4'
  },
  {
    _id: '5f42c4ba14b927068cd8523f',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Evento Angular',
    description: 'Esto es un super evento de Angular.',
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    deleted_at: null,
    theme: 'omnitrix',
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4'
  },
  {
    _id: '5f42c4ba14b927068cd8523f',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: 'Eventos React',
    description: 'Esto es un super evento de React.',
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    deleted_at: null,
    theme: 'omnitrix',
    slug: 'super-slug-supernew-4',
    fullUrl: 'fullUrl',
    organizators: [],
    organizationId: '5f42a2b78814a10955374ae4'
  },
  {
    _id: '5f42c4ba14b927068cd8523f991',
    eventStatus: false,
    countDown: true,
    allowRegister: true,
    name: null,
    description: null,
    dateHour: {
      initDate: '2020-08-01T23:30:00.000Z',
      endDate: '2020-08-01T23:30:00.000Z'
    },
    deleted_at: null,
    theme: null,
    slug: null,
    fullUrl: null,
    organizators: [],
    broadcast: {
      subject: null,
      text: null,
      img: null,
    },
    bannerOrHeader: {
      isBanner: null,
      img: null,
      text: null,
    },
    organizationId: '5f42a2b78814a10955374ae4'
  }
]

class Events {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return eventsInfo
  }

  static findOne(_id) {
    console.log(_id)
    _id._id ? _id = _id._id : null
    return eventsInfo.filter(item => item._id === _id)[0];
  }

  static findOneAndUpdate({ _id }, data) {
    let item = eventsInfo.filter(item => item._id == _id)[0];
    if(data._id) {
      item = data
    } else if(data.eventStatus && !data.deleted_at) {
      item.eventStatus = true
    } else if(data.deleted_at && !data.eventStatus) {
      item.deleted_at = '2020-08-01T23:30:00.000Z'
      item.eventStatus = false
    }

    return item
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