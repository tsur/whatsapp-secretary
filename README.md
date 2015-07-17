# Whatsapp-secretary

Tell your whatsapp secretary to just let you know about what's important for you.

Note: This is very much a work in progress. It may not work as expected.

[![Build Status](https://travis-ci.org/Tsur/whatsapp-secretary.png)](https://travis-ci.org/Tsur/whatsapp-secretary)


# Why

As a developer, I'm working too many hours with a text editor and several terminal sessions. In Europe, but specially in Spain, whatsapp is a very popular application, a must have, basically because all of your friends and relatives have it. It becomes very annoying to be interrupted every minute for some friend who has to tell me something not important and do not even say anything about all those groups chats bubbling up whatsapp notifications each 10 seconds just to end up reading nonsenses. It may be better to just disable notifications and you are done, yeah, but then you have no way to know when something you are really interesting on has been said, and even more, a context switch is required in the mind from your keyboard to the phone similar to what happens when using keyboard and mice, so with whatsapp-secretary you just need to have a look at your terminal session and do not need to be enabling/disabling notifications on your phone since whenever you start using whatsapp-secreatary, notifications will stop coming in your phone and will start coming in once you stop whatsapp-secretary.

# Setting up

```bash
npm install whatsapp-secretary --global
```

Now create a config.json file as below:

```js
{
    "PHONE_NUMBER_1": {

      "only": ["word1", "word2"]

    },

    "PHONE_NUMBER_N": {

      "ignore": ["word1", "word2"]

    },

    "GROUP_ID_1": {

      "ignore": ["word1", "word2"]

    },
    
    "GROUP_ID_N": {
    
      "only": ["word1", "word2"]
    
    },
    
    "*": "*"
}
```

And finally just run it:

```bash
whatsapp-secretary -c config.json
```

# Developers

To build the project, just make any change you need and then run:

```bash
$ npm run bundle
```

Make it sure you added some test suites into the test folder before bundling. To run your test, include it in the 
test/index.js 
file and then run it:

```bash
$ npm run test
```

