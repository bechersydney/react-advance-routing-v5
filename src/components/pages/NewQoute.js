import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import QuoteForm from "../quotes/QuoteForm";

const NewQoute = () => {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory(); // navigation stack on flutter can call push
    const addQouteHandler = (qouteData) => {
        sendRequest(qouteData);
    };
    useEffect(() => {
        if (status === "completed") {
            history.push("/qoutes"); // push to navigation stack
        }
    }, [status, history]);
    return (
        <>
            <QuoteForm
                isLoading={status === "pending"}
                onAddQuote={addQouteHandler}
            />
        </>
    );
};
export default NewQoute;
