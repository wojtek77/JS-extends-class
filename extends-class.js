/**
 * Function for extends only one class
 * Javascript ES5 or higher
 *
 * @version 0.1 (2017-12-28)
 * @author wojtek77 <https://github.com/wojtek77>
 * @license MIT
 * @url https://github.com/wojtek77/JS-extends-class
 */
if (typeof Object.prototype.extends !== 'function') {
    /**
     * Function for extends only one class
     * @param {Function} parentClass  parent class
     * @param {Array} args  arguments for construct of class
     * @returns {undefined}
     */
    Object.prototype.extends = function (parentClass, args) {
        if (typeof this === 'function') {
            // static
            for (var st in parentClass) {
                if (this[st] === undefined) {
                    this[st] = parentClass[st];
                }
            }
        } else if (typeof this === 'object') {
            Object.setPrototypeOf(this.constructor.prototype, Object.create(parentClass.prototype));

            if (args === undefined) {
                args = [];
            }
            args.unshift(null);
            var parentObj = new (Function.prototype.bind.apply(parentClass, args))();

            // no static
            for (var p in parentObj) {
                this[p] = parentObj[p];
            }

            // static
            for (var st in parentClass) {
                if (this.constructor[st] === undefined) {
                    this.constructor[st] = parentClass[st];
                }
            }

            this.parent = parentObj;
        }
    };
}
