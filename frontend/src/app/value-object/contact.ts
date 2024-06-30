export class Contact {
    constructor(
        public id: number | null,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public email: string
    ) {}
}