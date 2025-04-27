
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceDetails = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Dados da Hospedagem</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <DetailItem label="Servidor" value="server01.angohost.ao" />
          <DetailItem label="Usuário" value="cliente1" />
          <DetailItem label="Domínio Principal" value="exemplo.ao" />
          <DetailItem label="IP do Servidor" value="198.51.100.42" />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Nameservers:</dt>
            <dd className="font-medium text-right">
              <div>ns1.angohost.ao</div>
              <div>ns2.angohost.ao</div>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <dt className="text-muted-foreground">{label}:</dt>
    <dd className="font-medium">{value}</dd>
  </div>
);
