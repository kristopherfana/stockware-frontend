import { Role } from "../../auth/dto/create-user.dto";

export const navLinks = [
    { label: 'Home', url: '/home' },
    { label: 'Users', url: '/users', role: Role.Admin },
    { label: 'Categories', url: '/categories' },
    { label: 'Products', url: '/products' },
    { label: 'Dashboard', url: "/dashboard", role: Role.Admin }
];

export const accountLinks = [
    { label: 'My Appointments', url: '/my-appointments' },
    { label: 'Profile', url: '/profile' },
    { label: 'Logout', url: '/logout' }
]