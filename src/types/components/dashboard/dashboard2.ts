

/*Revenue Forecast Projects*/
type RevenueForecast={
    icon: string;
    subtext: string;
    profit: string;
    bgcolor:string;
    color: string;
};

/*Annual Profit*/
type AnnualProfit={
    title: string;
    subtitle: string;
    price: string;
    percent:string;
    color: string;
};

/*Sales from Locations*/
type SalesFromLocation={
    name: string;
    percentage:string;
    color: string;
};

// Daily Activities
type DailyActivities = {
    title: string;
    subtitle: string;
    textcolor: string;
    boldtext: boolean;
    line: boolean;
    link: string;
    url: string;
};

/*User cards*/
type userCard ={
    img: string;
};


export type{RevenueForecast ,AnnualProfit, SalesFromLocation,DailyActivities,userCard}