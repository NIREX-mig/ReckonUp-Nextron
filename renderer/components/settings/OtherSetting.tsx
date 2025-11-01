import React, { useState } from "react";
import toast from "react-hot-toast";
import { APiRes } from "../../types";
import Button from "../ui/Button";

const OtherSetting = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendFeedback = () => {
    if (message.trim().length === 0) {
      toast.error("Write atleast 5 charactor.");
      return;
    }

    setLoading(true);
    window.ipc.send("feedback", message);

    window.ipc.on("feedback", async (res: APiRes) => {
      if (res.success) {
        setLoading(false);
        setMessage("");
        toast.success(res.message);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-primary-900">
        Other Settings
      </h2>

      <h3 className="text-lg font-semibold mb-4 text-primary-900">
        Write Your Feedback And Any Bugs Report
      </h3>
      <textarea
        name="feedback"
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-primary-100 rounded-lg w-[800px] p-3 text-primary-800 font-semibold border border-primary-900"
        placeholder="Say what you think about the app or any bug report"
        required
      />
      <div className="w-[800px]">
        <Button
          title="Send Feedback"
          buttonType="button"
          extraClass="mt-5 py-2 bg-primary-800 text-white"
          handleClick={handleSendFeedback}
          loading={loading}
          disabled={loading}
        />
      </div>
    </section>
  );
};

export default OtherSetting;
