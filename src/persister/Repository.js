(function (Persister, Util) {
    // Set the object namespace
    Persister.Repository = {};

    /**
     * Function to get all items under a key
     * @param  string       key Key to look for
     * @return Util.Promise     Promise object
     */
    function loadAll(key)
    {
        var promise = new Util.Promise();

        chrome.storage.sync.get(key, function (items) {
            if (items && !!items[key]) {
                promise.resolve(items[key]);
            } else {
                promise.resolve({});
            }
        });

        return promise;
    }

    /**
     * Function to get all items under a key
     * @param  string       key Key to look for
     * @return Util.Promise     Promise object
     */
    Persister.Repository.findAll = function (key)
    {
        return loadAll(key)
            .done(function (items) {
                return [Object.keys(items).map(function (index) {
                    return items[index];
                })];
            })
        ;
    };

    /**
     * Function to get a single element under a key
     * @param  string       key   Key to look for
     * @param  string       index Element to find
     * @return Util.Promise       Promise object
     */
    Persister.Repository.find = function (key, index)
    {
        return loadAll(key)
            .done(function (items) {
                if (!!items[index]) {
                    return [items[index]];
                } else {
                    return null;
                }
            })
        ;
    };

    /**
     * Function to add values under a key
     * @param  string       key   Key to store into
     * @param  mixed        index Anything that can be a key in an object
     * @param  mixed        value Any value willing to be stored
     * @return Util.Promise       Promise object
     */
    Persister.Repository.add = function (key, index, value)
    {
        var promise = new Util.Promise();

        loadAll(key)
            .done(function (items) {
                items[index] = value;

                toStore = {};
                toStore[key] = items;
                chrome.storage.sync.set(toStore, promise.resolve);
            })
        ;

        return promise;
    };

    /**
     * Function to clear all data under a key
     * @param  string       key Key to clear data for
     * @return Util.Promise     Promise object
     */
    Persister.Repository.clear = function (key)
    {
        var promise = new Util.Promise();

        chrome.storage.sync.remove(key, promise.resolve);

        return promise;
    };
})(window.Persister = window.Persister || {}, window.Util);
