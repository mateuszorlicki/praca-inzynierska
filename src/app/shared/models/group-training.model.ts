export interface GroupTraining {
    groupID: string;
    trainerID: string;
    roomID: string;
    name: string;
    color: string;
}

export interface GroupTrainingToDisplay {
    groupID: string;
    trainer: string;
    room: string;
    color: string;
    name: string
}

export interface GroupTrainingEvent {
    eventID?: string;
    hourStart: string;
    hourEnd: string;
    title: string;
    color: string;
    byweekday: number;
    groupID: string;
}