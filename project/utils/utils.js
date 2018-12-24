const serviceCalls = require("../services/serviceCalls");


module.exports = {

//for character equipments

    equipFilter (equip) {
        let name;
        let stats;
        let id;
        let equipArray = [];
        if (equip.length > 0) {
            if (equip[0].hasOwnProperty("name")) {
                equipArray.push(equip[0].name)
                if (equip[0].stats.length) {
                    for (let i = 0; i < equip[0].stats.length; i++) {
                        let modifier = equip[0].stats[i].modifier
                        let attribute = equip[0].stats[i].attribute

                        equipArray.push(`${attribute} ${modifier}`)
                    }
                } else {
                    let statKeys = Object.keys(equip[0].stats.attributes)
                    let statValues = Object.values(equip[0].stats.attributes)

                    for (let i = 0; i < statKeys.length; i++) {
                        equipArray.push(`${statKeys[i]} ${statValues[i]}  `)
                    }
                }
            }
        }

        return equipArray.toString()
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



//

}