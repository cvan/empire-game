import sofa from "../images/sofa.jpg";
import gamer from "../images/gamer.jpg";
import commerce from "../images/commerce.jpg";
import software from "../images/software.jpg";
import vr from "../images/vr.jpg";
import space from "../images/space.jpg";

export default {
  Sofa: {
    name: "Sofa Change",
    icon: sofa,
    production_time: 1000,
    unit_price: 1,
    company_purchase_cost: 0, // price at which additional companies can be purchased
    company_branch_cost: 4, // price of individual company
    company_branch_cost_multiplier: 1.05,
    branch_level_up_count: 5,
    manager_cost: 10,
  },
  Gamer: {
    name: "Pro Gamer",
    icon: gamer,
    production_time: 3000,
    unit_price: 300,
    company_purchase_cost: 10,
    company_branch_cost_multiplier: 1.1,
    company_branch_cost: 69,
    branch_level_up_count: 30,
    manager_cost: 20,
  },
  Commerce: {
    name: "E-Commerce",
    icon: commerce,
    production_time: 5000,
    unit_price: 125,
    company_purchase_cost: 1000,
    company_branch_cost_multiplier: 1.4,
    company_branch_cost: 300,
    branch_level_up_count: 100,
    manager_cost: 10000,
  },
  SaaS: {
    name: "SaaS Startup",
    icon: software,
    production_time: 10000,
    unit_price: 2000,
    company_purchase_cost: 7000,
    company_branch_cost_multiplier: 1.8,
    company_branch_cost: 15000,
    branch_level_up_count: 10,
    manager_cost: 50000,
  },
  VR: {
    name: "VR Simulation",
    icon: vr,
    production_time: 5000,
    unit_price: 2000,
    company_purchase_cost: 284000,
    company_branch_cost_multiplier: 1.8,
    company_branch_cost: 15000,
    branch_level_up_count: 20,
    manager_cost: 500000,
  },
  Rocket: {
    name: "Space Launch",
    icon: space,
    production_time: 120000,
    unit_price: 116000,
    company_purchase_cost: 20000000,
    company_branch_cost_multiplier: 1.8,
    company_branch_cost: 15000,
    branch_level_up_count: 20,
    manager_cost: 500000,
  },
};
