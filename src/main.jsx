import Login from './pages/login'
import Signup from'./pages/signup'
import Profile from'./pages/profile'
import Notification from './pages/notification';
import Tweet from './pages/tweet';
import Erreur from './pages/erreur';
import NewTweet from './pages/newTweet';
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import { Follows } from './pages/follows';
import { Followers } from './pages/followers';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/tweet" element={<Tweet />}/>
            <Route path="/notif" element={<Notification />}/>
            <Route path="/newtweet" element={<NewTweet />}/>
            <Route path="/follows" element={<Follows/>}/>
            <Route path="/followers" element={<Followers/>}/>
            <Route path="*" element={<Erreur />}/>
        </Routes>
    </BrowserRouter>
);
