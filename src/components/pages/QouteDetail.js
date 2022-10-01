import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const QouteDetail = () => {
    const param = useParams(); // all query params are string
    const matchRoute = useRouteMatch(); // get the current route where this
    const {
        sendRequest,
        data: qoute,
        status,
        error,
    } = useHttp(getSingleQuote, true);
    const { qouteId: id } = param;
    useEffect(() => {
        sendRequest(id);
    }, [sendRequest, id]);
    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered focused">{error}</p>;
    }
    if (status === "completed" && !qoute) {
        return <NoQuotesFound />;
    }

    return (
        <>
            <HighlightedQuote quote={qoute} />
            {/* same as /qoutes/:qouteId */}
            <Route path={`${matchRoute.path}`} exact>
                <div className="centered">
                    <Link
                        className="btn--flat"
                        to={`${matchRoute.url}/comments`}
                    >
                        Load comments
                    </Link>
                </div>
            </Route>
            <Route path={`${matchRoute.path}/comments`}>
                <Comments id={id} />
            </Route>
        </>
    );
};
export default QouteDetail;
