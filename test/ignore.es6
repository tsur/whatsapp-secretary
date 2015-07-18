import test from 'tape';
import {filter} from '../src/index';

test('should return false if message contains an ignoring word', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': 'word'
        }
    };

    const message = {

        body: 'containing a word',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return true if message does not contain an ignoring word', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': 'word'
        }
    };

    const message = {

        body: 'containing something else',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if message contains an ignoring word given as a List', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word']
        }
    };

    const message = {

        body: 'containing a word',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return true if message does not contain an ignoring word given as a List', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word']
        }
    };

    const message = {

        body: 'containing something else',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if message contains an ignoring word given as a List of words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word', 'word2']
        }
    };

    const message = {

        body: 'containing a word',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return true if message does not contain an ignoring word given as a List os words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word', 'word2']
        }
    };

    const message = {

        body: 'containing something else',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if message contains all ignoring words given as a List of words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word', 'word2']
        }
    };

    const message = {

        body: 'containing a word and word2',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});

test('should return false if message contains more than one ignoring words given as a List of words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'ignore': ['word', 'word2', 'word3']
        }
    };

    const message = {

        body: 'containing a word and word2',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.notOk(filter(message, config));

    tape.end();

});