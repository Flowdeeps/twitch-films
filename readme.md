# Twitch Films

## What?

It's the 16th of March 2020 and the Covid-19 virus is beginning to take hold. I'm living in Berlin and under voluntary self-isolation with my wife. Italy and Spain are fully closed. The UK is not doing enough to protect their citizens. I have written a small website that plays movies from the Internet Archive as the basis for a Twitch channel in the hope that it might engender some sort of social community where we can all hang out and chat about something other than what feels like the end of the world.

## How?

Clone this repo, start a web server in the root, open it in a browser. There are hot points in the corners for controlling playblack as I needed a minimal interface for OBS. Top left is play first film in the json, bottom left is stop, top right is next. That's it so far.

`cd ~/Projects/twitch-films && python -m http.server`
or 
`cd ~/Projects/twitch-films && npx http-server`

Any web server will work.

## Notes

Start the whole thing with a `next video` click in the top right as for some reason it will play the ads twice otherwise.

## What Next?

Bold denotes a done enough status

* __Have two json files, one for feature films, the other for cartoons and alternate between the two.__ We have three actually, an advert, a cartoon, and a feature film
* __Reload the json files after each movie file has ended so that they can be added to whilst the app is up and running.__
