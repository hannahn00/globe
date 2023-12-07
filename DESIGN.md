There are 2 main technical portions of the website: the iframes and the globe.

Starting with the globe, the basic structure and labels were creating using JavaScript and a library called Globe.GL (https://github.com/vasturiano/globe.gl/blob/master/example/world-cities/index.html). I commented the portion of lines used in script.js. Those lines created a globe that can be dragged around with label markers based off a JSON file I found (https://gist.github.com/magamig/a8c0833418fbafd2faa6cfcf9078322c) of the 7 wonders of the world. I used an open source images for the Earth wrapper and the night sky background. I then tweaked some aspects to change the look of the globe and to fit the globe window into my HTML (and to match the JSON I used).

I then created 2 functions; the first one finds the coordinates of that landmark and the second one switches the point of view of the globe so that that point is in the center. I called these functions for a portion of my code dedicated to clicking a landmark. I also made it so when you click a dot, the globe is zoomed in and the background changes to the corresponding 360 degree image of the landmark. The info section in index.html scrolls to that landmark's iframe. I thought the movement of the iframes would look better designed than an immediate switch.

For the rest of the site, it was HTML, CSS, and JavaScript. All of the images are in the img folder in the templates folder. The site design is black and green for a cool design. There's instructions on the bottom and the title lined up with the info section. There's a button in the top left corner to reset ("HOME") to original formatting. I removed the ability to scroll the info-section to fully use the dots for movement. Each iframe (7 for the 7 wonders) has it's own html file (located in templates). I used JavaScript for forms (multiple choice and free response). The rest are html for uploading images, videos, and text. 