grammar Lab10;

@header {
  import java.util.*;
}

@members {
  Stack<Integer> intS = new Stack<Integer>();
  Stack<Boolean> boolS = new Stack<Boolean>();
}

start: ( ( math_expr | relation_expr | logic_expr )+ ';' 
       { if ( !intS.empty() ) System.out.println(intS.pop()); else if ( !boolS.empty() ) System.out.println(boolS.pop()); }
       )+;

math_expr: ('+') { int a = intS.pop(); int b = intS.pop(); int c = b+a; intS.push(c); }
      | ('-') { int a = intS.pop(); int b = intS.pop(); int c = b-a; intS.push(c); }
      | ('*') { int a = intS.pop(); int b = intS.pop(); int c = b*a; intS.push(c); }
      | ('/') { int a = intS.pop(); int b = intS.pop(); int c = b/a; intS.push(c); }
      | ('%') { int a = intS.pop(); int b = intS.pop(); int c = b%a; intS.push(c); }
      | INT { intS.push($INT.int); /*System.out.println($INT.int);*/ }
      ;

logic_expr: ('&&') { boolean a = boolS.pop(); boolean b = boolS.pop(); boolean c = b&&a; boolS.push(c); }
      | ('||') { boolean a = boolS.pop(); boolean b = boolS.pop(); boolean c = b||a; boolS.push(c); }
      | ('!') { boolean a = boolS.pop(); boolean b = !a; boolS.push(b); }
      | BOOLEAN { boolS.push(Boolean.parseBoolean($BOOLEAN.text)); /*System.out.println(Boolean.parseBoolean($BOOLEAN.text));*/ }
      ;

relation_expr: ('<') { int a = intS.pop(); int b = intS.pop(); boolean c = b<a; boolS.push(c); }
      | ('<=') { int a = intS.pop(); int b = intS.pop(); boolean c = b<=a; boolS.push(c); }
      | ('==') { int a = intS.pop(); int b = intS.pop(); boolean c = b==a; boolS.push(c); }
      | ('!=') { int a = intS.pop(); int b = intS.pop(); boolean c = b!=a; boolS.push(c); }
      | ('>')  { int a = intS.pop(); int b = intS.pop(); boolean c = b!=a; boolS.push(c); }
      | ('>=') { int a = intS.pop(); int b = intS.pop(); boolean c = b!=a; boolS.push(c); }
      ;

INT: [0-9]+ ;
BOOLEAN: 'true' | 'false' ;
WS: [ \r\t\n]+ -> skip ;
