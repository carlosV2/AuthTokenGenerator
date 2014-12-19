(function (Templates) {
    /**
     * Declare variables namespace
     * @type object
     */
    Templates.Variables = {};

    /**
     * Declare request namespace
     * @type object
     */
    Templates.Requests = {};

    /**
     * App header
     * @type object
     */
    var header = {
        type:'header',
        template: '<span class="webix_icon fa-cog"></span>Auth Token Generator - Settings page'
    };

    /**
     * Variables tab
     * @type object
     */
    var variablesSettingsTab = {
        width: 250,
        header: '<span class="webix_icon fa-th-list"></span>Variables settings',
        body: {
            height: '100%',
            type: 'space',
            css: 'white_bg',
            rows: [
                {view: 'label', template: 'You can set variables to be used in your auth requests:'},
                {
                    view: 'toolbar',
                    cols: [
                        {view: 'button', type: 'iconButton', icon: 'plus', label: 'Add', width: 100},
                        {view: 'button', type: 'iconButton', icon: 'remove', label: 'Remove', width: 100, disabled: true}
                    ]
                },
                {cols: [
                    {id: 'variables.variablesList'}/*,
                    {
                        id: 'githubSettingsTab.repositoriesForm',
                        view: 'form',
                        hidden: true,
                        elements: [
                            {view: 'label', template: '<h3>Repository name</h3>', id: 'githubSettingsTab.repositoriesForm.title'},
                            {view: 'checkbox', labelRight: 'Track repository', labelWidth: 0, uncheckValue: false, checkValue: true, id: 'githubSettingsTab.repositoriesForm.tracking'},
                            {view: 'label', template: 'Select the labels used in this repository:', hidden: true, id: 'githubSettingsTab.repositoriesForm.labels.label'},
                            centerContent({
                                view: 'label',
                                label: '<span class="webix_icon fa-circle-o-notch fa-spin big_spin"></span>',
                                width: 45,
                                height: 45,
                            }, 'githubSettingsTab.repositoriesForm.labels.labelsList', true)
                        ]
                    }*/
                ]}
            ]
        }
    };

    /**
     * Requests tab
     * @type object
     */
    var requestsSettingsTab = {
        width: 250,
        header: '<span class="webix_icon fa-exchange"></span>Requests settings',
        body: {rows: [{
            view: 'multiview',
            height: '100%',
            type: 'space',
            css: 'white_bg scrollable',
            cells: [
                {
                    id: 'requests.main',
                    type: 'space',
                    css: 'white_bg',
                    rows: [
                        {cols: [
                            {view: 'label', template: 'You can set the requests needed to get the auth token:'},
                            {view: 'button', type: 'iconButton', icon: 'plus', label: 'Add', width: 75, click: 'createNewRequest'}
                        ]},
                        {id: 'requests.requestsList'}
                    ]
                },
                {
                    id: 'requests.requestForm',
                    view: 'form',
                    height: '100%',
                    elements: [
                        {view: 'label', template: 'You can use anywhere the variables previously defined by typing them like <strong>$variable_name$</strong>.'},
                        {view: 'text', label: 'URL:'},
                        {view: 'label', template: 'Request headers:'},
                        {
                            view: 'toolbar',
                            cols: [
                                {view: 'text', placeholder: 'Header name', width: 170},
                                {view: 'text', placeholder: 'Header value'},
                                {view: 'button', type: 'iconButton', icon: 'plus', label: 'Add', width: 75}
                            ]
                        },
                        {
                            view: 'list',
                            template: '#_name#: #_value#',
                            data: [],
                            select: true
                        },
                        {view: 'textarea', height: 200, label: 'Payload:', labelPosition: 'top'},
                        {cols: [
                            {gravity: 6},
                            {view: 'button', type: 'iconButton', icon: 'remove', label: 'Cancel', click: '$$("requests.main").show()'},
                            {view: 'button', type: 'iconButton', icon: 'save', label: 'Save'}
                        ]}
                    ]
                }
            ]
        }]}
    };

    /**
     * Extension tab
     * @type object
     */
    var extensionSettingsTab = {
        width: 250,
        header: '<span class="webix_icon fa-cogs"></span>Extension settings',
        body: {
            rows: [{view: 'label', template: 'Extension'}]
        }
    };

    /**
     * App settings panel
     * @type object
     */
    var settings = {
        view: 'tabview',
        cells: [/*variablesSettingsTab,*/ requestsSettingsTab, extensionSettingsTab]
    };

    /**
     * Main app structure
     * @type object
     */
    Templates.app = {
        type: 'space',
        height: '100%',
        rows: [header, settings]
    };

    /**
     * Variables list
     * @type object
     */
    Templates.Variables.variablesList = {
        view: 'list',
        height: '100%',
        template: '#_name#',
        data: [],
        select: true
    };

    /**
     * Requests list
     * @type object
     */
    Templates.Requests.requestsList = {
        view: 'list',
        height: '100%',
        template: '#_name#',
        data: [{_name: 'Test'}],
        select: true
    };
})(window.Templates = {});