// // button Submit report
// const reportTypeList = {
//     1: {
//         title: "It's posting content that shouldn't be on Instagram",
//         subs: {
//             1: {
//                 title: "It's spam",
//             },
//             2: {
//                 title: "I just don't like it",
//             },
//             3: {
//                 title: "Suicide, self-injury or eating disorders",
//                 mustSubmit: true
//             },
//             4: {
//                 title: "Sale of illegal or regulated goods",
//                 subs: {
//                     1: {
//                         title: "Fake health documents",
//                     },
//                     2: {
//                         title: "Drugs",
//                     },
//                     3: {
//                         title: "Firearms",
//                     },
//                     4: {
//                         title: "Endangered animals",
//                     },
//                 }
//             },
//             5: {
//                 title: "Nudity or sexual activity",
//                 subs: {
//                     1: {
//                         title: "Nudity or pornography",
//                     },
//                     2: {
//                         title: "Sexual exploitation or solicitation",
//                     },
//                     3: {
//                         title: "Sharing private images",
//                     },
//                     4: {
//                         title: "Involves a child",
//                     },
//                 }
//             },
//             6: {
//                 title: "Hate speech or symbols",
//                 mustSubmit: true
//             },
//             7: {
//                 title: "Violence or dangerous organizations",
//                 subs: {
//                     1: {
//                         title: "Violent threat",
//                     },
//                     2: {
//                         title: "Animal abuse",
//                     },
//                     3: {
//                         title: "Death or severe injury",
//                     },
//                     4: {
//                         title: "Dangerous organizations or individuals",
//                     },
//                 }
//             },
//             8: {
//                 title: "Bullying or harassment",
//                 subs: {
//                     1: {
//                         title: "Me",
//                         mustSubmit: true
//                     },
//                     2: {
//                         title: "Someone I know",
//                     },
//                     3: {
//                         title: "Someone else",
//                     },
//                 }
//             },
//             9: {
//                 title: "Intellectual property violation",
//                 subs: {}
//             },
//             10: {
//                 title: "Scam or fraud",
//             },
//             11: {
//                 title: "False information",
//                 subs: {}
//             },
//         }
//     },
//     2: {
//         title: "It's pretending to be someone else",
//         subs: {
//             1: {
//                 title: "Me",
//             },
//             2: {
//                 title: "Someone I know",
//             },
//             3: {
//                 title: "A celebrity or public figure",
//             },
//             4: {
//                 title: "A business or organization",
//             },
//         }
//     }
// }

// const contentReportTypes = {
//     1: "It's spam",
//     2: "",
//     3: "",
//     4: "",
//     5: "",
//     6: "",
//     7: "",
//     8: "",
//     9: "",
//     10: "",
//     11: "",
// }

// const someoneElseReportTypes = {
//     1: "",
//     2: "",
//     3: "",
//     4: "",
// }











// const getReportTitle = async () => {
//     return new Promise((resolve, reject) => {
//         const readline = require('readline').createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         })
//         readline.question(`Choose report type:\n\n${listCommandItems(reportTypeList)}\n\nWhich one? `, data => {
//             data = parseInt(data)
//             if (!reportTypeList[data]) reject("Command not found")
//             resolve(data)
//             readline.close()
//         })
//     })
// }

// const getContentReport = async () => {
//     return new Promise((resolve, reject) => {
//         const readline = require('readline').createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         })
//         readline.question(`Choose content report:\n\n${listCommandItems(contentReportTypes)}\n\nWhich one? `, data => {
//             data = parseInt(data)
//             if (!contentReportTypes[data]) reject("Command not found")
//             resolve(data)
//             readline.close()
//         })
//     })
// }


// const getSomeoneElseReport = async () => {
//     return new Promise((resolve, reject) => {
//         const readline = require('readline').createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         })
//         readline.question(`Choose content report:\n\n${listCommandItems(someoneElseReportTypes)}\n\nWhich one? `, data => {
//             data = parseInt(data)
//             if (!someoneElseReportTypes[data]) reject("Command not found")
//             resolve(data)
//             readline.close()
//         })
//     })
// }

