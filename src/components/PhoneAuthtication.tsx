import { sendOtp, verifyOtp } from "@/services/authServices";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "./ui/input-otp";
import { Label } from "./ui/label";

interface PhoneAutheticationForm {
  phoneNumber: string;
  otp: string;
}

const PhoneAuthtication = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PhoneAutheticationForm>();

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [countDown, setCountDown] = useState<number>(60);

  const handleSendOtp = async (phoneNumber: string) => {
    console.log("handleSendOtp called");
    const ph = `+91${phoneNumber}`;
    const userId = await sendOtp({ phoneNumber: ph });
    setUserId(userId);
    setIsOtpSent(true);
    console.log("otp sent for user id : ", userId);
  };
  const handleVerifyOtp = async (otp: string) => {
    console.log("handleVerifyOtp called");
    try {
      await verifyOtp({ otp, userId });
    } catch (error) {
//    
    }
  };
  const handleFormSubit: SubmitHandler<PhoneAutheticationForm> = async (
    data
  ) => {
    isOtpSent ? handleVerifyOtp(OTP) : handleSendOtp(data.phoneNumber);
  };

  useEffect(() => {
    // getCurrentUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <form onSubmit={handleSubmit(handleFormSubit)}>
        <div>
          <Label>
            Phone Number
            <div>
              <Input
                type="tel"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number can not be more than 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number can not be less than 10 digits",
                  },
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
          </Label>
        </div>

        {isOtpSent && (
          <div>
            <Label>
              OTP
              <InputOTP
                maxLength={6}
                onComplete={(e) => {
                  setOTP(e);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Label>
          </div>
        )}

        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        <Button>{isOtpSent ? "Verify OTP" : "Sent OTP"}</Button>
      </form>
    </div>
  );
};

export default PhoneAuthtication;
