const serviceCalls = require("../services/serviceCalls");


module.exports = {

//for character equipments

    equipFilter(equip) {
        let equipArray = "";
        if (equip) {
            if (equip.hasOwnProperty("name")) {
                equipArray += equip.name + ": "
                if (equip.stats) {
                    if (equip.stats.length) {
                        for (let i = 0; i < equip.stats.length; i++) {
                            let modifier = equip.stats[i].modifier
                            let attribute = equip.stats[i].attribute

                            let stats = attribute + " " + modifier + " "
                            equipArray += stats
                        }
                    } else {
                        let statKeys = Object.keys(equip.stats.attributes)
                        let statValues = Object.values(equip.stats.attributes)

                        for (let i = 0; i < statKeys.length; i++) {
                            let stats = statKeys[i] + " " + statValues[i] + " "

                            equipArray += stats
                        }
                    }
                }
            }
        } else {
            let blank = ''
            equipArray += blank
        }
        return equipArray
    },

    getGearsWithoutStats(characterGearNowWithStats, characterEquipWithoutStatsIds) {
        return serviceCalls.gearCheck(characterEquipWithoutStatsIds.toString())
            .then(results => {
                results.forEach(eq => {
                    let equipment = {}
                    equipment.id = eq.id
                    equipment.slot = eq.details.type
                    if (eq.details.hasOwnProperty("infix_upgrade")) {
                        equipment.stats = eq.details.infix_upgrade.attributes
                    }
                    equipment.name = eq.name
                    characterGearNowWithStats.push(equipment)
                })
                return characterGearNowWithStats
            })
            .catch(error => {
                console.log(error)
            })
    },

    async getGearNames(charInfo) {
        if (charInfo.length > 0) {
            for (let i = 0; i < charInfo.length; i++) {
                await serviceCalls.gearCheck(charInfo[i].id)
                    .then(results => {
                        charInfo[i].name = results[0].name
                    })
            }
            return charInfo
        }
    },

//END CHARACTER EQUIPMENT


//BEGIN CHARACTER TRAITS
// https://api.guildwars2.com/v2/traits?ids=581,582
// https://api.guildwars2.com/v2/characters/Chris%20Goes%20Deep/specializations?access_token=9F1DA7B3-F32A-024F-B76A-7A496E9A207F7EAF1AF3-DB60-493B-B4E5-5503BA064F6B
}