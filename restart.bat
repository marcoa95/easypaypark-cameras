@ECHO OFF

call npm install
call npm install -g pm2 pm2-windows-startup
call pm2 start ecosystem.config.js
call pm2 save
call pm2-startup install
