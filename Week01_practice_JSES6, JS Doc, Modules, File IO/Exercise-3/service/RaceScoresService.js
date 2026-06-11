import fs from 'fs';
import { RaceResult } from '../model/RaceResult.js';
import { Duration } from '../model/Duration.js';

export class RaceScoresService {  // ← Class name with 's'
    constructor() {
        this._raceResults = [];
    }

    addRaceResult(result) {
        this._raceResults.push(result);
    }

    saveToFile(filePath) {
        const data = JSON.stringify(this._raceResults, null, 2);
        fs.writeFileSync(filePath, data, 'utf8');
    }

    loadFromFile(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(data);
            this._raceResults = parsed.map(item => 
                new RaceResult(
                    item.participantId, 
                    item.sport, 
                    new Duration(item.time._totalSeconds)
                )
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    getTimeForParticipant(participantId, sport) {
        const result = this._raceResults.find(
            r => r.participantId === participantId && r.sport === sport
        );
        return result ? result.time : null;
    }

    getTotalTimeForParticipant(participantId) {
        const results = this._raceResults.filter(r => r.participantId === participantId);
        
        if (results.length === 0) return new Duration(0);
        
        let total = new Duration(0);
        for (const result of results) {
            total = total.plus(result.time);
        }
        return total;
    }
}