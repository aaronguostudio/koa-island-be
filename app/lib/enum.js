function isThisType (val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}

const LoginTypes = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

const ArtTypes = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
}

module.exports = {
  LoginTypes,
  ArtTypes
}
