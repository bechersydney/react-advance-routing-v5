import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = (props) => {
    const { qouteId: id } = useParams();
    const [isAddingComment, setIsAddingComment] = useState(false);
    const {
        sendRequest,
        data: loadedComments,
        status,
        error,
    } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(id);
    }, [id, sendRequest]);

    let comments;

    if (status === "pending") {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        comments = <p className="centered">{error}</p>;
    }
    // always careful on array checking
    // !loadedComments for null check and loadedComments.length for length

    if (
        (!loadedComments || loadedComments.length === 0) &&
        status === "completed"
    ) {
        comments = <p className="centered">No comment for this qoute!!</p>;
    }
    if (loadedComments && loadedComments.length > 0 && status === "completed") {
        comments = <CommentsList comments={loadedComments} />;
    }

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };
    const onAddedComment = useCallback(() => {
        sendRequest(id);
    }, [sendRequest, id]);

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm onAddedComment={onAddedComment} id={id} />
            )}
            {comments}
        </section>
    );
};

export default Comments;
