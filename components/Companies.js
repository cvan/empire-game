import Company from "./Company";

const companies = {
  Lemon: {
    production_time: 1000,
    unit_price: 1,
    company_purchase_cost: 0, // price at which additional companies can be purchased
    company_branch_cost: 4, // price of individual company
    company_branch_cost_multiplier: 1.05,
    branch_level_up_count: 5,
    manager_cost: 1000,
    manager: false,
  },
  News: {
    production_time: 3000,
    unit_price: 600,
    company_purchase_cost: 5,
    company_branch_cost_multiplier: 1.1,
    company_branch_cost: 69,
    branch_level_up_count: 30,
    manager_cost: 2000,
    manager: false,
  },
};

export default () => {
  return (
    <div>
      {Object.keys(companies).map((key) => {
        return <Company key={key} name={key} {...companies[key]} />;
      })}
    </div>
  );
};
