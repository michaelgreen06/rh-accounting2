import React, { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
const schemaId = "0x137";

const Form = () => {
  const [formData, setFormData] = useState({
    member: "",
    amount: "",
    transactiontype: "",
    date: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //TODO replace w/ function that posts to transactions endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.optimism,
      });

      const transactionTypeBoolean = formData.transactiontype === "true";

      const createAttestationRes = await client.createAttestation({
        schemaId: schemaId,
        data: { ...formData, transactiontype: transactionTypeBoolean },
        indexingValue: "1",
      });
      console.log("Attestation created:", createAttestationRes);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  return (
    <form
      style={{ textAlign: "center", marginBottom: "20px" }}
      onSubmit={handleSubmit}
    >
      <div>
        <h2 style={{ marginBottom: "0px" }}>Attestation Submission</h2>
        <label>
          Member:
          <input
            type="text"
            name="member"
            autoComplete="off"
            value={formData.member}
            onChange={handleChange}
            placeholder="0x..."
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            autoComplete="off"
            value={formData.amount}
            onChange={handleChange}
            placeholder="420"
          />
        </label>
      </div>
      <div>
        <label>
          Transaction Type:
          <select
            name="transactiontype"
            value={formData.transactiontype}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value={false}>I owe</option>{" "}
            {/*^^^this assigns a negative value to the member's balance*/}
            <option value={true}>I paid</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Supplies">Supplies</option>
            <option value="Labor Contribution">Labor Contribution</option>
            <option value="Rent">Rent</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            autoComplete="off"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a brief summary of what you are submitting a request for"
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
