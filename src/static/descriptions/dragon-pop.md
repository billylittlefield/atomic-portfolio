Dragon Pop is an arcade-style wave defense game I built using vanilla JavaScript and HTML5 Canvas. It's inspired by a game I enjoyed playing maybe 15 years ago called Bubble Trouble. This time, instead of a pig popping bubbles with a harpoon gun, you play as a dragon popping bubbles with fireballs.

This was my first time playing around with sprite animations, which can be seen as the dragon walks side to side, as well as the fireballs and fire on the ceiling. The game calculates fireball collision and bounce behavior by object type, taking into consideration object shape (otherwise, if all objects were treated as boxes, there would be the chance for unsatisfying "false positive" deaths on the "corner" of a circular bubble).

The game recalculates object positions and checks for collision in a looping render function hooked to `requestAnimationFrame`. For more details, checkout the github repo. Otherwise, give it a play! See if you can get past level 11. 

Happy popping!
