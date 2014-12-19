(function (Util) {
    // Set the object namespace
    Util.Promise = function ()
    {
        /**
         * Instance of this object
         * @type Promise
         */
        var me = this;

        /**
         * Function to call when the promise is resolved
         * @type function
         */
        var _resolvedFunctions = [];

        /**
         * Conditional function to call when failure
         * @type function[]
         */
        var _failedFunctions = {};

        /**
         * Function to call if there is no satified condition 
         * @type function
         */
        var _defaultFailedFunction = null;

        /**
         * Function to set the resolved function
         * @param function resolvedFunction Function to be executed when resolved
         * @return Promise Same object instance
         */
        me.done = function (resolvedFunction)
        {
            if (typeof resolvedFunction === 'function') {
                _resolvedFunctions.push(resolvedFunction);
            }

            return me;
        };

        /**
         * Function to set failure callbacks
         * @param string|null condition      Condition that must be satisfied to execute id
         * @param function    failedFunction Function to be executed when failed
         * @return Promise Same object instance
         */
        me.fail = function (condition, failedFunction)
        {
            if (typeof failedFunction === 'function') {
                if (condition) {
                    _failedFunctions[condition] = failedFunction;
                } else {
                    _defaultFailedFunction = failedFunction;
                }
            }

            return me;
        };

        /**
         * Call the resolved function
         */
        me.resolve = function (/* args */)
        {
            var args = Array.prototype.slice.call(arguments);
            var scope = this;

            if (_resolvedFunctions.length > 0) {
                for (var i in _resolvedFunctions) {
                    args = _resolvedFunctions[i].apply(scope, args);
                }
            } else {
                throw 'Promise: RESOLVE function called without any listener. Arguments: ' + JSON.stringify(args);
            }
        };

        /**
         * Call the failure function 
         * @param string reason Reason or condition of failure
         */
        me.reject = function (reason)
        {
            if (_failedFunctions[reason]) {
                _failedFunctions[reason](reason);
            } else if (_defaultFailedFunction) {
                _defaultFailedFunction(reason);
            } else {
                throw 'Promise: REJECT function called without any listener. Reason: ' + reason;
            }
        };

        /**
         * Function to bubble the calls
         * @param Promise promise The promise to bubble from
         */
        me.bubble = function (promise)
        {
            for (var i in _resolvedFunctions) {
                promise.done(_resolvedFunctions[i]);
            }

            for (var i in _failedFunctions) {
                promise.fail(i, _failedFunctions[i]);
            }

            if (_defaultFailedFunction) {
                promise.fail(null, _defaultFailedFunction);
            }
        }
    };

    // Include a propery into Array object as non enumerable
    Object.defineProperty(Array.prototype, 'getCombinedPromise', {
        /**
         * Function to get a combined promise from an array
         * @return Promise Combined promise
         */
        value: function () {
            var combinedPromise = new Util.Promise();
            var values = [];
            var total = this.length;
            var done = 0;

            for (var i in this) {
                var promise = this[i];
                values.push(null);

                if (promise instanceof Util.Promise) {
                    (function (promise, i) {
                        promise
                            .done(function () {
                                var args = Array.prototype.slice.call(arguments);
                                values[i] = (args.length === 1 ? args[0] : args);
                                done++;

                                if (done >= total) {
                                    combinedPromise.resolve.apply(undefined, values);
                                }
                            })
                        ;
                    })(promise, i);
                } else {
                    combinedPromise.reject('util.promise.notAPromise');
                    break;
                }
            }

            return combinedPromise;
        },
        enumerable: false
    });
})(window.Util = window.Util || {});