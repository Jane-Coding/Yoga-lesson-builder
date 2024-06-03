# Constructor of yoga lessons

The idea of the App is to create your own yoga lesson. Lesson consists of list of poses for 1 minute each. After timer runs out, get sound notification to transition to next pose. 
There could be multiple lessons all stored in data base. It is possible to update and delete lessons. 
App is still in production. For more details please check lists below :point_down:


### What is ready so far

1. Home page:
   - fetch data from MondoDb and showcases saved lesson in a card
   - preview what poses will be in single lesson
   - delete lesson from the database
   - update lesson data

2. Create lesson page:
   - selection from available poses into lesson
   - verification of name, title and selected poses
   - post new lesson to data base
   - reset to blank after post

3. Lesson page:
   - upload lesson from data base
   - control button to start lesson and pause 
   - timer is set to 1 min to switch to next pose
   - after lesson is over show congratulation message and redirect to Home page 
  
4. Layout:
   - navbar as a layout on all pages
  
5. Backend uses express, mongoose
6. Routing is made with react-router-dom
7. Design is used with MUI and react-slick to storage all selected lessons in Create lesson page


### Plans for future updates

1. Authentification of users (log in \ out)
2. Add notifications
3. Redesign
4. Add sound notification to start next pose
