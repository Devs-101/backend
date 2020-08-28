const authInfo = [
  { // Password 123456
    _id: '5f489a94ec79ea2808e79e38',
    email: 'walter.salas@onevent.xyz',
    password: '$2a$12$KkJUyzQF2B4thoI92ukkPeo/EQlT0I1iBI1Ovf0KdHcSFKGNAGIk.',
    name: 'Walter Salas'
  },
  {
    _id: '5f489b43d86cfd4d443827ef',
    email: 'alejandro.ortiz@onevent.xyz',
    password: '$2a$12$JVZcICW3KTzKQz0ZN3KkfeujgCPtTfjtk95.DY86FryBWCtpM3Tra',
    name: 'Alejandro Ortiz'
  }
]

class Auth {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return authInfo
  }

  static findOne({ email }) {
    return authInfo.filter(item => item.email == email)[0];
  }

  static findById(id) {
    if(!id) {
      return undefined
    }
    return authInfo[0];
  }

  static getUserById(id) {
    return authInfo.filter(item => item.id == id)[0];
  }

  findByID(id) {
    return authInfo.filter(item => item._id == id)[0];
  }

  save() {
    authInfo.push(this.data)
    const item = this.findByID(this.data._id)
    return item
  }
}

module.exports = {
  Auth,
  authInfo
}