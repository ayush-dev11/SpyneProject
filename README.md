Clone The repository
install dependencies by running "npm install" in each of the frontend and backend folders
start the backend using "node server.js" in the backend folder
start the frontend using "npm start" in the frontend folder
open your browser
go to "http://localhost:3000/register" -> to register a new user first
login using credentials just created
after login, you'll be redirected to the dashboard route where you'll see all thediscussions, to add a discussion, there will be a button, add the discusion from there
on successful addition of a discussion you'll be again be resirected to the dasboard route where you'll see the discussion where you can like, view or delete it. Like and view actions can be seen in the db entry for that discussion, when you like the userID of the person gets updated in the db in the likes array and similarly with view
create a dotenv file in the backend folder and add these variables: 
JWT_SECRET=0e5e6c6f5c9e35b6828584225c87ee5a9079733e255fce06f399393f6d5a8b8dca448f0ba2638ce1d65685031fdc01d21264ff96d4e5be7e3c83899dfcf15848
MONGO_URI=mongodb://localhost:27017/spyne

Couldn't deploy this due to lack of time working alongside my current job.
Feel free to reach out in case of any queries.
Thank You!!
