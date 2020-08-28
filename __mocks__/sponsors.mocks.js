const sponsorsInfo = [
  {
    "broadcast": {
        "subject": "Remember my event",
        "text": "Thanks to register to my event.",
        "image": "image.png"
    },
    "_id": "5f46f05a19f76b6040b785ea"
  },
  {
    "broadcast": {
        "subject": "Remember my event",
        "text": "Thanks to register to my event.",
        "image": "image.png"
    },
    "_id": "5f42bf9b495793583c2a923d"
  },
  {
    "broadcast": {
        "subject": "Remember my event",
        "text": "Thanks to register to my event.",
        "image": "image.png"
    },
    "_id": "5f42c1870d55711698a694cc"
  }
]

class Sponsors {
  constructor(data) {
    this.data = data || false
  }

  static find () {
    return sponsorsInfo
  }

  findById(id) {
    return sponsorsInfo.filter(item => item._id == id)[0];
  }

  save() {
    sponsorsInfo.push(this.data)
    const item = this.findById(this.data._id)
    return item
  }
}

module.exports = {
  Sponsors,
  sponsorsInfo
}