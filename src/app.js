// Function to fire up the application
webix.ready(function () {
    webix.ui.fullScreen();
    webix.ui(Templates.app);

    renderVariablesTab();
    renderRequestsTab();
});

function renderVariablesTab()
{
    Persister.Variables.findAll()
        .done(function (variables) {
            Templates.Variables.variablesList.data = variables;
            webix.ui(Templates.Variables.variablesList, $$('variables.variablesList'));
        })
    ;
}

function renderRequestsTab()
{
    Persister.Requests.findAll()
        .done(function (requests) {
            //Templates.Requests.requestsList.data = requests;
            webix.ui(Templates.Requests.requestsList, $$('requests.requestsList'));
        })
    ;
}

function createNewRequest()
{
    $$('requests.requestForm').show();
}