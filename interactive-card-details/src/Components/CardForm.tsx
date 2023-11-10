import styles from "./CardForm.module.css";
import cardFrontSide from "./images/bg-card-front.png";
import cardBackSide from "./images/bg-card-back.png";
import { useState } from "react";

function CardForm() {
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardDateMonth, setCardDateMonth] = useState<string>("");
  const [cardDateYear, setCardDateYear] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [empty, setEmpty] = useState<boolean>(false);
  const [allDigits, setAllDigits] = useState<boolean>(false);
  const [cvvDigits, setCvvDigits] = useState<boolean>(false);
  const [monthError, setMonthError] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);

  function handleConfirm() {
    const isAnyFieldEmpty = [
      cardHolder,
      cardNumber,
      cardDateMonth,
      cardDateYear,
      cardCvv,
    ].some((value) => value === "");
    const isCardNumberValid = cardNumber.replace(/\D/g, "").length === 16;
    const isCvvValid = cardCvv.length === 3;

    const enteredMonth = parseInt(cardDateMonth, 10);
    const isMonthValid =
      !isNaN(enteredMonth) && enteredMonth >= 1 && enteredMonth <= 12;

    const enteredYear = parseInt(20 + cardDateYear, 10);
    const currentYear = new Date().getFullYear();
    const isYearValid = !isNaN(enteredYear) && enteredYear >= currentYear;

    setEmpty(isAnyFieldEmpty);
    setAllDigits(!isCardNumberValid);
    setCvvDigits(!isCvvValid);

    if (!isMonthValid || !isYearValid) {
      setMonthError("month");
      setYearError("year");
    } else {
      setMonthError(null);
      setYearError(null);
    }

    setSubmit(
      !isAnyFieldEmpty &&
        isCardNumberValid &&
        isCvvValid &&
        isMonthValid &&
        isYearValid
    );
  }

  return (
    <div className={styles.cardForm}>
      <div className={styles.cardContainer}>
        <img
          src={cardBackSide}
          alt="bg-card-back.png"
          className={styles.cardBackSide}
        />
        <img
          src={cardFrontSide}
          alt="bg-card-front.png"
          className={styles.cardFrontSide}
        />
        <div className={styles.cardBigCircle}></div>
        <div className={styles.cardSmallCircle}></div>
        {submit ? (
          <h4 className={styles.clientOnCard}>{cardHolder.toUpperCase()}</h4>
        ) : (
          <h4 className={styles.clientOnCard}>Jane Doe</h4>
        )}
        {submit ? (
          <h2 className={styles.onCardNumber}>{cardNumber}</h2>
        ) : (
          <h2 className={styles.onCardNumber}>0000 0000 0000 0000</h2>
        )}
        {submit ? (
          <p className={styles.cardDateOnCard}>
            {cardDateMonth}/{cardDateYear}
          </p>
        ) : (
          <p className={styles.cardDateOnCard}>00/00</p>
        )}
        {submit ? (
          <p className={styles.cvvOnCard}>{cardCvv}</p>
        ) : (
          <p className={styles.cvvOnCard}>000</p>
        )}
      </div>

      <div className={styles.dataContainer}>
        {submit ? (
          <div className={styles.resultContainer}>
            <div className={styles.resultChildContainer}>
              <div className={styles.iconContainer}>
                <i className="fa-solid fa-check"></i>
              </div>
              <h3>THANK YOU!</h3>
              <p>We've added your card details</p>
            </div>
            <button type="button">Continue</button>
          </div>
        ) : (
          <div className={styles.dataChildContainer}>
            <div className={styles.cardHolderContainer}>
              <div className={styles.labelContainer}>
                <label htmlFor="cardHolder">CARDHOLDER NAME</label>
              </div>
              <input
                type="text"
                placeholder="e.g Jane Appleseed"
                className={
                  empty && cardHolder === ""
                    ? styles.longInputError
                    : styles.longInput
                }
                maxLength={20}
                value={cardHolder}
                // onChange={(event) => setCardHolder(event.target.value)}
                onChange={(event) => {
                  const inputText = event.target.value;
                  // Check if the entered text contains only letters and spaces
                  if (/^[A-Za-z\s]+$/.test(inputText)) {
                    setCardHolder(inputText);
                  }
                }}
              />
              {empty && cardHolder === "" ? (
                <p className={styles.notBlank}>Can't be blank</p>
              ) : (
                ""
              )}
            </div>

            <div className={styles.cardNumberContainer}>
              <div className={styles.labelContainer}>
                <label htmlFor="cardNumber">CARD NUMBER</label>
              </div>
              <input
                type="text"
                placeholder="e.g 1234 5678 9123 0000"
                className={
                  empty && cardNumber === ""
                    ? styles.longInputError
                    : styles.longInput
                }
                maxLength={20}
                value={cardNumber}
                onChange={(event) => {
                  const numericValue = event.target.value.replace(/\D/g, "");
                  const formattedValue = numericValue.replace(
                    /(\d{4})/g,
                    "$1 "
                  );
                  setCardNumber(formattedValue);
                }}
              />

              <div className={styles.cardNumberErrorMessage}>
                {empty && cardNumber === "" ? (
                  <p className={styles.notBlank}>Can't be blank</p>
                ) : (
                  ""
                )}
                {allDigits && cardNumber.length < 19 ? (
                  <p className={styles.cardNumberNotAllDigits}>
                    cardnumber must be 16 digits{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className={styles.dateDisplay}>
              <div>
                <div className={styles.labelContainer}>
                  <label htmlFor="cardDate">EXP. DATE (MM/YY)</label>
                </div>

                <input
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  value={cardDateMonth}
                  className={`${
                    empty && cardDateMonth === null
                      ? styles.dateInputError
                      : styles.dateInput
                  } ${styles.monthInput}`}
                  onChange={(event) => {
                    const cardDateMonthValueConvert =
                      event.target.value.replace(/\D/g, "");
                    setMonthError(null);

                    const enteredMonth = parseInt(cardDateMonthValueConvert);
                    if (enteredMonth < 0 || enteredMonth > 12) {
                      setMonthError("month");
                    }
                    setCardDateMonth(cardDateMonthValueConvert);
                  }}
                />

                <input
                  type="text"
                  placeholder="YY"
                  maxLength={2}
                  value={cardDateYear}
                  className={`${
                    empty && cardDateYear === null
                      ? styles.dateInputError
                      : styles.dateInput
                  } ${styles.yearInput}`}
                  onChange={(event) => {
                    const cardDateYearValueConvert = event.target.value.replace(
                      /\D/g,
                      ""
                    );
                    setYearError(null);
                    const currentYear = new Date().getFullYear();
                    const enteredYear = parseInt(20 + cardDateYearValueConvert);
                    if (enteredYear < currentYear) {
                      setYearError("year");
                    }
                    setCardDateYear(cardDateYearValueConvert);
                  }}
                />
                {(empty && cardDateMonth === "") ||
                (empty && cardDateYear === "") ? (
                  <p className={styles.notBlank}>Can't be blank</p>
                ) : (
                  ""
                )}
                {yearError === null && monthError === null ? (
                  ""
                ) : (
                  <p className={styles.ivalidDate}>
                    invalid {monthError}/{yearError}
                  </p>
                )}
              </div>

              <div>
                <div className={`${styles.cvvLabel} ${styles.labelContainer}`}>
                  <label htmlFor="cardDate">CVC</label>
                </div>
                <input
                  type="text"
                  placeholder="e.g 123"
                  className={
                    cvvDigits && cardCvv.length < 3
                      ? styles.cvvInputError
                      : styles.cvvInput
                  }
                  maxLength={3}
                  value={cardCvv}
                  onChange={(event) => {
                    const cvvValueConvert = event.target.value.replace(
                      /\D/g,
                      ""
                    );
                    setCardCvv(cvvValueConvert);
                  }}
                />
                {cvvDigits && cardCvv.length < 3 ? (
                  <p className={styles.cvvNotAllDigits}>cvv must be 3 digits</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardForm;
