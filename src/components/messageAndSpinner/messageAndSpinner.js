import React, {useState} from 'react';

// Components
import Form from './form/form';
import LoadingSpinner from './loadingSpinner/loadingSpinner';
import Message from './message/message';

// Utils
import SecretPostingService from './secretPostingService/secretPostingService';
import delay from '../../utils/delay';

// Style
import './messageAndSpinner.scss';

export default function LeaveARequest (props) {
    const [displayMessage, setDisplayMessage] = useState(false);
    const [posting, setPosting] = useState(false);
    const [postingSuccess, setPostingSuccess] = useState(false);
    const [postingFailure, setPostingFailure] = useState(false);

    const toggleDisplayMessage = () => setDisplayMessage(!displayMessage);

    const togglePosting = () => setPosting(!posting);

    const togglePostingSuccess = () => setPostingSuccess(!postingSuccess);

    const togglePostingFailure = () => setPostingFailure(!postingFailure);

    const showHandler = () => {
        toggleDisplayMessage();
        togglePosting();

        if (postingSuccess) { togglePostingSuccess(); }
        if (postingFailure) { togglePostingFailure(); }
    }

    const handleOnSubmit = async formInfo => {
        const { secretMessage, success } = formInfo;
        if (secretMessage && secretMessage.length) {
            const sps = new SecretPostingService();
            togglePosting();
            let result;
            try {
                result = await sps.postTheSecret(success);
                if (!result) { throw new Error(); }
                togglePostingSuccess();
                delay(1000, null, toggleDisplayMessage);
            } catch (e) {
                togglePostingFailure();
                delay(1000, null, toggleDisplayMessage);
            }
            return result;
        }
    }

    const renderMessageContent = () => {
        const success = <div>
            <h4 className="success-title">This was a success!</h4>
            <p className="success-body">Your secrets are saved but will never be sh.... oops... We shared them all.</p>
        </div>;

        const failure = <div>
            <h4 className="failure-title">This was a failure!</h4>
            <p className="failure-body">Your secrets have not been shared with us and therefore can't be tak... uh... I mean saved.</p>
        </div>;

        return (
            <Message showHandler={showHandler}>
                {
                    postingFailure
                        ? failure
                        : success
                }
            </Message>
        );
    }

    return (
        <section className="message-spinner">
            <h3>Message and Spinner</h3>
            <Form
                handleOnSubmit={handleOnSubmit}
                submitDisabled={posting}
            >
            {
                posting &&
                <LoadingSpinner
                    show={posting}
                    success={postingSuccess}
                    error={postingFailure}
                />
            }
            {
                displayMessage &&
                renderMessageContent()
            }
            </Form>
        </section>
    );
}