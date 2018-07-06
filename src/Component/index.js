import { StackNavigator } from "react-navigation";
import RegisterComponent from "./Singin_singUp.js/Register"
import SingInComponent from "./Singin_singUp.js/SingIn"
import SplashScreen from "./Singin_singUp.js/SplashScreen"
import Dashboard from "./Dashboard/Dashboard"
import PostRequiremntComponent from "./Dashboard/PostRequiemnt"
import O_nrgetive from "./post/O_negetive";
import O_Posetive from "./post/O_Posetive";
import PostView from "./post/PostView";
import A_negetive from "./post/A_Negetive"
import A_Posetive from "./post/A_Posetive"
import B_nagetive from "./post/B_nagetive"
import B_posetive from "./post/B_Posetive"
import AB_negetive from "./post/AB_negetive";
import AB_Posetive from "./post/AB_Posetive"
import PrfofileData from "./Profile/ProfileData"
import mainCateComponent from "./ChatComponent/MassesComponent/index"
import userListCompponent from "./ChatComponent/UserList/userList"

const Nave = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        }
    },
    mainCateComponent: {
        screen: mainCateComponent,
        navigationOptions: {
            header: null
        }
    },
    userListCompponent: {
        screen: userListCompponent,
        navigationOptions: {
            header: null
        }
    },
    SingInComponent: {
        screen: SingInComponent,
        navigationOptions: {
            header: null
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        }
    },
    PostView: {
        screen: PostView,
        navigationOptions: {
            header: null
        }
    },

    PrfofileData: {
        screen: PrfofileData,
        navigationOptions: {
            header: null
        }
    },

    AB_negetive: {
        screen: AB_negetive,
        navigationOptions: {
            header: null
        }
    },
    AB_Posetive: {
        screen: AB_Posetive,
        navigationOptions: {
            header: null
        }
    },

    B_nagetive: {
        screen: B_nagetive,
        navigationOptions: {
            header: null
        }
    },
    B_posetive: {
        screen: B_posetive,
        navigationOptions: {
            header: null
        }
    },
    A_negetive: {
        screen: A_negetive,
        navigationOptions: {
            header: null
        }
    },
    A_Posetive: {
        screen: A_Posetive,
        navigationOptions: {
            header: null
        }
    },
    PostRequiremntComponent: {
        screen: PostRequiremntComponent,
        navigationOptions: {
            header: null
        }
    },
    O_nrgetive: {
        screen: O_nrgetive,
        navigationOptions: {
            header: null
        }
    },
    O_Posetive: {
        screen: O_Posetive,
        navigationOptions: {
            header: null
        }
    },
    RegisterComponent: {
        screen: RegisterComponent,
        navigationOptions: {
            header: null
        }
    },
})


export default Nave