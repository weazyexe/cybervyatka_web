export default {
    disciplines: [
        "CSGO", "DOTA2"
    ],
    maps: [
        "Dust II", "Inferno", "Nuke", "Mirage", "Train", "Overpass", "Cache"
    ],
    isFirstTeamWin: function(game) {
        let results = [];

        game.results.forEach(it => {
            let res = it.split(":");
            if (game.discipline === 'CSGO') {
                results.push({map: res[0], firstCount: parseInt(res[1]), secondCount:parseInt(res[2])});
            } else {
                results.push({firstCount: parseInt(res[0]), secondCount:parseInt(res[1])});
            }
        });

        let hasNotEndedGames = false;
        let firstCount = 0, secondCount = 0;

        // Считаем у кого больше побед
        results.forEach((it) => {
            if (parseInt(it.firstCount) > parseInt(it.secondCount)) firstCount++;
            else if (parseInt(it.firstCount) < parseInt(it.secondCount)) secondCount++;
        });

        if (firstCount + secondCount === this.game.best_of) hasNotEndedGames = false;
        else hasNotEndedGames = !(firstCount > this.game.best_of / 2 || secondCount > this.game.best_of / 2);

        if (hasNotEndedGames) {
            return "NOT_ENDED";
        }
        else {
            if (firstCount > secondCount) {
                return "FIRST_TEAM";
            } else {
                return "SECOND_TEAM";
            }
        }
    }
}