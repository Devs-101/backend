const usersInfo = [
  {
    _id: '5f3c5f7944a4d553acb61740',
    name: 'Evento Vue',
    email: 'correo@correo.com',
    password: '123456',
    img: 'https://us.vuejs.org/_nuxt/img/3a1c375.png' 
  },
  {
    _id: '5f42c4ba14b927068cd8523f',
    name: 'Evento Angular',
    email: 'correo1@correo.com',
    password: '123456',
    img: 'https://ngconf.co/assets/logo-01.png' 
  },
  {
    _id: '5f42c4ba14b927068cd8523f',
    name: 'Eventos React',
    email: 'correo2@correo.com',
    password: '123456',
    img: 'https://reactsummit.com/img/logo.svg' 
  }
]

class Users {
  constructor(data) {
    this.data = data || false
  }
  
  static findOneAndUpdate({ _id }, data) {
    return data
  }

  static findById(userId) {
    console.log(userId._id);
    return usersInfo.filter(item => item._id == userId._id)[0];
  }
}

module.exports = {
  Users,
  usersInfo
}