import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Header from './Components/Header'
import Feed from './Components/Feed'
import Sociagram from "./PageComponents/Sociagram";
import Login from "./PageComponents/login";
import Register from "./PageComponents/Register";
import ActivationEmail from "./PageComponents/activateMail";
import UpdateUser from "./PageComponents/updateUser";
import Forgotpassword from "./PageComponents/Forgotpassword";
import Resetpassword from "./PageComponents/Resetpassword";



export default function App() {

  return (
      <Router>
      <Switch>
      <RecoilRoot>
         <Route path="/register" component={Register} exact={true}/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact={true}/>
        <Route path="/user/reset/:id" component={Resetpassword} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/forgot_pwd" component={Forgotpassword} exact={true}/>
        <Route path="/" component={Sociagram} exact={true}/>
        <Route path="/profile" component={UpdateUser} exact={true}/>
        </RecoilRoot>
      </Switch>
     
  
    </Router>


    
  )
}

















// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ReactLoader from './components/loader';
// import * as ROUTES from './constants/routes';
// import UserContext from './context/user';
// import useAuthListener from './hooks/use-auth-listener';

// import ProtectedRoute from './helpers/protected-route';

// const Login = lazy(() => import('./pages/login'));
// const SignUp = lazy(() => import('./pages/sign-up'));
// const Dashboard = lazy(() => import('./pages/dashboard'));
// const Profile = lazy(() => import('./pages/profile'));
// const NotFound = lazy(() => import('./pages/not-found'));

// export default function App() {
//   const { user } = useAuthListener();

//   return (
//     <UserContext.Provider value={{ user }}>
//       <Router>
//         <Suspense fallback={<ReactLoader />}>
//           <Switch>
//             <Route path={ROUTES.LOGIN} component={Login} />
//             <Route path={ROUTES.SIGN_UP} component={SignUp} />
//             <Route path={ROUTES.PROFILE} component={Profile} />
//             <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
//               <Dashboard />
//             </ProtectedRoute>
//             <Route component={NotFound} />
//           </Switch>
//         </Suspense>
//       </Router>
//     </UserContext.Provider>
//   );
// }