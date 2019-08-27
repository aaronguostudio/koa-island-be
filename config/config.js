module.exports = {
  env: 'dev',
  db: {
    name: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'guoxianghui'
  },
  security: {
    secretKey: 'guoxianghui',
    expiresIn: 60 * 60 * 24 * 30
  }
}
