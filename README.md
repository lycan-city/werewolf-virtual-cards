# Werewolf Virtual Cards

**Werewolf Virtual Cards** (WWVC) is a mobile app for playing the party card game
[Ultimate Werewolf](https://en.wikipedia.org/wiki/Ultimate_Werewolf 'Wikipedia'). It uses
the JavaScript library [Werewolf Brain](https://github.com/lycan-city/werewolf-brain) for
the creation of _scenarios_.

The app lets you create a party to moderate the game, which the players can join scanning
the party's QR code or typing it in the field. While players are joining the party, the
moderator can prepare a desire game choosing which cards will be available and the max
amount for each. When the game starts, the app will take the deck, shuffle it, balanced,
distribute it to the players and handle the moderator for the corresponding _scenario_
script and players info.

## Getting Started

Prepare your environment according to the
[Expo's official documentation](https://docs.expo.io/versions/latest/introduction/installation/).
You will have the ability to run it using your mobile device and simulators with the Expo Client.

Second, as WWVC uses Firebase, you need to configure your **.env** file, feel free to use the
**.env.example** file as a guide. In the Firebase Storage create a folder "cards/" to set your
cards designs, create one for each role, save it using the role key and the jpeg extension
(_e.g., werewolf.jpeg_) there are two examples in the assets folder, _werewolf.jpeg_, and
_villager.jpeg_.

Once you are ready, run the app:

```
yarn start
```

## Playing with WWVC

Set your name and create a party, invite the players to type their names and join scanning or
placing the party code. If you want to start a game using the defaults (werewolves vs. villagers,
English) press Start after all the players are ready, in case of adding new roles to the game or
language change select prepare to set it and the desired deck (check the
[Werewolf Brain templates](https://github.com/lycan-city/werewolf-brain#templates)) when ready press
the done button.

Once the game started players see their roles touching the card to flip it, the moderator use the
script for the calls at night and the kills the players according to game actions (killed by
werewolves or lynched during the day) with the option in the bottom end the game to send everybody
to the Party View.

![demo](https://user-images.githubusercontent.com/6082977/53316847-c48c5f00-389f-11e9-82d9-f3db20c51293.gif)
