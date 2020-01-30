import React from "react";
import { useIntl } from "react-intl";

import WarehouseCreatePage from "@saleor/warehouses/components/WarehouseCreatePage";
import useNavigator from "@saleor/hooks/useNavigator";
import { warehouseListUrl, warehouseUrl } from "@saleor/warehouses/urls";
import { useWarehouseCreate } from "@saleor/warehouses/mutations";
import { commonMessages } from "@saleor/intl";
import useNotifier from "@saleor/hooks/useNotifier";
import { maybe, findValueInEnum, getMutationStatus } from "@saleor/misc";
import { CountryCode } from "@saleor/types/globalTypes";
import useShop from "@saleor/hooks/useShop";

const WarehouseCreate: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const shop = useShop();
  const [createWarehouse, createWarehouseOpts] = useWarehouseCreate({
    onCompleted: data => {
      if (data.createWarehouse.errors.length === 0) {
        navigate(warehouseUrl(data.createWarehouse.warehouse.id));
        notify({ text: intl.formatMessage(commonMessages.savedChanges) });
      }
    }
  });
  const createWarehouseTransitionState = getMutationStatus(createWarehouseOpts);

  return (
    <WarehouseCreatePage
      onBack={() => navigate(warehouseListUrl())}
      disabled={createWarehouseOpts.loading}
      errors={maybe(() => createWarehouseOpts.data.createWarehouse.errors, [])}
      shop={shop}
      onSubmit={data =>
        createWarehouse({
          variables: {
            input: {
              address: {
                city: data.city,
                cityArea: data.cityArea,
                country: findValueInEnum(data.country, CountryCode),
                countryArea: data.countryArea,
                phone: data.phone,
                postalCode: data.postalCode,
                streetAddress1: data.streetAddress1,
                streetAddress2: data.streetAddress2
              },
              name: data.name
            }
          }
        })
      }
      saveButtonBarState={createWarehouseTransitionState}
    />
  );
};

WarehouseCreate.displayName = "WarehouseCreate";
export default WarehouseCreate;
