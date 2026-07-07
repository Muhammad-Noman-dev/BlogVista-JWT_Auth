import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const MailVerification = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  const id = searchParams.get("id");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/mail-verification?id=${id}`);

        setMessage(res.data.message || "Email Verified Successfully");
      } catch (err) {
        setMessage("Verification Failed or Link Expired");
      }
    };

    if (id) {
      verifyEmail();
    } else {
      setMessage("Invalid Verification Link");
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-bold">{message}</h2>
    </div>
  );
};

export default MailVerification;