// Declare persister namespace
window.Persister = window.Persister || {};

(function (pullRequestsRepository, repository) {
    /**
     * Key to store and get data from
     * @type string
     */
    var key = 'pull_requests';
})(window.Persister.PullRequestsRepository = {}, window.Persister.Repository);