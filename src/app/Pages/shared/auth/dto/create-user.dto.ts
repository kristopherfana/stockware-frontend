export class CreateUserDto {
    email!: string;
    password!: string;
    role!: Role;
    firstName!: string;
    lastName!: string;

}
export enum Role {
    User = 'user',
    Cashier = 'cashier',
    Admin = 'admin'
}