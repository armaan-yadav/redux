import { AppwriteError } from "@/types/types";
import { AppwriteException, ID } from "appwrite";
import { account } from "../appwrite";

function isAppwriteException(error: unknown): error is AppwriteException {
  return error instanceof Error && "code" in error;
}

const handleError = async (error: unknown) => {
  if (isAppwriteException(error)) {
    console.log({
      code: error.code,
      message: error.message,
      success: false,
    });
    throw {
      success: false,
      code: error.code as number,
      message: error.message,
    } as AppwriteError;
  }

  console.error("Unexpected error:", error);
  throw {
    success: false,
    code: null,
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await account.create(ID.unique(), email, password);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}): Promise<string> => {
  try {
    const token = await account.createPhoneToken(ID.unique(), phoneNumber);
    console.log(token);
    return token.userId;
  } catch (error) {
    console.log(error);
    return "";
  }
};
export const verifyOtp = async ({
  otp,
  userId,
}: {
  otp: string;
  userId: string;
}) => {
  try {
    const token = await account.createSession(userId, otp);
    console.log(token);
    return { success: true, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return { success: false, message: error.message };
    } else {
      console.log("An unknown error occurred");
      return { success: false, message: "An unknown error occurred" };
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const temp = await account.get();
    console.log(temp);
  } catch (error) {
    console.log(error);
  }
};
