'use strict';

if (typeof Object.prototype.extends !== 'function') {
    /**
     * Function for extends only one class
     * @param {Function} parentClass  parent class
     * @param {Array} args  arguments for construct of class
     * @returns {undefined}
     */
    Object.prototype.extends = function (parentClass, args) {
        this.prototype = Object.create(parentClass.prototype);
        this.prototype.constructor = this.constructor;

//        var parentObj = new parentClass(...args);
        args.unshift(null);
        var parentObj = new (Function.prototype.bind.apply(parentClass, args))();

        // no static
//        Object.assign(this, parentObj);
        for (var p in parentObj) {
            this[p] = parentObj[p];
        }

        // static
//    var ns = Object.getOwnPropertyNames(parentClass);
//    for (var k in ns) {
//        if (typeof parentClass[ns[k]] === 'function') {
//            this.constructor[ns[k]] = parentClass[ns[k]];
//        }
//    }
////    var all = Object.getOwnPropertyNames(parentClass)
////            .filter(prop => typeof parentClass[prop] === 'function');
////    console.log(all);
        for (var st in parentClass) {
            if (this.constructor[st] === undefined) {
                this.constructor[st] = parentClass[st];
            }
        }

        this.parent = parentObj;
    };
}


function A(val1, val2) {

    this.val1 = val1;
    this.val2 = val2;

    this.function1 = function () {
        console.log(this.constructor.name + '::function1() ' + (this.val1 + this.val2));
    }

    this.function2 = function () {
        console.log(this.constructor.name + '::function2()');
    }

}
A.staticFunction = function () {
    console.log('A static function');
};

function B(val) {
    this.extends(A, [val, val]);

    this.function1 = function () {
        // call parent function
        this.parent.function1();
        console.log(this.constructor.name + '::function1() ' + (this.val1 + this.val2));
    }
}
B.staticFunction = function () {
    // call parent static function
//    A.staticFunction();
    console.log('B static function');
};

var b = new B(1);
b.function1();
B.staticFunction();

//function C(val1, val2) {
//    this.extends(B, [val1]);
//    this.val2 = val2;
//}
//
////var c = new C(0, 1);
////c.function1();
//
//function D(val1, val2, val3) {
//    this.extends(C, [val1, val2]);
//    this.val2 = val3;
//}
//
//var d = new D(0, 1, 2);
//d.function1();
