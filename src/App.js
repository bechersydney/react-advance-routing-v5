import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQoutes from "./components/pages/AllQoutes";
import NewQoute from "./components/pages/NewQoute";
import NotFound from "./components/pages/NotFound";
import QouteDetail from "./components/pages/QouteDetail";

function App() {
    return (
        <Layout>
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
        </Layout>
    );
}

export default App;
