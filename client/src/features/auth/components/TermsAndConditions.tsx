interface TermsAndConditionsProps {
  text: string;
}

export const TermsAndConditions = ({ text }: TermsAndConditionsProps) => {
  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span>{text}, you agree to Shine's</span>
        </small>
      </div>
      <div>
        <small>
          <a href="/" style={{ textDecoration: "none", fontWeight: 500 }}>
            {" "}
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="/" style={{ textDecoration: "none", fontWeight: 500 }}>
            Privacy policy
          </a>
        </small>
      </div>
    </>
  );
};
