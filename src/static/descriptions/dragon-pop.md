### Technologies
Vanilla JS, HTML5 Canvas

### Description
Dragon Pop is an arcade-style wave defense game built with vanilla JavaScript and HTML5 Canvas. It's inspired by a game I enjoyed playing ~15 years ago called *Bubble Trouble*. This time, instead of a pig popping bubbles with a harpoon gun, you are a dragon popping bubbles with fireballs.

This was my first time using sprite animations, which can be seen in the dragon movement, fireball movement, and fire on the ceiling. The game calculates fireball collision and bounce behavior by object type, taking into consideration object shape (ie, circles colliding with rectangles -- if all objects were treated as rectangles, there would be unsatisfying "false positive" deaths caused by the "corner" of a circular bubble).

The game recalculates object positions and checks for collision in a looping render function hooked to `requestAnimationFrame`. For more details, checkout the github repo. Otherwise, give it a play! See if you can get past level 11. 

Happy popping!
