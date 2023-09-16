export type Toast = {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    description?: string;
    duration: number;
    action?: {
        label: string;
        onClick: () => void;
    };
};

export type autocomplete =
    | "on"
    | "off"
    | "name"
    | "given-name"
    | "additional-name"
    | "family-name"
    | "username"
    | "current-password"
    | "new-password"
    | "email"
    | "organization-title"
    | "organization"
    | "street-address"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "address-level4"
    | "address-level3"
    | "address-level2"
    | "address-level1"
    | "country"
    | "country-name"
    | "postal-code"
    | "cc-name"
    | "cc-given-name"
    | "cc-additional-name"
    | "cc-family-name"
    | "cc-number"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-csc"
    | "cc-type"
    | "transaction-currency"
    | "transaction-amount"
    | "language"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "sex"
    | "tel"
    | "tel-country-code"
    | "tel-national"
    | "tel-area-code"
    | "tel-local"
    | "tel-extension"
    | "impp";
