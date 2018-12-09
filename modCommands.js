async function messageServerMates(message){
    if(message.member.roles.find("name", "@mod") || message.member.roles.find("name", "Chris") ||
        message.member.roles.find("name", "@admin") ){

        let sql = "SELECT user_id, api_key FROM users WHERE on_yaks=?"
        let result;
        let linkNumber = 3
        result = await pool.query(sql,[linkNumber])

        message.channel.send('Give me a moment... messaging server mates')
        for (let i = 0; i < result.length; i++) {
            await fetchBulk(result[i].api_key)
            if(worldCheck.world === linkedServerID){
                let userId = result[i].user_id
                // let mate = message.guild.members.find('id',userId)
                let mate = message.guild.members.find(id => id.id === userId)
                try {
                    mate.send('Like what we do on YB? Msg DK or Chris for help on xfering! It was a pleasure playing with you.')
                }catch(err){
                    console.log(err)
                }
            }
        }
        message.channel.send('Done!')
    }else{
        message.channel.send('You do not have access to this!')
    }
}