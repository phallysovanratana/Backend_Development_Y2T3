import { RaceScoresService } from "./service/RaceScoresService.js";  // ← Add the 's'

const raceManager = new RaceScoresService();  // ← Add the 's'
raceManager.loadFromFile("./data/raceScores.json");

const time1 = raceManager.getTimeForParticipant('participant1', 'swim');
if (time1) {
    console.log("participant1 swim time:");
    time1.toString();
}

const totalTime1 = raceManager.getTotalTimeForParticipant('participant1');
console.log("participant1 total time:");
totalTime1.toString();