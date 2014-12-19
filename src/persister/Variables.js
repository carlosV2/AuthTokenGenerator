(function (Persister, Util) {
    // Set the object namespace
    Persister.Variables = {};

    /**
     * Key to store and get data from
     * @type string
     */
    var key = 'variables';

    /**
     * Function to load all the variables
     * @return Util.Promise Promise object
     */
    Persister.Variables.findAll = function ()
    {
        return Persister.Repository.findAll(key);
    };

    /**
     * Function to save the repository entity
     * @param  Entity.Repository repository Repository object to save
     * @return Util.Promise Promise object
     */
    /*Persister.Variables.save = function (repository)
    {
        if (!repository.getId()) {
            repository.setId(Util.UUID.generate());
        }

        return Persister.Repository.add(key, repository.getId(), repository);
    };*/
})(window.Persister = window.Persister || {}, window.Util);