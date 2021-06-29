import { Home } from './views/Home'
import { Logout } from './views/Logout'
import { Subscribe } from './views/Subscribe'
import { OnBoarding } from './views/OnBoarding'
import { NotFound } from './views/NotFound'
import { Welcome } from './views/Welcome'

const Routes = [
    {
        path: '/',
        component: Home,
        isPrivate: true,
    },
    {
        path: '/welcome',
        component: Welcome,
        isPrivate: false,
    },
    {
        path: '/subscribe',
        component: Subscribe,
        isPrivate:true,
    },
    {
        path: '/register',
        component: OnBoarding,
        isPrivate: false,
    },
    {
        path: '/login',
        component: Home,
        isPrivate: false,
    },
    {
        path: '/logout',
        component: Logout,
        isPrivate: false,
    },
    {
        path: '/*',
        component: NotFound,
        isPrivate: false,
    },
]

export default Routes
