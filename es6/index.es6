import whatsapi from 'whatsapi';
import moment from 'moment';

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

            if (error) throw new Error('Could not login in');

            wa.sendIsOnline();

            wa.on('receivedMessage', fn);

        });
    });

    process.on('SIGINT', _ => wa.disconnect());
    process.on('exit', _ => wa.disconnect());
}

export function listen(config){

    return message => display(filter(message, config));
}

function display(message){

    if(message) print(message);
}

function print(message){

    const date = getDate(message);
    const text = getText(message);
    const author = getAuthor(message);

    console.log(`[${date}] ${author} says: ${text}`);
}

function getText(message){

    return message.body;
}

function getDate(message){

    return moment(message.date).format('DD-MM, HH:mm:ss');
}

function getAuthor(message){

    return message.author || message.notify || getSenderPhone(message);
}

function getSenderPhone(message){

    return (message.from || '').replace(/\@.*$/, '');
}

function filter(message, config){

    return !message ? false : dispatch(getRules(getSenderPhone(message), config), message)
}

function getRules(from, config){

    return config[from] || config['*'];
}

function dispatch(rules, message){

    if(!rules) return false;

    return message;

}