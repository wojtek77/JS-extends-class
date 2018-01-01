# JS-extends-class
Function for extends only one class (Javascript ES5 or higher)

# Examples

### Example at start
```javascript
function A() {}
function B() {
    this.extends(A);
}
function C() {
    this.extends(B);
}
var c = new C();
console.log(c instanceof C); // true
console.log(c instanceof B); // true
console.log(c instanceof A); // true
```


### Example with more advanced constructor
```javascript
function A() {
    /* start of constructor */
    
    console.log('A::constructor');
    
    this.anyFunction = function () {
        console.log('A::anyFunction');
    }
    this.anyFunction();
    
    /* end of constructor */
}
function B() {
    /* start of constructor */
    
    // it should be first in the constructor
    this.extends(A);
    
    console.log('B::constructor');
    
    this.anyFunction = function () {
        console.log('B::anyFunction');
    }
    this.anyFunction();
    
    /* end of constructor */
}
new B();
```

### Example with parameters
```javascript
function A(val1, val2) {
    this.val1 = val1
    this.val2 = val2
    this.function1 = function () {
        console.log('A::function1 val1+val2: ' + (this.val1 + this.val2));
    };
}
function B(val) {
    this.extends(A, [val, val]);
}
var b = new B(1);
b.function1();
```


### Example with "private" and "public"
```javascript
function A() {
    // private property
    var val1 = 1;
    
    // public property
    this.val2 = 2;
    
    this.function1 = function () {
        console.log('Private propery: ' + val1);
        console.log('Public propery: ' + this.val2);
    };
}

function B() {
    // B extends A
    this.extends(A);
    
    this.val2 = 3;
}

var a = new A();
console.log(a.val1); // undefined (because of private)
console.log(a.val2); // 2
a.function1();

var b = new B();
console.log(b.val1); // undefined (because of private)
console.log(b.val2); // 3
b.function1();
```


### Example with "parent"
```javascript
function A() {
    this.function1 = function () {
        console.log('A::function1');
    }
}
function B() {
    this.extends(A);
    this.function1 = function () {
        this.parent.function1();
        console.log('B::function1');
    }
}
var b = new B();
b.function1();
```


### Example with static function without create child object
```javascript
function A() {};
A.staticFunction = function () {
    console.log('A static function');
};
function B() {};
B.extends(A);
//B.staticFunction = function () {
//    // call parent static function
//    A.staticFunction();
//    this.parentClass.staticFunction();
//
//    console.log('B static function');
//}
B.staticFunction();
```


### Example with static function with create child object
```javascript
function A() {};
A.staticFunction = function () {
    console.log('A static function');
};
function B() {
    this.extends(A);
};
var b = new B();
// any code
B.staticFunction();
```
