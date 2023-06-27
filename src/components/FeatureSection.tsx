import { Typography } from "@mui/material";
import ImagePagination from "./ImagePagination";

const FeatureSection = () => {
  const features = [
    {
      title: "Stock Management",
      description: "Stock increased by purchased & decreased by sales",
      image:
        "https://st3.depositphotos.com/10325516/15834/i/450/depositphotos_158349708-stock-photo-inventory-management-system-for-factory.jpg",
    },
    {
      title: "Profit Calculation",
      description:
        "Profit increased by profit margin & decreased by loss margin",
      image:
        "https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696228_640.jpg",
    },
    {
      title: "Salary Expense",
      description: "Salary Expense can decreasing Nett Profit  ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1J8i2xfw4VcCL3N0DPsIavzhbv6EDrtifYw&usqp=CAU",
    },
    {
      title: "Invoice Record",
      description:
        "Create Invoice Record with customer name,cost of goods sales,discount,etc  ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8MWSFbTIR1z14eQr7IAgKeMK3yV6s8C04lQ&usqp=CAU",
    },
  ];

  return (
    <div>
      <div>
        <Typography className="flex justify-center" variant="h2">
          Feature Overview
        </Typography>
      </div>
    </div>
  );
};

export default FeatureSection;
