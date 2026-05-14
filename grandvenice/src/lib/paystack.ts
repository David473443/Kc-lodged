const PAYSTACK_BASE = "https://api.paystack.co";

interface InitializePaymentParams {
  email: string;
  amount: number; // in kobo (NGN × 100)
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
}

interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    status: "success" | "failed" | "abandoned" | "pending";
    reference: string;
    amount: number;
    paid_at: string;
    channel: string;
    currency: string;
    customer: {
      email: string;
      first_name: string;
      last_name: string;
    };
    metadata?: Record<string, unknown>;
  };
}

export async function initializePayment(
  params: InitializePaymentParams
): Promise<{ authorization_url: string; access_code: string; reference: string }> {
  const response = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Paystack init failed: ${response.statusText}`);
  }

  const json = await response.json();
  if (!json.status) {
    throw new Error(json.message || "Paystack initialization failed");
  }

  return json.data;
}

export async function verifyPayment(
  reference: string
): Promise<VerifyPaymentResponse["data"]> {
  const response = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Paystack verify failed: ${response.statusText}`);
  }

  const json: VerifyPaymentResponse = await response.json();
  if (!json.status) {
    throw new Error(json.message || "Paystack verification failed");
  }

  return json.data;
}
