#give permissions for every directory in LucknowCentral
sudo chmod -R 777 /home/ec2-user/LucknowCentral

#Navigate to working directory
cd /home/ec2-user/LucknowCentral

#add npm and node to path
#export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm i --force

#build react
npm run build
echo "Build complete"

#start backend
cd server
npm i --force
npm uninstall bcrypt --force
npm install bcrypt --force
sudo pm2 start npm --name "serverNode" -- start

#start frontend
cd /home/ec2-user/LucknowCentral
sudo pm2 start npm --name "reactNode" -- start


