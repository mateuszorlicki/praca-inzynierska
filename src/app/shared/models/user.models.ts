export interface Credentials {
    email: string;
    password: string;
  }

export interface UserProfile {
    uid?: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    photoURL?: string;
    email?: string;
    roles?: Array<Roles>;
    aboutMe?: string;
}

export interface UserTraining {
    userID: string;
    trainingsIDs: Array<string>;
    userTrainingID?: string;
}

export interface UserPersonal {
    userID: string;
    trainerID: string;
    userPersonalID?: string;
}

export enum Roles {
    ADMIN = 'ADMIN',
    TRAINER = 'TRAINER',
    USER_WITH_PASS = 'USER_WITH_PASS',
    USER = 'USER',
    GUEST = 'GUEST'
}

export const GUEST_USER: UserProfile = {
    uid: '',
    displayName: '',
    photoURL: '',
    email: '',
    aboutMe: '',
    roles: [Roles.GUEST]
}