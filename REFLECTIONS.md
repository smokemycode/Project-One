# Project Reflection: REST Countries API with Color Theme Switcher

## My Development Process

When I started this project, I honestly wasn't sure I could finish it. I've never considered myself a "coder"—I understand the basics of HTML and CSS, but JavaScript has always felt like a foreign language. I approached this challenge the way I'd approach assembling furniture without instructions: slowly, carefully, and with a lot of backtracking.

I broke the work into small commits, which turned out to be the smartest decision I made. Each commit handled one piece—first the structure, then the styling, then getting the data to appear, then search, then filtering, and finally the detail page. Whenever something broke, I knew which commit to revisit rather than staring at a wall of code with no idea where the problem lived.

## Challenges I Ran Into

The biggest hurdle was that the country data wasn't consistent. Some entries stored the name one way, others stored it differently, and my code kept returning blank cards or "undefined" on the screen. I spent an embarrassing amount of time wondering why nothing showed up before realizing the data didn't match what my code expected.

I also accidentally declared the same variable twice, which silently broke the entire page—no error I understood, just a blank screen. That one took me an afternoon to figure out.

The detail page was another struggle. It would only work if I clicked a country first; opening it directly gave me nothing but a loading message forever.

## Solutions That Worked

I leaned heavily on documentation and community answers. I learned to write small helper functions that checked for every possible data shape and returned a safe fallback instead of crashing. I learned to use the browser's console to print messages at each step so I could *see* where things stopped working. I combined search and filter into one function so they worked together instead of fighting each other.

## What I'd Improve

Given more time, I'd add a loading indicator, make the search feel smoother, and organize the JavaScript into smaller files. But honestly, finishing this at all feels like a win.