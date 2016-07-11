# Soundcloud Slash Command for Mixmax

This is an open source Mixmax Slash Command. See <http://sdk.mixmax.com/docs/tutorial-giphy-slash-command> for more information about how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead?text=<track name>
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=<track name>
```

## What does it do?

It allwos you to search for a Soundcloud track by doing: ````/soundcloud [trackname]````. It the shows a drop down list with the top ten tracks that match your search. Clicking on one them will leave a link to the actual Soundcloud track.

## How does it work?

During the typeahead phase, all requests are made to the Soundcloud Search API to fetch the top 10 results fitting your query. 

Once you select one of the tracks, it ends up passing to the resolver a ```trackID```. This property is used to call the Soundcloud tracks API to get more details about the specific track you selected. 

## Setup

For this to work you need to register your app on Soundcloud and obtain a Client ID. You can register your app here <http://soundcloud.com/you/apps> (Note: you must have a Soundcloud account or login through Facebook/Google)

Once you have your API Client ID, just paste it in ```./utils/key.js```.

This API also assumes you're running a secure http connection. Read <https://www.sitepoint.com/how-to-use-ssltls-with-node-js/> for more information on how to use https with nodejs.

## How to add to Mixmax?

Begin by going to your Mixmax settings page, then in Interactions, under Slash Commands add a slash command with the following values:

__Name__ : Soundcloud track<br>
__Command__ : soundcloud<br>
__Parameter Placeholder__: [search track]<br>
__Command Parameter Suggestions API URL__ : https://localhost:9145/typeahead<br>
__Command Parameter Resolver API URL__ : https://localhost:9145/resolver<br>