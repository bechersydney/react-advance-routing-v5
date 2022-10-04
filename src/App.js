import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// lazy loading for deployment
const NewQoute = React.lazy(() => import("./components/pages/NewQoute"));
const QouteDetail = React.lazy(() => import("./components/pages/QouteDetail"));
const NotFound = React.lazy(() => import("./components/pages/NotFound"));
const AllQoutes = React.lazy(() => import("./components/pages/AllQoutes"));

function App() {
    return (
        <Layout>
            <Suspense
                fallback={
                    <div className="centered">
                        <LoadingSpinner />
                    </div>
                }
            >
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/qoutes" />
                    </Route>

                    <Route path="/qoutes" exact>
                        <AllQoutes />
                    </Route>
                    <Route path="/qoutes/:qouteId">
                        <QouteDetail />
                    </Route>
                    <Route path="/new-qoute">
                        <NewQoute />
                    </Route>
                    {/* must last, all unknown url will display this */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
