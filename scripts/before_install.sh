#download node and npm
#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
#. ~/.nvm/nvm.sh
#nvm install node

echo "installing node and npm"
sudo yum install -y gcc-c++ make 
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
sudo npm install -g npm@9.1.3
echo "node installation successfull!!"
echo "installing pm2"
sudo npm install pm2 -g
echo "pm2 installation successfull!"



#create our working directory if it doesnt exist
DIR="/home/ec2-user/LucknowCentral"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi