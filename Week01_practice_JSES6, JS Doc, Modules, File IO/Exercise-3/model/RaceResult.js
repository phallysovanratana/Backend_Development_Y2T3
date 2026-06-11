import { Duration } from "./Duration.js";

export class RaceResult {
    /**
     * @param {string} participantId 
     * @param {string} sport 
     * @param {Duration} time 
     */
    constructor(participantId, sport, time) {
        this.participantId = participantId;
        this.sport = sport;
        this.time = time;
    }
}