import test from 'tape';
import {filter} from '../src/index';

test('should return true if message contains the given word', tape => {

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

test('should return false if message does not contain the given word', tape => {

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

test('should return true if message contains the given word as a list', tape => {

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

test('should return true if message contains at least one of the given words', tape => {

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

test('should return true if message contains more than one of the given words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word', 'word2', 'word3']
        }
    };

    const message = {

        body: 'containing word and word2',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return true if message contains all of the given words', tape => {

    const config = {

        'XXX-YYY-ZZZ': {

            'only': ['word', 'word2', 'word3']
        }
    };

    const message = {

        body: 'containing word,word2 and word3',
        from: 'XXX-YYY-ZZZ@s.whatsapp.net'

    };

    tape.ok(filter(message, config));

    tape.end();

});

test('should return false if message does not contain the given word as a list', tape => {

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

test('should return false if message does not contain any of the given words', tape => {

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