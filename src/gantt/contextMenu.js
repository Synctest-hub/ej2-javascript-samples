this.default = function () {
    var ganttChart = new ej.gantt.Gantt({
        dataSource: window.editingData,
        dateFormat: 'MMM dd, y',
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentId',
            notes: 'info',
            resourceInfo: 'resources'
        },
        allowSorting: true,
        editSettings: {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        },
        toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
        allowSelection: true,
        gridLines: 'Both',
        height: '650px',
        rowHeight:46,
        taskbarHeight:25,
        treeColumnIndex: 1,
        resourceFields: {
            id: 'resourceId',
            name: 'resourceName'
        },
        resources: editingResources,
        highlightWeekends: true,
        timelineSettings: {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        },
        allowResizing: true,
        columns: [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor' }
        ],
        labelSettings: {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        },
        splitterSettings: {
            position: "35%"
        },
        editDialogFields: [
            { type: 'General', headerText: 'General' },
            { type: 'Dependency' },
            { type: 'Resources' },
            { type: 'Notes' },
        ],
        enableContextMenu: true,
        contextMenuItems: ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
            'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert', 'Indent', 'Outdent',
            { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
            { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
        ],
        contextMenuClick: function (args) {
            var record = args.rowData;
            if (args.item.id === 'collapserow') {
                ganttChart.collapseByID(Number(record.ganttProperties.taskId));
            }
            if (args.item.id === 'expandrow') {
                ganttChart.expandByID(Number(record.ganttProperties.taskId));
            }
        },
        contextMenuOpen: function (args) {
            var record = args.rowData;
            if (args.type !== 'Header' && record) {
                if (!record.hasChildRecords) {
                    args.hideItems.push('Collapse the Row');
                    args.hideItems.push('Expand the Row');
                } else {
                    if(record.expanded) {
                        args.hideItems.push('Expand the Row');
                    } else {
                        args.hideItems.push('Collapse the Row');
                    }
                }
            }
        },
        projectStartDate: new Date('03/25/2025'),
        projectEndDate: new Date('09/01/2025')
    });
    ganttChart.appendTo('#ContextMenu');
};
