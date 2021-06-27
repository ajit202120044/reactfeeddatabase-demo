import React from "react";

export default function Person({ obj }) {
  return (
    <div className="feedback-card">
      <div className="feedback-head">
        {obj.gender} {obj.fn} {obj.mn} {obj.ln}
      </div>
      <hr />
      <div className="feedback-body">{obj.sugg}</div>
    </div>
  );
}
