import test from 'tape';
import {filter} from '../src/index';

test('should return true if message sender is not on the config, but it is using *', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': 'word'
        },

        '*': '*'
    };

    const message = {

        body: 'containing a word',
        from: 'XXX1-YYY2-ZZZ3@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if message sender is not on the config, and it is not using *', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': 'word'
        }
    };

    const message = {

        body: 'containing a word',
        from: 'XXX1-YYY2-ZZZ3@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

