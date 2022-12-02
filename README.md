# Binotify Rest Service

Binotify Rest Service is an end-to-end service for Binotify Premium and Binotify App. This service maintain Binotify's artist and premium song data. Furthermore, subscription's status modification also processed here with help by Binotify Subscription Service.

Made with love by

|              Name              |   NIM    |
| :----------------------------: | :------: |
| Muhammad Garebaldhie ER Rahman | 13520029 |
|        I Gede Arya Raditya Parameswara        | 13520036 |
|      Arik Rayi Arkananta       | 13520048 |

## API Endpoint & Functionality
Please refer here https://www.getpostman.com/collections/010d1e585f5350eb0983 to get full version of the endpoints.
|              Method              |   NIM    |   Description    |
| :----------------------------: | :------: | :------: |
| POST              | /register | Register user |
|       POST        | /login | Login user |
|      GET          | /user | Fetch user data |
|      GET       | /premium-song | Fetch premium song data |
|      POST       | /premium-song | Create new premium song |
|      GET       | /premium-song/:song_id | Fetch premium song detail by id |
|      PUT       | /premium-song/:song_id | Edit premium song |
|      DELETE       | /premium-song/:song_id | Delete premium song |
|      GET       | /singer | Fetch singer list |
|      GET       | /singer/:singer_id | Fetch singer detail |
|      GET       | /subscription | Fetch pending subscription data |
|      POST       | /subscription/decision | Update subscription status |

## Requirement list

1. Docker
2. Yarn v1.22.19
3. Node v16.18.0
4. [Binotify SOAP Service](https://gitlab.informatika.org/if3110-2022-k02-02-04/binotify-soap-service) running

## Installation

1. Install requirements

   - For windows and mac user

     - Download docker desktop [here](https://www.docker.com/products/docker-desktop/)

   - For UNIX like user run commands below

   ```sh
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

   To verify if docker is already installed run with `docker run hello-world` and for UNIX users don't forget to add `sudo`

2. Clone this repository
3. By default this application use port `3333` and if your computer already use the port please change it in `docker-compose.yml` file and you can refer to guide in [here](https://docs.docker.com/compose/gettingstarted/)

## How to run

1. Change directory to the clonned repo
2. Create `.env` file by using the example
3. Run `docker compose up -d`
4. Run yarn run start

## How are the tasks divided?

| Muhammad Garebaldhie ER Rahman |    I Gede Arya R. P    | Arik Rayi Arkananta        |
| ------------------------------ | :--------------------: | -------------------------- |
| Subscription Service Connector|Code Architecture|Subscription Service Interface|
| |Subscription List endpoint|Update subscription status|
| |Register | |
| |Login | |
| |User Detail | |
| |Premium song detail | |
| |Premium song list| |
| |Create premium song| |
| |Edit premium song| |
| |Delete premium song| |
| |Singer list| |
| |Singer's detail & premium song | |
| |Pending subscription list | |
