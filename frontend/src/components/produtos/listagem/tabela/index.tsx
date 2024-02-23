import { Produto } from "app/models/produtos";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onDelete,
  onEdit,
}: TabelaProdutosProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<any>(null);

  const actionTemplate = (registro: Produto) => {
    const url = `/cadastros/produtos?id=${registro.id}`;

    const accept = () => {
      toast.current.show({
        severity: "info",
        summary: "Mensagem",
        detail: "Produto DELETADO com sucesso!",
        life: 10000,
      });
      onDelete(registro);
    };

    const reject = () => {
      toast.current.show({
        severity: "warn",
        summary: "Mensagem",
        detail: "Produto NÃO Deletado!",
        life: 10000,
      });
    };

    const confirmacaoDeletar = (event: { currentTarget: any }) => {
      confirmPopup({
        target: event.currentTarget,
        message: "Confirma a exclusão deste registro?",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept,
        reject,
      });
    };

    return (
      <div className="field is-grouped">
        <Toast ref={toast} />

        <ConfirmPopup />
        <div className="control">
          <Button
            onClick={(e) => onEdit(registro)}
            label="Editar"
            className="p-button-rounded p-button-info"
          />
        </div>
        <div className="control">
          <Button
            onClick={confirmacaoDeletar}
            label="Delete"
            className="p-button-rounded p-button-danger"
          />
        </div>
      </div>
    );
  };

  return (
    <DataTable value={produtos} paginator rows={5}>
      <Column field="id" header="Código" />
      <Column field="sku" header="SKU" />
      <Column field="nome" header="Nome" />
      <Column field="preco" header="Preço" />
      <Column body={actionTemplate} />
    </DataTable>
  );
};
