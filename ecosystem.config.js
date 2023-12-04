module.exports = {
  apps : [{
    name: 'Easy Pay Park Cameras',
    script: 'server.js',
    watch: true,
    env: {
      NODE_ENV: 'development',
      HTTP_PORT: 8000,
      JWT_SECRET_OR_KEY: '0dd2b5e5d7d1a428def1fffbede45818',
      HASH_SALT: 'c92b46d2412db9d2a8414274361ecb77',
      DEFAULT_ADMIN_USERNAME: 'admin',
      DEFAULT_ADMIN_PASSWORD: '123456',
      DEFAULT_ADMIN_EMAIL: 'admin@easypark.com',
      DB_HOST: 'localhost',
      DB_USER: 'connection',
      DB_PASSWORD: 'connection',
      DB_NAME: 'parkinglot_cameras',
      LOGO_FILENAME: 'logo.png',
      PARKING_NAME: 'Estacionamiento',
      REAL_TIME_RESULTS: 500,
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};