import React, { ReactElement, useEffect, useState } from "react";
import RootLayout from "../../components/rootLayout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { HiRefresh } from "react-icons/hi";
import { MdDownloadDone } from "react-icons/md";
import { useRouter } from "next/router";
import ProductTable from "../../components/ui/ProductTable";
import {
  APiRes,
  CustomerDetails,
  ExchangeDetails,
  finalInvoice,
  Product,
} from "../../types";
import Header from "../../components/ui/Header";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Switch from "../../components/ui/Switch";
import toast from "react-hot-toast";
import { appTitle, preventkeyEnvent, preventWeelEvent } from "../../constents";

const CreateInvoicePage: NextPageWithLayout = () => {
  const router = useRouter();

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
  });

  const [exchangeDetails, setExchangeDetails] = useState<ExchangeDetails>({
    exchangeCategory: "select",
    exchangeWeight: 0,
    exchangePercentage: 0,
    exchangeAmount: 0,
  });

  const [paymentDetails, setPaymentDetails] = useState({
    pay: 0,
    discount: 0,
  });

  const [exchange, setExchange] = useState(false);

  const [productDetails, setProductDetails] = useState<Product>({
    name: "",
    purity: "",
    category: "gold",
    weight: 0,
    quantity: 0,
    rate: 0,
    makingCost: 0,
  });

  const [invoiceNo, setInvoiceNo] = useState<string>("");

  const [checkedbox, setcheckedbox] = useState(false);

  const [grossAmt, setGrossAmt] = useState(0);

  const [GST, setGST] = useState(0);
  const [GSTAMT, setGSTAMT] = useState(0);

  const [productList, setProductList] = useState([]);

  let totalAmt = Math.round(grossAmt + GSTAMT - exchangeDetails.exchangeAmount);
  let due = Math.max(
    0,
    Math.round(totalAmt - paymentDetails.pay - paymentDetails.discount)
  );

  // function of genrateInvoice
  const genrateInvoiceNo = async () => {
    window.ipc.send("totalcountofinvoice", {});

    window.ipc.on("totalcountofinvoice", (res: APiRes) => {
      if (res.success) {
        if (res.data === undefined) {
          const invoiceno = `INV${(res.data + 1).toString().padStart(3, "0")}`;
          setInvoiceNo(invoiceno);
          return;
        }
        const invoiceno = `INV${(res.data + 1).toString().padStart(3, "0")}`;
        setInvoiceNo(invoiceno);
      } else {
        toast.error(res.message);
      }
    });
  };

  // function of add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // convert rate, weight and quentity for preform find amount calculation
    let rate = productDetails.rate;
    let weight = productDetails.weight;
    let quantity = productDetails.quantity;
    let makingCostPercentage = productDetails.makingCost;

    // calculate product amount using <(rate / 10) * weight> formula
    let amount: number = parseInt(((rate / 10) * weight).toFixed(2));

    // conver making cost in Rupees
    const makingCostInRupee = (amount * makingCostPercentage) / 100;
    amount = parseFloat((amount + makingCostInRupee).toFixed(2));

    // create a single final product with all calculation
    let singleProduct: Product = {
      name: String(productDetails.name),
      category: String(productDetails.category),
      weight: Number(weight),
      quantity: Number(quantity),
      rate: Number(rate),
      purity: String(productDetails.purity),
      amount: Number(amount),
      makingCost: Number(productDetails.makingCost),
    };

    // set singleProduct object in productList array
    productList.push(singleProduct);

    // After set singleProduct in array clear product section
    setProductDetails({
      rate: 0,
      quantity: 0,
      name: "",
      weight: 0,
      purity: "",
      category: "gold",
      makingCost: 0,
    });

    // calculate grossAmount
    let grossamount = productList.reduce(
      (total, item) => total + item.amount,
      0
    );

    // set GrossAmount and totalAmount
    setGrossAmt(parseFloat(grossamount.toFixed(2)));
  };

  // function of handle genrate invoice
  const handleGenrateInvoice = () => {
    if (customerDetails.name.length === 0) {
      toast.error("Add Customer Details!");
      return;
    }

    /// check before submit productList is not Empty
    if (productList.length === 0) {
      toast.error("Add Atleast One Product!");
      return;
    }

    console.log("pay amount : " + paymentDetails.pay);
    console.log("pay amount : " + typeof paymentDetails.pay);

    let invoiceData: finalInvoice = {
      // customer Details
      name: customerDetails.name.toLowerCase(),
      phone: customerDetails.phone,
      address: customerDetails.address,

      // exchange Details
      exchange: String(exchange),
      exchangeCategory: exchangeDetails.exchangeCategory,
      exchangeWeight: exchangeDetails.exchangeWeight,
      exchangePercentage: exchangeDetails.exchangePercentage,
      exchangeAmount: exchangeDetails.exchangeAmount,

      // product Details
      products: productList,

      // gst Details
      gst: String(checkedbox),
      gstPercentage: GST,
      gstAmount: GSTAMT,

      // invoice Details,
      invoiceNo: invoiceNo,
      grossAmount: grossAmt,
      totalAmount: totalAmt,
      dueAmount: due,

      // payment details
      discount: paymentDetails.discount,
      payments: [
        {
          paidAmount: paymentDetails.pay,
        },
      ],
    };

    // set invoice Data in localStorage
    const jsonInvoice = JSON.stringify(invoiceData);
    localStorage.setItem("finalInvoice", jsonInvoice);

    // save invoice in database
    window.ipc.send("createinvoice", { invoiceData });

    window.ipc.on("createinvoice", (res: APiRes) => {
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/dashboard/preview/");
        }, 500);
      } else {
        toast.error(res.message);
      }
    });
  };

  // function of handle clear invoice
  const handleClearInvoice = () => {
    setCustomerDetails({
      name: "",
      phone: "",
      address: "",
    });
    setExchangeDetails({
      exchangeCategory: "select",
      exchangeWeight: 0,
      exchangePercentage: 0,
      exchangeAmount: 0,
    });
    setProductDetails({
      name: "",
      purity: "",
      category: "gold",
      weight: 0,
      rate: 0,
      quantity: 0,
      makingCost: 0,
    });
    setPaymentDetails({
      pay: 0,
      discount: 0,
    });
    setcheckedbox(false);
    setGST(0);
    setGSTAMT(0);
    setGrossAmt(0);
    setProductList([]);
  };

  // function of handle makingcost change
  const handleMakingCostChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty input or numbers between 0 and 100
    if (
      inputValue === "" ||
      (Number(inputValue) >= 0 && Number(inputValue) <= 100)
    ) {
      setProductDetails((prev) => ({
        ...prev,
        makingCost: inputValue,
      }));
    }
  };

  // function of handle makeingcost Blur
  const handleMakingCostBlur = () => {
    if (productDetails.makingCost === undefined) return; // Allow empty value
    const numericValue = Number(productDetails.makingCost);
    if (numericValue < 0) {
      setProductDetails((prev) => ({
        ...prev,
        makingCost: 0,
      }));
    } else if (numericValue > 100) {
      setProductDetails((prev) => ({
        ...prev,
        makingCost: 100,
      }));
    }
  };

  // function of handle gst Change
  const handleGstChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty input or numbers between 0 and 100
    if (
      inputValue === "" ||
      (parseFloat(inputValue) >= 0.0 && parseFloat(inputValue) <= 100)
    ) {
      setGST(inputValue);
    }

    // convert gst percentage to rupees
    const gstInRupee = Number(((grossAmt * inputValue) / 100).toFixed(0));

    // set gst amount
    setGSTAMT(gstInRupee);
  };

  // function of handle gst blur
  const handleGstBlur = () => {
    if (GST === undefined) return; // Allow empty value
    const numericValue = Number(GST);
    if (numericValue < 0.0) setGST(0);
    else if (numericValue > 100.0) setGST(100);
  };

  // Function to handle changes in the payment input field
  const handlePayChange = (e) => {
    let value = e.target.value;

    // 1. Remove non-digit characters and trim leading zeros (unless the value is '0')
    // We only keep digits to ensure it's a number
    value = value.replace(/[^0-9]/g, "");

    // Convert the string value to a number for comparison
    const numValue = parseInt(value, 10);

    // --- Validation Logic ---

    // Case 1: If the input is empty or invalid (e.g., just '-'), reset to 0
    if (value === "" || isNaN(numValue)) {
      setPaymentDetails((prev) => ({
        ...prev,
        pay: 0,
      }));
      return;
    }

    // Case 2: If the value is 0, reset it to 1 (as per the requirement "only type 1 to total amount")
    if (numValue === 0) {
      setPaymentDetails((prev) => ({
        ...prev,
        pay: 1,
      }));
      return;
    }

    // Case 3: If the value exceeds the total amount, cap it at the max
    if (numValue > totalAmt) {
      setPaymentDetails((prev) => ({
        ...prev,
        pay: Number(totalAmt),
      }));
      return;
    }

    // Case 4: Value is valid (between 1 and totalAmount)
    setPaymentDetails((prev) => ({
      ...prev,
      pay: Number(numValue),
    }));
  };

  useEffect(() => {
    genrateInvoiceNo();
    handleClearInvoice();
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <section className="min-h-screen overflow-auto">
        <Header title="Create Invoice" />

        {/* Invoice Details section */}
        <section className="flex-col lg:flex-row w-full lg:h-[14rem] mt-2 flex gap-1">
          <div className="p-2 bg-primary-50 rounded-lg border border-primary-500 min-w-[340px] ">
            <h2 className="font-bold text-primary-800">Customer Details</h2>
            {/* customer detail  */}
            <div className="py-4 w-[19rem]">
              <Input
                lable="Customer Name:"
                lableStyle="text-primary-900 font-semibold"
                type="text"
                otherStyle="mb-2"
                value={customerDetails.name}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Customer Name"
                required
              />

              <Input
                lable="Phone No.:"
                name="phone"
                lableStyle="text-primary-900 font-semibold"
                otherStyle="mb-2 "
                type="number"
                onWheel={preventWeelEvent}
                onKeyDown={preventkeyEnvent}
                min="0"
                value={customerDetails.phone}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="Phone number"
                required
              />

              <Textarea
                title="Address"
                row={2}
                value={customerDetails.address}
                handleTextChange={(e) =>
                  setCustomerDetails((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="address"
              />
            </div>
          </div>

          {/* Exchange Detail section  */}
          <div className="p-2 bg-primary-50 rounded-lg border border-primary-500 w-[300px]">
            <div className="flex justify-between">
              <h2 className="font-bold text-primary-800">Exchange Details</h2>
              <Switch
                isSwitchOn={exchange}
                setSwitchOn={setExchange}
                setExchangeDetails={setExchangeDetails}
              />
            </div>
            <div>
              <div>
                <div className="w-[17rem]">
                  {/* Exchange product Name section   */}
                  <div className="flex items-center gap-2 mb-2 justify-end">
                    <label
                      htmlFor="category"
                      className={`text-sm font-medium ${
                        !exchange ? "text-gray-300" : "text-primary-900"
                      }`}
                    >
                      Product Category:
                    </label>
                    <select
                      value={exchangeDetails.exchangeCategory}
                      onChange={(e) =>
                        setExchangeDetails((prev) => ({
                          ...prev,
                          exchangeCategory: e.target.value,
                        }))
                      }
                      disabled={!exchange}
                      className="bg-primary-50 border border-primary-800 disabled:border-gray-300 text-gray-900 text-sm rounded-md focus:outline-primary-900 block py-1.5 px-5"
                    >
                      <option defaultValue="select" className="p-2">
                        Select
                      </option>
                      <option value="gold" className="p-2">
                        Gold
                      </option>
                      <option value="silver" className="p-2">
                        Silver
                      </option>
                    </select>
                  </div>

                  {/* exchange product weight section */}
                  <Input
                    lable="Weight:"
                    lableStyle={
                      !exchange
                        ? "text-gray-300"
                        : "text-primary-900 font-semibold"
                    }
                    otherStyle="disabled:border-gray-300 mb-2 "
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    step="0.01"
                    value={
                      isNaN(exchangeDetails.exchangeWeight)
                        ? ""
                        : exchangeDetails.exchangeWeight
                    }
                    onChange={(e) =>
                      setExchangeDetails((prev) => ({
                        ...prev,
                        exchangeWeight: e.target.valueAsNumber,
                      }))
                    }
                    placeholder="Weight"
                    disabled={!exchange}
                  />
                  {/* exchange product percentage section  */}
                  <Input
                    lable="percentage:"
                    lableStyle={
                      !exchange
                        ? "text-gray-300"
                        : "text-primary-900 font-semibold"
                    }
                    otherStyle="disabled:border-gray-300 mb-2 "
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    value={
                      isNaN(exchangeDetails.exchangePercentage)
                        ? ""
                        : exchangeDetails.exchangePercentage
                    }
                    onChange={(e) =>
                      setExchangeDetails((prev) => ({
                        ...prev,
                        exchangePercentage: e.target.valueAsNumber,
                      }))
                    }
                    disabled={!exchange}
                    placeholder="Percentage"
                  />
                </div>
                {/* exchange product amount section  */}
                <div className="flex ">
                  <Input
                    lable="Amount:"
                    lableStyle={
                      !exchange
                        ? "text-gray-300"
                        : "text-primary-900 font-semibold"
                    }
                    otherStyle="w-[100px] disabled:border-gray-300 mb-2 "
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    value={
                      isNaN(exchangeDetails.exchangeAmount)
                        ? ""
                        : exchangeDetails.exchangeAmount
                    }
                    onChange={(e) => {
                      setExchangeDetails((prev) => ({
                        ...prev,
                        exchangeAmount: e.target.valueAsNumber,
                      }));
                    }}
                    disabled={!exchange}
                    placeholder="Amount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Detail Section  */}
          <div className="p-3 bg-primary-50 rounded-lg border border-primary-500 w-full">
            <div className="flex justify-between">
              <h2 className="font-bold text-primary-800">Product Details</h2>
              {/* invoice number  */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-primary-900">
                  Invoice No:
                </span>
                <span className="font-semibold text-primary-800">
                  {invoiceNo}
                </span>

                <HiRefresh
                  size={25}
                  className="hover:cursor-pointer active:animate-spin"
                  onClick={genrateInvoiceNo}
                />
              </div>
            </div>

            {/* product rate and category and quintity  */}
            <form onSubmit={handleAddProduct}>
              <div className="p-1">
                <div className="flex gap-4">
                  {/* product rate  */}
                  <Input
                    lable="Rate(10g):"
                    lableStyle="text-primary-800 font-semibold"
                    otherStyle="w-[110px]"
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    value={productDetails.rate}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        rate: Number(e.target.valueAsNumber),
                      }))
                    }
                    placeholder="rate"
                    required
                  />

                  {/*  product category  */}
                  <div className="flex items-center gap-2 mb-2">
                    <label
                      htmlFor="product:"
                      className="text-sm font-medium text-primary-800"
                    >
                      Category:
                    </label>
                    <select
                      value={productDetails.category}
                      onChange={(e) =>
                        setProductDetails((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="bg-primary-50 font-medium border border-primary-800 text-primary-900 text-sm rounded-md focus:outline-primary-900 block p-1.5"
                    >
                      <option defaultValue="gold" className="font-medium">
                        gold
                      </option>
                      <option value="silver" className="font-medium">
                        silver
                      </option>
                    </select>
                  </div>

                  {/* product quantity */}
                  <Input
                    lable="Quantity:"
                    lableStyle="text-primary-800 font-semibold"
                    otherStyle="w-[60px]"
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    value={productDetails.quantity}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        quantity: Number(e.target.valueAsNumber),
                      }))
                    }
                    placeholder="Quantity"
                    required
                  />
                </div>
              </div>

              {/* product name and weight and making cost */}
              <div className="flex gap-3">
                {/* product name  */}
                <Input
                  lable="Product:"
                  lableStyle="text-primary-800 font-semibold"
                  otherStyle="w-[170px]"
                  type="text"
                  value={productDetails.name}
                  onChange={(e) =>
                    setProductDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Product Name"
                  required
                />

                {/* making cost */}
                <Input
                  lable="Making Cost(in %):"
                  lableStyle="text-primary-800 font-semibold"
                  otherStyle="w-[120px] mb-2"
                  type="number"
                  onWheel={preventWeelEvent}
                  onKeyDown={preventkeyEnvent}
                  min="0"
                  value={productDetails.makingCost}
                  onChange={handleMakingCostChange}
                  onBlur={handleMakingCostBlur}
                />
              </div>
              {/* purity section  */}
              <div className="flex">
                <Input
                  lable="Purity"
                  lableStyle="text-primary-800 font-semibold"
                  otherStyle=""
                  type="text"
                  value={productDetails.purity}
                  onChange={(e) =>
                    setProductDetails((prev) => ({
                      ...prev,
                      purity: e.target.value,
                    }))
                  }
                  placeholder="Purity ( 22k, 23k, 916 )"
                />
              </div>
              <div>
                {/* product weight  and add button  */}
                <div className="flex justify-between">
                  {/* product weight  */}
                  <Input
                    lable="Net Weight(gram):"
                    lableStyle="text-primary-800 font-semibold"
                    type="number"
                    onWheel={preventWeelEvent}
                    onKeyDown={preventkeyEnvent}
                    min="0"
                    step="0.001"
                    value={productDetails.weight}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        weight: Number(e.target.valueAsNumber),
                      }))
                    }
                    placeholder="Net Weight"
                  />

                  {/* product add button  */}
                  <Button
                    buttonType="submit"
                    extraClass="sm:w-auto bg-primary-800 px-8 py-2 flex gap-2 text-white "
                    icon={<MdDownloadDone size={20} />}
                    title="Add"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* add invoice tabel  */}
        <section className="mt-1">
          <ProductTable
            productList={productList}
            setProductList={setProductList}
            grossAmt={grossAmt}
            setGrossAmt={setGrossAmt}
            setGSTAMT={setGSTAMT}
            gst={GST}
          />
        </section>

        {/* total Amount section  */}
        <section className="w-full h-[145px] p-2 border rounded-lg mt-1 flex justify-between bg-primary-50 border-primary-500">
          {/* print and clear Button section */}
          <div className="my-auto flex gap-3 ">
            <Button
              title="Genrate Invoice"
              buttonType="button"
              extraClass=" py-2 bg-primary-800 text-white"
              handleClick={handleGenrateInvoice}
            />
            <Button
              buttonType="button"
              title="Clear Invoice"
              handleClick={handleClearInvoice}
              extraClass="text-white bg-btnSecondary "
            />
          </div>

          {/*  gst section and discount */}
          <div>
            <div className="flex gap-2 items-center h-5 mb-2">
              <input
                type="checkbox"
                className="w-4 h-4 border border-primary-900 rounded bg-primary-50 focus:outline-primary-600 accent-primary-900"
                onChange={() => {
                  setcheckedbox(!checkedbox);
                  setGST(0);
                  setGSTAMT(0);
                }}
                checked={checkedbox}
                required
              />
              <label className="">GST INVOICE</label>
            </div>

            <div className="">
              {/* GST */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="gst"
                  className={`text-sm font-medium inline-block ${
                    !checkedbox && "text-gray-300"
                  }`}
                >
                  GST(%):
                </label>
                <Input
                  type="number"
                  onWheel={preventWeelEvent}
                  onKeyDown={preventkeyEnvent}
                  min={0}
                  max={100}
                  value={GST}
                  onChange={handleGstChange}
                  onBlur={handleGstBlur}
                  className={`border bg-primary-50 border-gray-400 rounded-md block w-full py-1 px-2 mb-0.5 ${
                    !checkedbox && "text-gray-300"
                  }`}
                  disabled={!checkedbox}
                />
              </div>
            </div>

            <Input
              lable="Discount:"
              lableStyle="text-primary-900 font-semibold"
              otherStyle=""
              type="number"
              onWheel={preventWeelEvent}
              onKeyDown={preventkeyEnvent}
              value={
                isNaN(paymentDetails.discount) ? "0" : paymentDetails.discount
              }
              onChange={(e) => {
                setPaymentDetails((prev) => ({
                  ...prev,
                  discount: e.target.valueAsNumber,
                }));
              }}
              placeholder="discont"
            />
          </div>

          {/* payment section */}
          <div>
            <div className="flex justify-between font-semibold">
              <span>Pay :</span>
              <span>{`₹ ${paymentDetails.pay}`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Due :</span>
              <span>{`₹ ${Number.isNaN(due) ? 0 : due}`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Discont :</span>
              <span>{`₹ ${
                isNaN(paymentDetails.discount) ? 0 : paymentDetails.discount
              }`}</span>
            </div>
            <Input
              lable="Pay Amount:"
              lableStyle="text-primary-900 font-semibold"
              otherStyle=""
              type="text"
              inputMode="numeric"
              value={paymentDetails.pay}
              onChange={handlePayChange}
              placeholder="Pay amount"
            />
          </div>

          {/* total*/}
          <div className="w-1/6">
            {/* Gross total */}
            <div className="flex justify-between font-semibold">
              <span>Gross Total :</span>
              <span>{`₹ ${grossAmt}`}</span>
            </div>

            {/* Gst  */}
            {checkedbox && (
              <div className="flex justify-between font-semibold">
                <span>{`GST(${
                  GST === 0 || GST === undefined ? 0 : GST
                }%)`}</span>
                <span>{`₹ ${GSTAMT}`}</span>
              </div>
            )}

            {/* Exchange amount */}
            {exchange && (
              <div className="flex justify-between font-semibold">
                <span>Exchange Amount :</span>
                <span>{`₹ ${
                  exchangeDetails.exchangeAmount === 0
                    ? 0
                    : exchangeDetails.exchangeAmount
                }`}</span>
              </div>
            )}

            {/* Total amount */}
            <div className="flex justify-between font-bold border-t border-primary-900 mt-1 pt-1">
              <span>Total :</span>
              <span>{`₹ ${totalAmt}`}</span>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

CreateInvoicePage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateInvoicePage;
