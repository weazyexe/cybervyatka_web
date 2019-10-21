export default {
    // TODO: для доты и кс поменять правила
    pushNext(winner, loser, from) {
        let winnerTo = -1, loserTo = -1;

        switch (from) {
            case 1: {
                winnerTo = 0;
                loserTo = 2;
                break;
            }
            case 2: {
                winnerTo = 0;
                break;
            }
            case 3: {
                winnerTo = 1;
                loserTo = 6;
                break;
            }
            case 4: {
                winnerTo = 1;
                loserTo = 7;
                break;
            }
            case 5: {
                winnerTo = 2;
                break;
            }
            case 6: {
                winnerTo = 5;
                break;
            }
            case 7: {
                winnerTo = 5;
                break;
            }
            case 8: {
                winnerTo = 6;
                break;
            }
            case 9: {
                winnerTo = 7;
                break;
            }
        }

        return {
            winnerTo: winnerTo,
            loserTo: loserTo
        };
    }
}
