
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';
import { PlanComparison } from '@/types/pricing';

interface PlanComparisonTableProps {
  comparisons: PlanComparison[];
}

const PlanComparisonTable = ({ comparisons }: PlanComparisonTableProps) => {
  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
      );
    }
    return value;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="border-r border-gray-200">Recurso</TableHead>
            <TableHead className="text-center border-r border-gray-200">Plano Básico</TableHead>
            <TableHead className="text-center border-r border-gray-200">Plano Profissional</TableHead>
            <TableHead className="text-center">Plano Empresarial</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisons.map((comparison, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium border-r border-gray-200">
                {comparison.feature}
              </TableCell>
              <TableCell className="text-center border-r border-gray-200">
                {renderCell(comparison.basic)}
              </TableCell>
              <TableCell className="text-center border-r border-gray-200">
                {renderCell(comparison.professional)}
              </TableCell>
              <TableCell className="text-center">
                {renderCell(comparison.enterprise)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlanComparisonTable;
