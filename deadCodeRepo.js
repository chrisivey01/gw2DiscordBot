//
// async function messageUnverifiedUsers(message) {
//     //get roles
//     let verifiedRole = message.guild.roles.find(name => name.name === "Verified");
//     let spyRole = message.guild.roles.find(name => name.name === "Thinks They're Sneaky")
//     let commanderRole = message.guild.roles.find(name => name.name === "Commander");
//     let modedRole = message.guild.roles.find(name => name.name === "@mod");
//
//     //get all verified users on discord
//     let myScrewUp = message.guild.members.filter(member => {
//         return member.roles.find(name => name.name === "Verified")
//     })
//
//     //get all users from db
//     let selectUsersSql = 'SELECT * FROM users';
//     let result;
//     message.channel.send('Starting...')
//
//     result = await pool.query(selectUsersSql)
//
//
//     myScrewUp.forEach(function (member) {
//         let discordUserId = member.user.id;
//         let discordUser = member.user
//
//         let userToModify = client.guilds.get("476902310581239810").members.get(discordUserId)
//
//         try {
//             if (result.find(function (u) {
//                 return u.user_id === discordUserId
//             })) {
//                 userToModify.addRole(verifiedRole)
//                 userToModify.removeRole(spyRole)
//
//             } else {
//                 userToModify.removeRole(verifiedRole)
//                 userToModify.removeRole(commanderRole)
//                 userToModify.removeRole(modedRole)
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     })
//     message.channel.send('Done!')
// }
//
