module.exports = {
  apps: [
    {
      name: 'yatramind-api',
      script: 'index.js',
      instances: 'max', // or a number of instances
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
