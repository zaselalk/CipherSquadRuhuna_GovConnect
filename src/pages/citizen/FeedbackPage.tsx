import React, { useState, KeyboardEvent } from "react";
import { Input, Button, Alert } from "antd";
import { StarFilled } from "@ant-design/icons";
const { TextArea } = Input;

const FeedbackForm: React.FC = () => {

    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedRating === 0) {
            setError("Please select a star rating.");
            return;
        }

        setError("");
        setSubmitted(true);

        // Simulated form handling
        console.log("Rating:", selectedRating);
        console.log("Comment:", comment);

        setSelectedRating(0);
        setHoverRating(0);
        setComment("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>, index: number) => {
        const totalStars = 5;

        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedRating(index);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const next = (index % totalStars) + 1;
            document.getElementById(`star-${next}`)?.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prev = index - 1 === 0 ? totalStars : index - 1;
            document.getElementById(`star-${prev}`)?.focus();
        }
    };

    const renderStars = () =>
        Array.from({ length: 5 }, (_, i) => {
            const index = i + 1;

            return (
                <span
                    key={index}
                    id={`star-${index}`}
                    role="radio"
                    aria-checked={selectedRating === index}
                    aria-label={`${index} Star`}
                    tabIndex={
                        selectedRating === 0 && index === 1
                            ? 0
                            : selectedRating === index
                                ? 0
                                : -1
                    }
                    className="focus:outline-none"
                    onClick={() => setSelectedRating(index)}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(0)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                >
                    <StarFilled
                        className={`text-5xl transition-colors duration-200 cursor-pointer ${hoverRating >= index || selectedRating >= index
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                    />
                </span>
            );
        });


    return (
        <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg ">
            <h1 className="text-2xl font-bold text-center text-[#0052cc] mb-6">
                Rate Your Appointment
            </h1>

            <form onSubmit={handleSubmit} noValidate>
                <div
                    className="flex justify-center mb-4 gap-2"
                    role="radiogroup"
                    aria-label="Star rating"
                >
                    {renderStars()}
                </div>

                <TextArea
                    id="comment"
                    placeholder="Leave your comments here (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4 text-base font-sans"
                    style={{
                        height: "120px",
                        resize: "vertical",
                        borderRadius: "6px",
                        fontFamily: "Arial, sans-serif",
                    }}
                />

                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="mb-4 text-center"
                        role="alert"
                    />
                )}

                <div className="flex justify-center mt-5">

                    <div className="text-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-[#0052cc] hover:bg-[#003d99] px-8 py-2 text-lg rounded"
                        >
                            Submit Feedback
                        </Button>
                    </div>
                </div>
            </form>

            {submitted && (
                <div
                    id="success-msg"
                    aria-live="polite"
                    className="text-center mt-4 font-bold text-green-600"
                >
                    Thank you for your feedback!
                </div>
            )}
        </div>

    );
};

export default FeedbackForm;
