const initTestTasks = [
    {
        "id": "1",
        "title" : "Task 1 test",
        "subTitle" : "Sub title task 1 test",
        "notes": "Notes task 1 test",
        "priority": 1,
        "archived": null,
    },
    {
        "id": "2",
        "title" : "Task 2 test",
        "subTitle" : "Sub title task 2 test",
        "notes": "Notes task 2 test",
        "priority": 2,
        "subtasks": [
            {
                "id": "4",
                "title" : "First subtask title",
                "subTitle" : "First subtask subtitle",
                "notes": "First subtask notes",
                "priority": 2,
                "archived": null,
            },            
        ],
        "archived": null,
    },
    {
        "id": "3",
        "title" : "Task 3 test",
        "subTitle" : "Sub title task 3 test",
        "notes": "Notes task 3 test",
        "priority": 3,
        "archived": true,
    }        
]

export default function(store) {
    initTestTasks.forEach(task => {
        store.commit('addTask', task);
    })
}