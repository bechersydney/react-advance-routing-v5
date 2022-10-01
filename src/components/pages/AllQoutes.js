import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import QuoteList from "../quotes/QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQoutesFound from "../quotes/NoQuotesFound";

const AllQoutes = () => {
    const {
        sendRequest,
        status,
        error,
        data: loadedQoutes,
    } = useHttp(getAllQuotes, true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />;
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">{error}</p>;
    }
    if (
        status === "completed" &&
        (!loadedQoutes || loadedQoutes.length === 0)
    ) {
        return <NoQoutesFound />;
    }
    return <QuoteList quotes={loadedQoutes} />;
};
export default AllQoutes;
