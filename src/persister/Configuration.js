(function (Persister) {
    // Set the object namespace
    Persister.Configuration = {};

    /**
     * Configuration cache
     * @type object
     */
    var cache = {};

    /**
     * Key to store and get data from
     * @type string
     */
    var key = 'configuration';

    /**
     * Function to define a getter, setter and isset functions for a given configuration
     * @param string configurationKey Key to be defined
     */
    function defineConfigurationKey(configurationKey)
    {
        var fnKey = configurationKey.charAt(0).toUpperCase() + configurationKey.slice(1);

        // Defined the getter
        Persister.Configuration['get' + fnKey] = function ()
        {
            var promise = new Util.Promise();

            if (!!cache[configurationKey]) {
                promise.resolve(cache[configurationKey]);
            } else {
                Persister.Repository.find(key, configurationKey)
                    .done(function (value) {
                        cache[configurationKey] = value;

                        promise.resolve(cache[configurationKey]);
                    })
                ;
            }

            return promise;
        };

        // Define the setter
        Persister.Configuration['set' + fnKey] = function (value)
        {
            cache[configurationKey] = value;

            return Persister.Repository.add(key, configurationKey, value);
        };

        // Define the isset
        Persister.Configuration['isset' + fnKey] = function ()
        {
            var promise = new Util.Promise();

            Persister.Configuration['get' + fnKey]()
                .done(function (value) {
                    promise.resolve(!!value);
                })
            ;

            return promise;
        };
    }

    // Define the configuration keys
    defineConfigurationKey('authToken');
})(window.Persister = window.Persister || {});
