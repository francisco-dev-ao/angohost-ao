
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CheckoutFormData, checkoutFormSchema } from "@/schemas/formSchema";
import { BillingFormFields } from './billing/BillingFormFields';
import { BillingSubmitButton } from './billing/BillingSubmitButton';
import { useBillingNif } from '@/hooks/useBillingNif';

interface BillingFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  defaultValues?: Partial<CheckoutFormData>;
  isLoading?: boolean;
}

export const BillingForm: React.FC<BillingFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false
}) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      phone: defaultValues?.phone || '',
      nif: defaultValues?.nif || '',
      billingAddress: defaultValues?.billingAddress || '',
      city: defaultValues?.city || '',
      paymentMethod: defaultValues?.paymentMethod || 'emis'
    }
  });

  const { isNifLoading, handleNifBlur } = useBillingNif(form);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BillingFormFields 
          form={form}
          isNifLoading={isNifLoading}
          onNifBlur={handleNifBlur}
        />
        <BillingSubmitButton isLoading={isLoading || isNifLoading} />
      </form>
    </Form>
  );
};
