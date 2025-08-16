// src/pages/FeedbackForm.tsx
import React, { useState, useEffect, KeyboardEvent } from "react";
import { Input, Button, Alert, Spin, Card, Rate } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Footer from "../../components/common/Footer";
import CommonNav from "../../components/common/CommonNav";
import { FeedbackService } from "../../services/generalfeedback.service";

const { TextArea } = Input;

interface FeedbackItem {
  id: number;
  citizenId: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

const FeedbackForm: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const fetchFeedback = async () => {
    try {
      const data = await FeedbackService.getAllFeedbacks();
      const mappedData: FeedbackItem[] = data.map((item) => ({
        ...item,
        createdAt: item.createdAt || new Date().toISOString(),
      }));
      setFeedbackList(mappedData);
    } catch (err: any) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      await fetchFeedback();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) {
      setError("Please select a star rating.");
      return;
    }
    try {
      setError("");
      await FeedbackService.addFeedback({
        citizenId: 1,
        rating: selectedRating,
        comment,
      });
      setSubmitted(true);
      setSelectedRating(0);
      setHoverRating(0);
      setComment("");
      await fetchFeedback();
    } catch (err: any) {
      setError(err.message || "Failed to submit feedback");
    }
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
      const isActive = hoverRating >= index || selectedRating >= index;
      return (
        <span
          key={index}
          id={`star-${index}`}
          role="radio"
          aria-checked={selectedRating === index}
          aria-label={`${index} Star`}
          tabIndex={selectedRating === 0 && index === 1 ? 0 : selectedRating === index ? 0 : -1}
          onClick={() => setSelectedRating(index)}
          onMouseEnter={() => setHoverRating(index)}
          onMouseLeave={() => setHoverRating(0)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{ cursor: "pointer", fontSize: "32px" }}
        >
          {isActive ? <StarFilled style={{ color: "#facc15" }} /> : <StarOutlined style={{ color: "#d1d5db" }} />}
        </span>
      );
    });

if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <Spin size="large" tip="Loading..." />
    </div>
  );
}


  return (
    <>
      <CommonNav />
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Feedback Form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-[#0052cc] mb-6">Rate the Website</h1>
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex justify-center mb-4 gap-2" role="radiogroup" aria-label="Star rating">
                {renderStars()}
              </div>
              <TextArea
                id="comment"
                placeholder="Leave your comments here (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4 text-base font-sans"
                style={{ height: "120px", resize: "vertical", borderRadius: "6px", fontFamily: "Arial, sans-serif" }}
              />
              {error && <Alert message={error} type="error" showIcon className="mb-4 text-center" role="alert" />}
              <div className="flex justify-center mt-5">
                <Button type="primary" htmlType="submit" className="bg-[#0052cc] hover:bg-[#003d99] px-8 py-2 text-lg rounded">
                  Submit Feedback
                </Button>
              </div>
            </form>
            {submitted && (
              <div id="success-msg" aria-live="polite" className="text-center mt-4 font-bold text-green-600">
                Thank you for your feedback!
              </div>
            )}
          </div>

          {/* Recent Feedback */}
{/* Recent Feedback */}
<div className="flex-1">
  <h2 className="text-xl font-semibold mb-4 text-[#0052cc]">Recent Feedback</h2>
  <div className="max-h-[420px] overflow-y-auto pr-2">
    {feedbackList.length === 0 && <p className="text-gray-500">No feedback yet.</p>}
    {feedbackList.map((item) => (
      <Card key={item.id} className="mb-3">
        <Rate disabled defaultValue={item.rating} />
        {item.comment && <p className="mt-2">{item.comment}</p>}
        <p className="text-gray-400 text-sm mt-1">{new Date(item.createdAt).toLocaleString()}</p>
      </Card>
    ))}
  </div>
</div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackForm;
