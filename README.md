# **RepDict** --- application to facilitate learning a foreign language based on cards and decks.

### **`Description`**: *This project is an up-to-date service for people who would like to learn foreign languages by presenting information in the form of cards. Users will be able to choose several foreign languages, and then it is easy to create both public and private cards, with which the study will become much more pleasant and systematized. Also, to motivate the study, there will be: achievements, experience, overall user rating, as well as a real-time one-on-one game.*

### **`Skills:`**
- #### *Micro service architecture*
- #### *REST API*
- #### *WebSockets*
- #### *Typescript – React JS*

### **`Potential functions that the user can use:`**
1. Create, edit, delete and save cards (Cards), and in them words and their translations. The user will also be able to add, move and delete words in the deck.
2. Viewing decks and displaying cards (/cards/{id_card})
3. Import and export of cards in available formats for saving data in tables (csv, xlsx, json)
4. Training – getting answers from the user and depending on the correctness of the answer to the previous word in random order on the page
5. Creating a personal user page – and with it: authorization and logging (authorization via Google and VK will also be available)
6. Viewing your statistics – how many words in the n-th amount of time the user was able to learn or repeat
7. (In moderation mode) For the nth number of words learned, the user can get achievements from the list of achievements.
8. (In moderation mode) Overall rating for users
9. (In moderation mode) The user can see his place in the top and accumulate points for the learned words. Also, for accumulating and positioning a place in the top for some time, the user will be able to get the corresponding achievement.
The main architecture of the interaction of application components

#### *The main architecture is a client-server architecture. In this project, there will be only one "main" server, which will host all the necessary API for interacting with the client; sending html on request (since the client is a SPA, you only need to give it once index.html ) and the allocation of special routes for static files. All manipulations will take place through REST requests: mainly GET and POST. As mentioned above, and based on the definition of the client-server architecture, after some events from the user, the client sends corresponding requests to a certain Route with input data, while the server, receiving this request, sends JSON with all the information necessary for rendering.*
#### *To transfer information on the client side, you need to implement two things: configure CORS, and also configure Axios with asynchronous requests to the server (it is recommended to put all functions for working with requests in a separate api.ts file)*
#### To reliably receive requests on the server side, you need to implement three things: configure CORS, create Routes.java , where all the routes for the API were located, as well as callbacks for each router.*

### **`Technical provisions of the client-server:`**
#### *(In this section you will be able to get acquainted with all the main provisions and tasks that need to be implemented on the client side)*
### **`Technology stack:`**
###### First you need to deal with the technology stack: the development language is Typescript, ReactJS is based on it, Redux is engaged in real-time data management, React-router is used for routing, and Axios is also used for transmitting asynchronous requests.
### **`Assembling:`**
###### *From the basic provisions and rules of web development, the client consists of HTML, CSS, JS. Therefore, any client application can be built into files of already known formats. Because by default, a react application can be created using a special (well-known) npx create-react-app my-app command, where all package script commands are already available.json: start, reject, build. After executing the last command, the build folder appears. Next, we give this folder to the backender, who will make sure that all files can be displayed. Done.*
