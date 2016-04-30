lexer grammar XML;

fragment ELEMENT_TAG: [a-zA-Z | _][a-zA-Z | _ | \- | . | 0-9]+;

XML: '<'[xX][mM][lL] ELEMENT_TAG '>'.* {System.out.println("matching XML rule: " + getText());skip();};

ELEMENT: '<' ('/')? ELEMENT_TAG '>' {System.out.println("matching ELEMENT rule: " + getText());};

fragment SPECIALS: [\-|_|~|!|$|&|'|(|)|\*|\+|,|;|=|:];
fragment EMAIL_LOCAL:  ([a-zA-Z]|SPECIALS|[0-9]);
fragment EMAIL_DOMAIN: ([a-zA_Z]|[0-9]|'-'|'.');

EMAIL: (EMAIL_LOCAL+ ('.')? )+ '@' EMAIL_DOMAIN+ {System.out.println("matching EMAIL rule: " + getText());};

DATE: (('0'|'1')? [1-9]) '/' (('0'|'1'|'2'|'3')? [1-9]) '/' (('20' [0-9][0-9]) | ('2100')) {System.out.println("matching DATE rule: " + getText());};

PHONE: (([0-9][0-9][0-9] '-' [0-9][0-9][0-9] '-' [0-9][0-9][0-9][0-9]) | ('('[0-9][0-9][0-9]')' ' ' [0-9][0-9][0-9] '-' [0-9][0-9][0-9][0-9]) | ([0-9][0-9][0-9] ' ' [0-9][0-9][0-9] ' ' [0-9][0-9][0-9][0-9]) | ([0-9][0-9][0-9]'.'[0-9][0-9][0-9]'.'[0-9][0-9][0-9][0-9])) {System.out.println("matching PHONE rule: " + getText());};

fragment VISA_PART: '4'[0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9];
VISA: (VISA_PART [0-9][0-9][0-9]) | (VISA_PART) {System.out.println("matching VISA rule: " + getText());};

fragment MASTER_CARD_PART: [0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9];
MASTER_CARD: '5' ('1' | '2' | '3' | '4' | '5') MASTER_CARD_PART {System.out.println("matching MASTER_CARD rule: " + getText());};

fragment MURICAN_EXPRESS: [0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9];
AMERICAN_EXPRESS: '3' ('4' | '7') MURICAN_EXPRESS {System.out.println("matching AMERICAN_EXPRESS rule: " + getText());};

fragment DINERS_CLUB_PART: [0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9];
DINERS_CLUB: '3' (('0' ('0' | '1' | '2' | '3' | '4' | '5') [0-9]) | (('6' | '8') [0-9][0-9])) DINERS_CLUB_PART {System.out.println("matching DINERS_CLUB rule: " + getText());};

fragment DISCOVER_PART: '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9];
DISCOVER: (('6011') | ('65' [0-9][0-9])) DISCOVER_PART {System.out.println("matching DISCOVER rule: " + getText());};

fragment JCB_PART: '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9][0-9] '-'? [0-9][0-9][0-9];
JCB: (('2131' | '1800') JCB_PART) | ('35' [0-9][0-9] JCB_PART [0-9]) {System.out.println("matching JCB rule: " + getText());};

WS: (' '|'\t'|'\r'|'\n')+ {skip();};
