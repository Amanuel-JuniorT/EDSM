/*
  Portfolio.jsx - Portfolio management page for EDSM
  -------------------------------------------------
  - Shows portfolio value, assets, add/withdraw fund modals, and summary.
  - For backend/frontend devs: Add API integration, asset logic, or summary updates here as needed.
*/
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";



export default function Portfolio() {
  const {
    balance,
    updateBalance,
    isLoadingBalance,
    getBalance,
    isUpdatingBalance,
    getStocks,
    isLoadingOwnedStocks,
    ownedStocks,
  } = useProfileStore();
  const navigate = useNavigate();
  const { user, isCheckingAuth } = useAuthStore();
  const { portfolioSummary } = useContext(AppContext);
  const [showAddFund, setShowAddFund] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [fundMethod, setFundMethod] = useState("bank");
  const [fundSuccess, setFundSuccess] = useState(false);
  const [fundError, setFundError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bankRef, setBankRef] = useState("");

  useEffect(() => {
    if (user && user.isVerified && !isCheckingAuth) {
      getBalance();
      getStocks();
    }
  }, [getBalance, getStocks]);

  const handleFundSubmit = (e) => {
    e.preventDefault();
    setFundError("");
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      setFundError("Please enter a valid amount.");
      return;
    }
    if (fundMethod === "card" && (!cardNumber || !cardExpiry || !cardCVC)) {
      setFundError("Please fill in all card details.");
      return;
    }
    if (fundMethod === "mobile" && !mobileNumber) {
      setFundError("Please enter your mobile number.");
      return;
    }
    if (fundMethod === "bank" && !bankRef) {
      setFundError("Please enter your bank reference number.");
      return;
    }
    setTimeout(() => {
      setFundSuccess(true);
      updateBalance(Number(fundAmount));
    }, 600);
  };

  console.log({ ownedStocks });

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    setFundError("");
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) {
      setFundError("Please enter a valid amount.");
      return;
    }
    if (Number(fundAmount) > balance) {
      setFundError("Insufficient balance for withdrawal.");
      return;
    }
    if (fundMethod === "bank" && !bankRef) {
      setFundError("Please enter your bank account number.");
      return;
    }
    if (fundMethod === "mobile" && !mobileNumber) {
      setFundError("Please enter your mobile number.");
      return;
    }
    setTimeout(() => {
      setFundSuccess(true);
      updateBalance(-Number(fundAmount));
    }, 600);
  };

  const resetForm = () => {
    setFundSuccess(false);
    setFundAmount("");
    setFundError("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVC("");
    setMobileNumber("");
    setBankRef("");
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>
          Welcome back,{" "}
          {!user ? <div className="loading-spinner" /> : user.firstName}
        </h1>
        <div className="portfolio-subtitle">Here is your Portfolio</div>
      </div>
      <div className="portfolio-value-card card">
        <div className="portfolio-value-main">
          <div>
            <div className="portfolio-value-label">Portfolio Value</div>
            <div className="portfolio-value-amount">ETB</div>
            <div className="portfolio-value-gain">
              +ETB{portfolioSummary.gain} ({portfolioSummary.gainPercent}%)
            </div>
          </div>
          <div className="portfolio-value-actions">
            <button
              className="btn btn-outline"
              onClick={() => {
                setShowAddFund(true);
                resetForm();
              }}
            >
              <i className="fas fa-plus"></i> Add Fund
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setShowWithdraw(true);
                resetForm();
              }}
            >
              <i className="fas fa-arrow-up"></i> Withdraw
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <div className="summary-card" style={{ flex: 1 }}>
            <div className="summary-title">Total Investment</div>
            <div className="summary-value">
              ETB {portfolioSummary.investment.toLocaleString()}
            </div>
          </div>
          <div className="summary-card" style={{ flex: 1 }}>
            <div className="summary-title">Cash</div>
            <div className="summary-value">
              ETB{" "}
              {isLoadingBalance || !balance ? (
                <div className="loading-spinner" />
              ) : (
                balance.toLocaleString()
              )}
            </div>
          </div>
          <div className="summary-card" style={{ flex: 1 }}>
            <div className="summary-title">Todays Return</div>
            <div className="summary-value positive">
              + ETB {portfolioSummary.todayReturn.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio-assets-card card">
        <div className="portfolio-assets-header">
          <div className="card-title">Stocks</div>
        </div>
        <div className="portfolio-assets-table-wrapper">
          <table className="portfolio-assets-table">
            <thead>
              <tr style={{ background: "#222", color: "#fff" }}>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingOwnedStocks || ownedStocks.length == 0 ? (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan="4" style={{ padding: "20px 0" }}>
                    <div className="loading-spinner" />
                  </td>
                </tr>
              ) : (
                ownedStocks.map((stock, idx) => (
                  <tr
                    key={idx}
                    className="stock-row"
                    onClick={() => navigate(`/stock/${stock.symbol}`)}
                  >
                    <td>
                      <div style={{ fontWeight: 600 }}>{stock.symbol}</div>
                      <div
                        style={{
                          color: "var(--light-text)",
                          fontSize: "0.95em",
                        }}
                      >
                        {stock.name}
                      </div>
                      
                    </td>

                    <td>
                      {stock.quantity.toLocaleString()} shares
                    </td>

                    <td>ETB {stock.unitPrice?.toLocaleString()}</td>

                    <td>
                        ETB {stock.totalValue?.toLocaleString()}
                    </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Fund Modal */}
      {showAddFund && (
        <div className="modal">
          <div
            className="modal-content advanced-modal"
            style={{
              minWidth: 400,
              maxWidth: 420,
              padding: "0",
              overflow: "visible",
              position: "relative",
              background: "var(--card-bg)",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 24px 0 var(--shadow-color)",
            }}
          >
            <button
              className="modal-close"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                fontSize: 28,
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
                zIndex: 2,
              }}
              onClick={() => {
                setShowAddFund(false);
                resetForm();
              }}
            >
              &times;
            </button>
            <div style={{ padding: "36px 36px 0 36px", textAlign: "center" }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  marginBottom: 6,
                  letterSpacing: 0.01,
                }}
              >
                Add Fund
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(25, 167, 242, 0.07)",
                  borderRadius: 10,
                  padding: "10px 0",
                  marginBottom: 18,
                }}
              >
                <i
                  className="fas fa-wallet"
                  style={{ color: "#1976d2", fontSize: 22, marginRight: 10 }}
                ></i>
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 700,
                    fontSize: "1.13rem",
                  }}
                >
                  Current Balance:
                </span>
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 800,
                    fontSize: "1.13rem",
                    marginLeft: 8,
                  }}
                >
                  ETB {balance.toLocaleString()}
                </span>
              </div>
            </div>
            <div style={{ padding: "0 36px 32px 36px" }}>
              {fundSuccess ? (
                <div
                  className="modal-success"
                  style={{ margin: "2.5rem 0 1.5rem 0", textAlign: "center" }}
                >
                  <i className="fas fa-check-circle"></i> Fund added
                  successfully!
                </div>
              ) : (
                <form
                  onSubmit={handleFundSubmit}
                  autoComplete="off"
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  {/* Amount Input */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      htmlFor="fund-amount"
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Amount
                    </label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 18,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#1976d2",
                          fontWeight: 700,
                          fontSize: "1.13em",
                          pointerEvents: "none",
                          letterSpacing: 0.5,
                        }}
                      >
                        ETB
                      </span>
                      <input
                        id="fund-amount"
                        type="number"
                        min="1"
                        className="modal-input"
                        style={{
                          paddingLeft: 60,
                          fontWeight: 700,
                          fontSize: "1.18em",
                          height: 48,
                          border:
                            fundError && !fundAmount
                              ? "1.5px solid #e53935"
                              : undefined,
                          background: "#f7fafd",
                        }}
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="Enter amount (e.g. 1,000)"
                        required
                      />
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Payment Method
                    </label>
                    <div className="modal-methods" style={{ gap: 12 }}>
                      <button
                        type="button"
                        className={`modal-method-btn${
                          fundMethod === "bank" ? " active" : ""
                        }`}
                        style={{ minWidth: 110 }}
                        onClick={() => setFundMethod("bank")}
                      >
                        <i className="fas fa-university"></i> Bank
                      </button>
                      <button
                        type="button"
                        className={`modal-method-btn${
                          fundMethod === "card" ? " active" : ""
                        }`}
                        style={{ minWidth: 90 }}
                        onClick={() => setFundMethod("card")}
                      >
                        <i className="fas fa-credit-card"></i> Card
                      </button>
                      <button
                        type="button"
                        className={`modal-method-btn${
                          fundMethod === "mobile" ? " active" : ""
                        }`}
                        style={{ minWidth: 120 }}
                        onClick={() => setFundMethod("mobile")}
                      >
                        <i className="fas fa-mobile-alt"></i> Mobile Money
                      </button>
                    </div>
                  </div>
                  {/* Dynamic Fields */}
                  {fundMethod === "bank" && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label
                        htmlFor="bank-ref"
                        style={{
                          fontWeight: 700,
                          marginBottom: 6,
                          display: "block",
                        }}
                      >
                        Bank Reference Number
                      </label>
                      <input
                        id="bank-ref"
                        className="modal-input"
                        value={bankRef}
                        onChange={(e) => setBankRef(e.target.value)}
                        placeholder="e.g. 1234567890"
                        required
                        style={{ fontWeight: 600, background: "#f7fafd" }}
                      />
                    </div>
                  )}
                  {fundMethod === "card" && (
                    <>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label
                          htmlFor="card-number"
                          style={{
                            fontWeight: 700,
                            marginBottom: 6,
                            display: "block",
                          }}
                        >
                          Card Number
                        </label>
                        <input
                          id="card-number"
                          className="modal-input"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          style={{ fontWeight: 600, background: "#f7fafd" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <div
                          className="form-group"
                          style={{ flex: 1, marginBottom: 0 }}
                        >
                          <label
                            htmlFor="card-expiry"
                            style={{
                              fontWeight: 700,
                              marginBottom: 6,
                              display: "block",
                            }}
                          >
                            Expiry
                          </label>
                          <input
                            id="card-expiry"
                            className="modal-input"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            style={{ fontWeight: 600, background: "#f7fafd" }}
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{
                            width: 90,
                            minWidth: 60,
                            maxWidth: 100,
                            marginBottom: 0,
                          }}
                        >
                          <label
                            htmlFor="card-cvc"
                            style={{
                              fontWeight: 700,
                              marginBottom: 6,
                              display: "block",
                            }}
                          >
                            CVC
                          </label>
                          <input
                            id="card-cvc"
                            className="modal-input"
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value)}
                            placeholder="CVC"
                            maxLength={4}
                            required
                            style={{
                              fontWeight: 600,
                              background: "#f7fafd",
                              textAlign: "center",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {fundMethod === "mobile" && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label
                        htmlFor="mobile-number"
                        style={{
                          fontWeight: 700,
                          marginBottom: 6,
                          display: "block",
                        }}
                      >
                        Mobile Number
                      </label>
                      <input
                        id="mobile-number"
                        className="modal-input"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 0912 345 678"
                        maxLength={13}
                        required
                        style={{ fontWeight: 600, background: "#f7fafd" }}
                      />
                    </div>
                  )}
                  {/* Error Message */}
                  {fundError && (
                    <div
                      className="modal-error"
                      style={{
                        marginBottom: 2,
                        marginTop: 2,
                        color: "#e53935",
                        fontWeight: 600,
                      }}
                    >
                      {fundError}
                    </div>
                  )}
                  {/* Sticky Add Fund Button */}
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      background: "white",
                      paddingTop: 18,
                      paddingBottom: 0,
                      zIndex: 1,
                      margin: 0,
                    }}
                  >
                    <button
                      className="btn btn-add-fund-main modal-btn"
                      type="submit"
                      disabled={!fundAmount}
                      cursor="disabled"
                      style={{
                        width: "100%",
                        fontWeight: 800,
                        fontSize: "1.15em",
                        padding: "15px 0",
                        borderRadius: 10,
                        boxShadow: "0 2px 12px rgba(0,123,255,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 0,
                      }}
                    >
                      {isUpdatingBalance ? (
                        <div
                          className="loading-spinner"
                          style={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <i
                          className="fas fa-plus-circle"
                          style={{ marginRight: 8 }}
                        ></i>
                      )}{" "}
                      Add Fund
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/*------------------ Withdraw Modal --------------------------------------*/}
      {/* ---------------------------------------------------------------------- */}

      {showWithdraw && (
        <div className="modal">
          <div
            className="modal-content advanced-modal"
            style={{
              minWidth: 400,
              maxWidth: 420,
              padding: "0",
              overflow: "visible",
              position: "relative",
              background: "var(--card-bg)",
              border: "1.5px solid var(--border-color)",
              boxShadow: "0 4px 24px 0 var(--shadow-color)",
            }}
          >
            <button
              className="modal-close"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                fontSize: 28,
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
                zIndex: 2,
              }}
              onClick={() => {
                setShowWithdraw(false);
                resetForm();
              }}
            >
              &times;
            </button>
            <div style={{ padding: "36px 36px 0 36px", textAlign: "center" }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  marginBottom: 6,
                  letterSpacing: 0.01,
                }}
              >
                Withdraw Funds
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(25, 167, 242, 0.07)",
                  borderRadius: 10,
                  padding: "10px 0",
                  marginBottom: 18,
                }}
              >
                <i
                  className="fas fa-wallet"
                  style={{ color: "#1976d2", fontSize: 22, marginRight: 10 }}
                ></i>
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 700,
                    fontSize: "1.13rem",
                  }}
                >
                  Available Balance:
                </span>
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: 800,
                    fontSize: "1.13rem",
                    marginLeft: 8,
                  }}
                >
                  ETB {balance.toLocaleString()}
                </span>
              </div>
            </div>
            <div style={{ padding: "0 36px 32px 36px" }}>
              {fundSuccess ? (
                <div
                  className="modal-success"
                  style={{ margin: "2.5rem 0 1.5rem 0", textAlign: "center" }}
                >
                  <i className="fas fa-check-circle"></i> Withdrawal successful!
                </div>
              ) : (
                <form
                  onSubmit={handleWithdrawSubmit}
                  autoComplete="off"
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  {/* Amount Input */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      htmlFor="withdraw-amount"
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Amount
                    </label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 18,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#1976d2",
                          fontWeight: 700,
                          fontSize: "1.13em",
                          pointerEvents: "none",
                          letterSpacing: 0.5,
                        }}
                      >
                        ETB
                      </span>
                      <input
                        id="withdraw-amount"
                        type="number"
                        min="1"
                        max={balance}
                        className="modal-input"
                        style={{
                          paddingLeft: 60,
                          fontWeight: 700,
                          fontSize: "1.18em",
                          height: 48,
                          border:
                            fundError && !fundAmount
                              ? "1.5px solid #e53935"
                              : undefined,
                          background: "#f7fafd",
                        }}
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="Enter amount (e.g. 1,000)"
                        required
                      />
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      Withdrawal Method
                    </label>
                    <div className="modal-methods" style={{ gap: 12 }}>
                      <button
                        type="button"
                        className={`modal-method-btn${
                          fundMethod === "bank" ? " active" : ""
                        }`}
                        style={{ minWidth: 110 }}
                        onClick={() => setFundMethod("bank")}
                      >
                        <i className="fas fa-university"></i> Bank
                      </button>
                      <button
                        type="button"
                        className={`modal-method-btn${
                          fundMethod === "mobile" ? " active" : ""
                        }`}
                        style={{ minWidth: 120 }}
                        onClick={() => setFundMethod("mobile")}
                      >
                        <i className="fas fa-mobile-alt"></i> Mobile Money
                      </button>
                    </div>
                  </div>
                  {/* Dynamic Fields */}
                  {fundMethod === "bank" && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label
                        htmlFor="bank-ref"
                        style={{
                          fontWeight: 700,
                          marginBottom: 6,
                          display: "block",
                        }}
                      >
                        Bank Account Number
                      </label>
                      <input
                        id="bank-ref"
                        className="modal-input"
                        value={bankRef}
                        onChange={(e) => setBankRef(e.target.value)}
                        placeholder="Enter your bank account number"
                        required
                        style={{ fontWeight: 600, background: "#f7fafd" }}
                      />
                    </div>
                  )}
                  {fundMethod === "mobile" && (
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label
                        htmlFor="mobile-number"
                        style={{
                          fontWeight: 700,
                          marginBottom: 6,
                          display: "block",
                        }}
                      >
                        Mobile Number
                      </label>
                      <input
                        id="mobile-number"
                        className="modal-input"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 0912 345 678"
                        maxLength={13}
                        required
                        style={{ fontWeight: 600, background: "#f7fafd" }}
                      />
                    </div>
                  )}
                  {/* Error Message */}
                  {fundError && (
                    <div
                      className="modal-error"
                      style={{
                        marginBottom: 2,
                        marginTop: 2,
                        color: "#e53935",
                        fontWeight: 600,
                      }}
                    >
                      {fundError}
                    </div>
                  )}
                  {/* Sticky Withdraw Button */}
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      background: "white",
                      paddingTop: 18,
                      paddingBottom: 0,
                      zIndex: 1,
                      margin: 0,
                    }}
                  >
                    <button
                      className="btn btn-add-fund-main modal-btn"
                      type="submit"
                      disabled={!fundAmount}
                      style={{
                        width: "100%",
                        fontWeight: 800,
                        fontSize: "1.15em",
                        padding: "15px 0",
                        borderRadius: 10,
                        boxShadow: "0 2px 12px rgba(0,123,255,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 0,
                        cursor: !fundAmount ? "not-allowed" : "pointer",
                      }}
                    >
                      {isUpdatingBalance ? (
                        <div
                          className="loading-spinner"
                          style={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <i
                          className="fas fa-arrow-up"
                          style={{ marginRight: 8 }}
                        ></i>
                      )}{" "}
                      Withdraw Funds
                      {/* Conditional icon based on loading state */}
                      {/* <i
                        className="fas fa-arrow-up"
                        style={{ marginRight: 8 }}
                      ></i>{" "}
                      Withdraw Funds */}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
