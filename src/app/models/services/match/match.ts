export class Match {
    id: string;
    name: string;
    homeTeamId: number;
    awayTeamId: number;
    homeTeam: string;
    awayTeam: string;
    utcDate: Date;
    scoreWinner: string;
    scoreHomeTeam: number;
    scoreAwayTeam: number;
    season: string;
    status: string;
    homeTeamLogo: Blob;
    awayTeamLogo: Blob;
}
