import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import Freights from "./pages/Freights";
import Device from "./pages/Device";

export default function BasePage() {

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    <Redirect exact from="/" to="/freights"/>
                }
                <ContentRoute path="/freights" component={Freights}/>
                <ContentRoute path="/device/:id" component={Device}/>
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
