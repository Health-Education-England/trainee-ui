import React, { useState, useEffect, FocusEvent } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import {
  Panel,
  Input,
  Button,
  Details,
  ErrorSummary,
  WarningCallout
} from "nhsuk-react-components";
import QRCode from "qrcode.react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInputField from "../forms/TextInputField";

const SetTOTPForm: React.FC = () => {
  const [user, setUser] = useState<CognitoUser>();
  const [mfaType, setMFAType] = useState("");
  const [code, setCode] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    (async () => {
      getUser();
    })();
  }, []);

  const getUser = async () => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    const currentMFA: string = await Auth.getPreferredMFA(user);
    const code: string = await Auth.setupTOTP(user);
    const authCode: string =
      "otpauth://totp/AWSCognito:" +
      user.getUsername() +
      "?secret=" +
      code +
      "&issuer=AWSCognito";
    setUser(user);
    setMFAType(currentMFA);
    setCode(code);
    setQRCode(authCode);
  };

  const handleSubmit = (values: { confirmTOTPCode: string }) => {
    Auth.verifyTotpToken(user, values.confirmTOTPCode)
      .then(() => {
        Auth.setPreferredMFA(user, "TOTP")
          .then(data => {
            if (data === "SUCCESS") {
              history.push(`/profile`);
            }
          })
          .catch(err => {
            setErrorMessage("Unable to set MFA as TOTP. " + err.message);
          });
      })
      .catch(err =>
        setErrorMessage("Unable to verify token error. " + err.message)
      );
  };

  return (
    <Panel label="Authenticator Setup">
      {mfaType === "SOFTWARE_TOKEN_MFA" && (
        <WarningCallout label="Authenticator already setup">
          <p>
            You have already registered Self-Service with an authenticator
            application. You can continue with the setup process to re-register
            but this will disable the previously registered authenticator
            account.
          </p>
        </WarningCallout>
      )}
      <p>Open the application and scan the barcode.</p>

      {qrCode !== "" && (
        <div>
          <div style={{ padding: "20px" }}>
            <QRCode size={192} value={qrCode} />
          </div>

          <Details>
            <Details.Summary>Unable to scan QR code?</Details.Summary>
            <Details.Text>
              <p>
                If you are not using a mobile authentication app or are unable
                to see the QR code, you can enter the following code manually
                into your authentication application.
              </p>
              <Input
                onFocus={(event: FocusEvent<HTMLInputElement>) =>
                  event.target.select()
                }
                value={code}
                label=""
              />
            </Details.Text>
          </Details>

          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ confirmTOTPCode: "" }}
            validationSchema={Yup.object({
              confirmTOTPCode: Yup.string()
                .required("TOTP code required")
                .min(6, "Code must be min 6 characters in length")
                .max(6, "Code must be max 6 characters in length")
            })}
            onSubmit={values => handleSubmit(values)}
          >
            {({ values, errors }) => (
              <Form>
                <TextInputField
                  width={10}
                  name="confirmTOTPCode"
                  label="Enter the one-time code provided by the application and click Verify code to finish the setup."
                />
                <Button type="submit" data-cy="BtnContinue">
                  Verify code
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {errorMessage && (
        <ErrorSummary
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
        >
          <ErrorSummary.Title id="error-summary-title">
            There is a problem setting the TOTP code
          </ErrorSummary.Title>

          <ErrorSummary.Body>{errorMessage}</ErrorSummary.Body>
        </ErrorSummary>
      )}
    </Panel>
  );
};

export default SetTOTPForm;
