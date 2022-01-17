FROM ubuntu:latest

EXPOSE 1883 3883


#update ubuntu
RUN apt-get -y update

# install ssh
RUN apt-get -y install ssh

#install the build-essential package
RUN apt-get install build-essential -y

#install curl
RUN apt-get install curl -y

# install git
RUN apt-get install git -y

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v
RUN npm install -g yarn
RUN yarn -v


WORKDIR /home/app
COPY ./ ./ 


#====================================RUN===============================================
RUN yarn install
CMD ["node", "index.js"]