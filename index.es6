import whatsapi from 'whatsapi';

const wa = whatsapi.createAdapter({
    msisdn: '', // phone number with country code
    username: '', // your name on WhatsApp
    password: '', // WhatsApp password
    ccode: '' // country code
});

wa.connect(function connected(err) {
    if (err) { console.log(err); return; }
    console.log('Connected');
    // Now login
    wa.login(logged);
});

function logged(err) {
    
    if (err) { console.log(err); return; }
    console.log('Logged in to WA server');
    wa.sendIsOnline();

    wa.on('receivedMessage', function(message) {
      console.log(message.body);
    });
}
