import React, { useEffect } from "react";

const RefundPolicies = () => {
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, []);

  return (
    <div className="lg:max-w-[90vw] lg:mx-auto p-4 sm:p-6 min-h-[59vh]">
      <div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
        <div className="py-2">
          <h2 className="text-[color:var(--blue)] text-lg md:text-xl lg:text-2xl">
            Cancellation/Refund Policies
          </h2>
          <br />
          <p className="py-2">
            At www.lucknowjunction.com, we want our customers to be completely
            satisfied with their purchases. If for any reason you are not
            satisfied with your purchase, you may request a refund within 14
            days of the purchase date
          </p>
          <p className="py-2">
            To request a refund, please contact us at hello@lucknowjunction.com
            with your order number and the reason for the request. We will
            review your request and provide a response within 3 business days.
          </p>
          <p className="py-2">
            Please note that we reserve the right to refuse a refund request if
            it does not meet the criteria outlined below.
          </p>

          <br />
          <h4 className="py-2 text-lg font-semibold">
            Eligibility for Refunds
          </h4>
          <p className="py-2">
            In order to be eligible for a refund, the following conditions must
            be met:
          </p>
          <ul className="list-disc flex flex-col gap-2">
            <li>
              The request must be made within 14 days of the purchase date.
            </li>

            <li>The product must be in its original, unused condition.</li>
            <li>You must provide a valid reason for the request.</li>
          </ul>

          <br />
          <h4 className="py-2 text-lg font-semibold">
            Exceptions to the Refund Policy
          </h4>
          <p className="py-2">
            There are a few exceptions to our refund policy. We do not offer
            refunds for the following:
          </p>

          <ul className="list-disc flex flex-col gap-2">
            <li>
              Digital products, including but not limited to downloadable
              software, ebooks, and online courses.
            </li>

            <li>
              Services, including but not limited to consulting and coaching
              services.
            </li>
            <li>Custom orders or personalized products.</li>
            <li>
              If you receive a damaged or defective product, you may request a
              refund or replacement within 14 days of the purchase date.
            </li>
            <li>
              If you are not satisfied with the quality of the product, you may
              request a refund within 14 days of the purchase date, provided
              that you can provide evidence of the product's poor quality.
            </li>
            <li>
              If you request a refund for a subscription service, you will only
              be eligible for a full refund if you have not used any of the
              service's features or received any benefits from the subscription.
            </li>
            <li>
              If you request a refund for a product or service that includes a
              free trial or money-back guarantee, you must cancel the service
              before the end of the trial or guarantee period to be eligible for
              a full refund.
            </li>
            <li>
              If you have received a promotional discount on your purchase and
              request a refund, the refund amount will be calculated based on
              the regular, non-discounted price of the product.
            </li>
            <li>
              All refund requests are subject to review and approval by
              www.lucknowjunction.com. We reserve the right to deny a refund
              request if it does not meet the criteria outlined in this policy.
            </li>
          </ul>

          <p className="py-2 font-medium">
            If you have any questions or concerns about our refund policy,
            please do not hesitate to contact us at hello@lucknowjunction.com.
            We are always here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicies;
