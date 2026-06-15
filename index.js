const originalVersion = {
    user: {
        id: 1,
        name: "John",
        age: 28,
        address: {
            city: "Delhi",
            country: "India"
        },
        skills: ["JavaScript", "React"]
    },
    settings: {
        theme: "light",
        notifications: true
    }
};

const updatedVersion = {
    user: {
        id: 1,
        name: "John Doe",
        age: 29,
        address: {
            city: "Bangalore",
            country: "India",
            pincode: "560001"
        },
        skills: ["JavaScript", "React", "TypeScript"]
    },
    settings: {
        theme: "dark"
    },
    permissions: {
        admin: true
    }
};

function objectChanges(oldObj, newObj) {
    const changes = []
    function compare(oldVal, newVal, path = []) {
        // const allKeys = new Set(
        // oldVal,newVal    
    // )


        for (key loop)
        {
            if(typeof value of key === 'object'){
                    compare()
            }
                else if (JSON.stringify(old value of th key) !== JSON.stringify(new value of obj) ){
                    for (let i=0 )
                }
        }
    }

}



// [
//     {
//       type: "update",
//       path: "user.name",
//       oldValue: "John",
//       newValue: "John Doe"
//     },
//     {
//       type: "update",
//       path: "user.age",
//       oldValue: 28,
//       newValue: 29
//     },
//     {
//       type: "update",
//       path: "user.address.city",
//       oldValue: "Delhi",
//       newValue: "Bangalore"
//     },
//     {
//       type: "add",
//       path: "user.address.pincode",
//       value: "560001"
//     },
//     {
//       type: "add",
//       path: "user.skills[2]",
//       value: "TypeScript"
//     },
//     {
//       type: "update",
//       path: "settings.theme",
//       oldValue: "light",
//       newValue: "dark"
//     },
//     {
//       type: "remove",
//       path: "settings.notifications",
//       oldValue: true
//     },
//     {
//       type: "add",
//       path: "permissions",
//       value: {
//         admin: true
//       }
//     }
//   ];







// const comments = [
//     {
//         id: 1,
//         text: "Root Comment 1",
//         replies: [
//             {
//                 id: 2,
//                 text: "Reply 1",
//                 replies: [
//                     {
//                         id: 4,
//                         text: "Reply 1.1",
//                         replies: [
//                             {
//                                 id: 8,
//                                 text: "Reply 1.1.1",
//                                 replies: []
//                             }
//                         ]
//                     },
//                     {
//                         id: 5,
//                         text: "Reply 1.2",
//                         replies: []
//                     }
//                 ]
//             },
//             {
//                 id: 3,
//                 text: "Reply 2",
//                 replies: [
//                     {
//                         id: 6,
//                         text: "Reply 2.1",
//                         replies: []
//                     },
//                     {
//                         id: 7,
//                         text: "Reply 2.2",
//                         replies: [
//                             {
//                                 id: 9,
//                                 text: "Reply 2.2.1",
//                                 replies: []
//                             },
//                             {
//                                 id: 10,
//                                 text: "Reply 2.2.2",
//                                 replies: []
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 11,
//         text: "Root Comment 2",
//         replies: [
//             {
//                 id: 12,
//                 text: "Reply 3",
//                 replies: []
//             }
//         ]
//     }
// ];


// function getDepth(node) {
//     if (!node.replies?.length) return 0;
//     return 1 + Math.max(...node.replies.map(reply => getDepth(reply)))
// }

// function descendantCount() {

// }

// function getStats(node) {
//     let depth = 0
//     for (const reply of node.replies) {
//         const childS = getStats(reply)
//         depth = Math.max(depth, childS.depth + 1)
//     }


//     return {
//         id: node.id,
//         depth,
//         // ...
//     }
// }


// console.log(comments.map(getStats));



//   output:

//   [
//     { id: 1, depth: 0, descendantCount: 9 },
//     { id: 2, depth: 1, descendantCount: 3 },
//     { id: 4, depth: 2, descendantCount: 1 },
//     { id: 8, depth: 3, descendantCount: 0 },
//     { id: 5, depth: 2, descendantCount: 0 },
//     { id: 3, depth: 1, descendantCount: 4 },
//     { id: 6, depth: 2, descendantCount: 0 },
//     { id: 7, depth: 2, descendantCount: 2 },
//     { id: 9, depth: 3, descendantCount: 0 },
//     { id: 10, depth: 3, descendantCount: 0 },
//     { id: 11, depth: 0, descendantCount: 1 },
//     { id: 12, depth: 1, descendantCount: 0 }
//   ];


















// console.log("A");

// Promise.resolve().then(() => {
//   console.log("B");

//   Promise.resolve().then(() => {
//     console.log("C");
//   });

//   setTimeout(() => {
//     console.log("D");
//   }, 0);
// });

// setTimeout(() => {
//   console.log("E");

//   Promise.resolve().then(() => {
//     console.log("F");
//   });

// }, 0);

// console.log("G");



//outout: A B C G D F E