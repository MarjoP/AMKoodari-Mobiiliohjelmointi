#MEMORY GAME

##Introduction
The memory game application has two game modes; a Classic memory game where the player tries to find matching pairs and a Repeat game where the player needs to remember the correct order of the items he/she hears.
In Classic game the player can choose from two different card themes; 'Pokemon' and 'Space' and from three difficulty levels. 

Game scores are stored in a database and TOP 20 scores of each Game mode/level are shown on a Scoreboard screen.

The app is built using **React Native**.

##App structure and screens

*  **Memory game tab**: This is the starting screen for the Classic memory game where the player and type in his name and select the theme and difficulty levels. After hitting the Start Game button, the player is forwarded to the actual game view based on the selections. On bottom there is a small tooltip to show how the game score will be counted. 

 * **Classic game view**: Separate game screen where the card images are based on the selected theme and the amount of shown cards is based on the difficulty level. (Easy: 6 pairs/12 cards, medium: 12 pairs / 24 cards and hard: 24 pairs /48 cards).
 The game screen is shown and timing started after a 3 second countdown view. On top part of the view the player can see statistic of amount of found pairs, the amount of used trials and a seconds counter. The final score is based on the amount of trials and the used time. After the game is finished the player is forwarded back to the starting screen.

* **Repeat game screen**: The view consist of an input field where the player can type his name, game instructions, game board and a button to start a new round. When the player presses the button, he can hear 3 random items and after a while the items start to appear on the screen. The player needs to click the shown items in the correct order in order to make it to the next round. The amount of items increases gradually while passing the rounds. The game end if the player selects a wrong item. 
New game can be started right away from the same screen. 

* **Scoreboard**: Here the player can view the TOP 20 results of all three levels of the Classic game or the TOP 20 results of the Repeat game. 



##Functionality and used technologies and main components
* App.js
    * **Header** to show the app name
    * **MaterialTopTabNavigator** (moving between classic game, repeat game and scoreboard)
    * **StackNavigator** (moving from classic game screen to actual play view)
* ClassicScreen.js
    * **Input** for players name (used name is 'anonymous' if player doesn't add a name)
    * **DropDownPicker** for selecting theme and difficulty level
    * **Button** to start the game
    * **Tooltip** to show score formation info
    * **StackNavigator** to move to game view
    * **Alert** to be shown if the player has not selected theme/difficulty level
    * **Main functionality**: Fetching images (JSON data) based on the selected theme (Pokemons from Pokeapi and space images from NASA). Passing the data to the game screen.
* ClassicGame.js
    * **Modal** to show 3s countdown view before the game starts
    * **Expo Audio** to play sound effect when a pair is found
    * **Animated** to show brief background color changed of 'Found pairs' -field when a pair is found
    * **FlatList** for laying out the cards
    * **FlipCard**, **Image** to hold the image/ card back-side
    * **Alert** to show the Game over data and final scores.
    * **SQLite** for storing the scores (player name, score, playing date, diffulty level)
    * **Permissions** and **DeviceMotion** for additional side functionality to show request to turn the device if the view is turned from vertical to horizontal. 
    * **Main functionality**: 
    1. Starts a seconds counter and shows a countdown modal before showing the game view.
    2. Gets the cards array (info of 30 card images), difficulty level, player name as parameters. 
    3. Shuffles the card array, selects 'x' amount of cards to a new array based on the difficulty level (each selected card is added twice to make a pair), shuffles the new card array, sets the cards on the playing layout (FlipCard, FlatList) back side up. 
    4. If the selected card is the first of the two, the name of selected card is added to a list and 'locked' so that it can not be 'selected' twice at the same time. 
    When a second card is selected, it's name is compared with the one on the list. If the name matches, a quick animation and sound effect are played, found pairs count and trials count are increased by one, and both of the cards are locked so that they are not available for turning anymore. The list with selected card is emptied for the next round. 
    If the names do not match, both cards are flipped back, trials count is increased by one and list with selected card is emptied for the next round. 
    5. The game ends when the found pairs equals the amount of pairs in that specific difficulty level. The score is counted and score info is stored in SQLite database.
    6. Player is forwarded back to starting screen
* RepeatScreen.js
    * **Input** for players name
    * **FlatList** , **Image** for organizing and showing the items
    * **Button** to start a new round
    * **Expo Speech** to say the item names aloud
    * **Animated** to bring the items slowly visible and change the background color
    * **TouchableHighlight** for making the items nicely pressable
    * **SQLite** to store the score data
    * **Main functionality**: 
    1. Item images are stored under assest/Icons folder in .png form. Separate file: Icons.js contains the item names and url-paths and the icon data is fetched to an array in the app. When the player starts a first round, 3 random items are selected from this list of Icons into a new array. 
    2. The item names are spoken aloud by Expo Speech. The item array is then copied, the copied array shuffled and the shuffled cards are placed on the gameboard. Animation to bring the item images visible starts after a short delay.
    3. The player can click the items at any time once they start to become visible. When player clicks a first image it's name is compared with the first name in the array of the spoken items. If the names matches the score is increased by one. Similarly the second clicked item is compared with the second item in the list of spoken items. 
    If the names do not match, the game ends, scores are stored in a database, and a Game over -alert is shown to the player. 
    4. If the player has clicked all items in the correct order, an alert message will be shown, round will be increased by one and the player can start a new round. The amount of items will increase gradually.
* ScoreScreen.js
    * **FlatList** for displaying the scores
    * **Button** to select which scores to be shown
    * **SQLite** database where the selected scores are fetched
    * **Main Functionality**: By clicking one of the buttons the user can fetch the TOP 20 scores for that specific level/game from the database.


    