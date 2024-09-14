import { SignUpUseCase } from "@/app/use_cases/sign_up_use_case";
import { useMemo, useState } from "react";
import { container } from "tsyringe";

export function useViewModel(): SignUpPageViewModel {
  const signUpUseCase: SignUpUseCase = useMemo(() => container.resolve(SignUpUseCase), []);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstNameFieldValue, setFirstNameFieldValue] = useState<string>("");
  const [lastNameFieldValue, setLastNameFieldValue] = useState<string>("");
  const [emailFieldValue, setEmailFieldValue] = useState<string>("");
  const [passwordFieldValue, setPasswordFieldValue] = useState<string>("");
  
  return {
    isLoading,

    signUpButtonClicked: () => {
      setIsLoading(true);
      // await signUpUseCase.perform();
    },
  };
}

export interface SignUpPageViewModel {
  readonly isLoading: boolean;
  
  readonly signUpButtonClicked: () => void; 
}