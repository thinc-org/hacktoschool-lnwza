export class UserEntity {
    ouid: string
    name: string
    roles: string
    photoURL: string
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}