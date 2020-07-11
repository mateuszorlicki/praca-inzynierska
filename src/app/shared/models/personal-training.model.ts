
export interface PersonalTrainingEvent {
    eventID?: string;
    dateStart: string;
    dateEnd: string;
    isAccepted: boolean;
    titleForTrainer: string;
    titleForUser: string;
    userID: string;
    trainerID: string;
}