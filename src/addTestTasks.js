const initTestTasks = [
    {
        "title" : "Vestibulum ante ipsum primis in faucibus orci luctus",
        "subTitle" : "Vivamus suscipit tortor eget felis porttitor volutpat.",
        "notes": "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
        "priority": 1
    },
    {
        "title" : "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus",
        "subTitle" : "Vivamus suscipit tortor eget felis porttitor volutpat",
        "notes": "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat.",
        "priority": 2
    }    
]

export default function(store) {
    initTestTasks.forEach(task => {
        store.commit('addTask', task);
    })
};