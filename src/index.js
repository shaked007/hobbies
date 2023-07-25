import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/main/App';
import AddUser from './routes/AddUser/AddUser';
import {Provider} from 'react-redux'
import store from './store/index' 
import EditUser from './routes/EditUser/EditUser'
import './index.css'
import {
    createBrowserRouter,RouterProvider} from "react-router-dom";

    const routes = createBrowserRouter([
        {
            path:'/',
            element:<App />
        },
        {
            path:'/update-user/:id',
            element:<EditUser/>
        },
        {
            path:'/add-user',
            element:<AddUser/> 
        },
      
    ])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> 
    <RouterProvider router={routes} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
