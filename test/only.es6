import test from 'tape';
import {filter} from '../src/index';

test('should return true if containing a word', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': 'word'
        }
    };

    const message = {

        body: 'containing a word',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if not containing a word', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': 'word'
        }
    };

    const message = {

        body: 'containing nothing',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return true if containing word within a list', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word']
        }
    };

    const message = {

        body: 'containing word',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return true if containing more than a word within a list', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word', 'word2']
        }
    };

    const message = {

        body: 'containing word2',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if not containing word within a list', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word']
        }
    };

    const message = {

        body: 'containing nothing',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return true if not containing more than a word within a list', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word', 'word2']
        }
    };

    const message = {

        body: 'containing nothing',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});