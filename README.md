# _Bike Finder_

#### _Asynchrony and APIs practice for Epicodus_, _11 Feb. 2020_

#### By _**Michelle Morin, Matt Taylor**_

## Description

_This application locates stolen bikes based off of user input of location._

## Specifications:

| Specification | Example Input | Example Output |
| ------------- |:-------------:| -------------------:|
| Take User input of a location | user enters location and clicks button | "Portland, Oregon" |
| Take User input of a distance | user enters radius for search and clicks button | "5" |
| Webpage displays list of stolen bikes within specified radius of user's IP address | 5 | List of bikes stolen within 5 miles of user's input number |
| Webpage displays list of stolen bikes within proximity to user's input location | "Portland, Oregon" | List of stolen bikes within proximity to Portland, OR |
| If there any stolen bikes in user's search radius, the webpage displays the most commonly stolen bike manufacturer | 5 miles, Portland, OR | "Specialized" |
| Webpage displays a random inspirational quote when user submits form | user clicks "find bike button" | Inspirational quote displayed in jumbotron |

## Setup/Installation Requirements

#### Node install

###### For macOS:
_If Homebrew is not installed on your computer already, then install Homebrew by entering the following two commands in Terminal:_
* $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
* $ echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bash_profile

_Install Git with the following command:_
* $ brew install git

_Next, install Node.js by entering the following command in Terminal:_
* $ brew install node

###### For Windows:
_Please visit the [Node.js website](https://nodejs.org/en/download/) for installation instructions._


#### Install this application

_Clone this repository via Terminal using the following commands:_
* _$ cd desktop_
* _$ git clone {url to this directory}_
* _$ cd {directory name}_
_Then, confirm that you have navigated to this project directory by entering "pwd" in Terminal._

_Next, install npm at the project's root directory via the following commands:_
* _$ npm install_
* _$ npm run build_

_Next, add .env file to project root directory using command ``touch .env``_
* _add API_KEY = { your own API key for Bike Index } to the .env file. You can make your own API key to the Bike Index [here](https://bikeindex.org/documentation/api_v3)_
* _The webpage uses the Forismatic API to display random inspirational quotes upon form submisson. There is no API key needed for this API._

_Open the contents of the directory in a text editor or IDE of your choice (e.g., to open the contents of the directory in Visual Studio Code on macOS, enter the command "code ." in Terminal)._

## Technologies Used

_Git, HTML, CSS, JavaScript, jQuery, npm, webpack, Bike Index API, [Forismatic API](http://forismatic.com/en/api/)_

### License

*This webpage is licensed under the MIT license.*

Copyright (c) 2020 **_Michelle Morin, Matt Taylor_**