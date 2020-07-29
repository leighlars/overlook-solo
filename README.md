# Overlook 
Mod 2 Final Solo Project

- [Leigh Larson](https://github.com/leighlars)
- [Repo](https://github.com/leighlars/overlook-solo)
- [Project Board](https://github.com/leighlars/overlook-solo/projects)
- [Project Spec](https://frontend.turing.io/projects/overlook.html)

## Abstract 
The project asks the developer to design a functionally effective and sensible and aesthetically pleasing UX/UI hotel management tool. The user can log in as a manager or as a guest.

The manager can: 
View percentage and number of rooms available, today's total revenue.
View guests' names, a list of all of their bookings, and the total amount they’ve spent
Add a room booking for that user
Delete any upcoming room bookings for that user (they cannot delete a booking from the past)

The guest can:
I should be able to select a date for which I’d like to book a room for myself
Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
I should be able to filter the list of available rooms by their roomType property
I should be able to select a room for booking
In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search
Any room books (past or present)
The total amount I have spent on rooms

## Technologies / Systems
- Javascript
- TDD with Mocha/Chai & Spies
- VSCode 
- git / Version control
- Accessibility 
- SCSS / SASS
- API Fetch/Post
- Webpack

## Set Up 

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): git clone [remote-address] [what you want to name the repo]
2. Remove the default remote: git remote rm origin (notice that git remote -v not gives you back nothing)
3. Create a new repo on GitHub with the name of [what you want to name the repo] to be consistent with naming
4. Copy the address that you would use to clone down this repo - something like git@github.com:...
5. Add this remote to your cloned down repo: git remote add origin [address you copied in the previous step] - do not include the brackets
6. Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.
7. Once you have cloned the repo, change into the directory and install the project dependencies by running npm install.
8. To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` to interact with the application. Enter `control + c` in your terminal to stop the server at any time.

## Gif Showcase

## Reflections