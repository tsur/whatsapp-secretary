import whatsapi from 'whatsapi';


export function login(credentials, fn){

    const wa = whatsapi.createAdapter({
        msisdn: credentials.phone, // phone number with country code
        username: credentials.username, // your name on WhatsApp
        password: credentials.password, // WhatsApp password
        ccode: credentials.ccode // country code
    });

    wa.connect(error => {

        if (error) throw new Error('Could not connect');

        // Now login
        wa.login(error => {

            if (error) throw new Error('Could not connect');

            wa.sendIsOnline();

            wa.on('receivedMessage', fn);
        });
    });
}

export function listen(config){

    return message => display(filter(message, config));
}

function display(message){

    if(message) print(message);
}

function print(message){

    console.log(getText(message));
}

function getText(message){

    return message.body;
}

function filter(message, config){

    return !message ? false : dispatch(getRules(getSender(message), config), message)
}

function getSender(message){

    return message.from;
}

function getRules(from, config){

    return config[from.replace(/\@.*$/, '')] || config['*'];
}

function dispatch(rules, message){

    if(!rules) return false;

    console.log(rules, message);

}